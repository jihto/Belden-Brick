// Simple script to test database connection
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing database connection...');
  console.log('Database Host:', process.env.DB_HOST || 'localhost');
  console.log('Database Port:', process.env.DB_PORT || '3306');
  console.log('Database Name:', process.env.DB_NAME || 'not set');
  console.log('Database User:', process.env.DB_USER || 'not set');
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test successful:', rows);
    
    // Check if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Available tables:', tables.map(row => Object.values(row)[0]));
    
    await connection.end();
    console.log('🔌 Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('💡 Check your database credentials in .env file');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('💡 Database does not exist. Create it in cPanel first');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 Cannot connect to database server. Check host and port');
    }
    
    process.exit(1);
  }
}

testConnection();
