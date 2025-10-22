import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

// Database configuration for cPanel/phpMyAdmin
const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  connectionLimit: 10
};

// Create connection pool
let pool: mysql.Pool;

export const connectDatabase = async (): Promise<void> => {
  try {
    // Validate required environment variables
    if (!dbConfig.user || !dbConfig.password || !dbConfig.database) {
      throw new Error('Missing required database environment variables. Please check your .env file.');
    }

    // Create connection pool
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 60000,
      charset: 'utf8mb4'
    });

    // Test the connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL connection established successfully');
    
    // Test query to verify database access
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test successful:', rows);
    
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Get database connection pool
export const getPool = (): mysql.Pool => {
  if (!pool) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return pool;
};

// Execute query with error handling
export const executeQuery = async <T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> => {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Execute single query (for INSERT, UPDATE, DELETE)
export const executeSingleQuery = async (
  query: string,
  params: any[] = []
): Promise<mysql.ResultSetHeader> => {
  try {
    const pool = getPool();
    const [result] = await pool.execute(query, params);
    return result as mysql.ResultSetHeader;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    console.log('Database connection closed');
  }
};

// Database health check
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};
