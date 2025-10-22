#!/usr/bin/env node

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('🚀 Setting up Belden Brick Database...\n');

  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found! Please run: node setup-env.js');
    process.exit(1);
  }

  // Database connection config
  const dbName = process.env.DB_NAME || 'belden_brick_db';
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: dbName,
    multipleStatements: true
  };

  let connection;

  try {
    console.log('📡 Connecting to MySQL server...');
    
    // First, connect without database to create it if needed
    const tempConfig = { ...connectionConfig };
    delete tempConfig.database;
    
    const tempConnection = await mysql.createConnection(tempConfig);
    console.log('✅ Connected to MySQL server successfully');

    // Create database if it doesn't exist
    console.log(`📊 Creating database: ${dbName}`);
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log('✅ Database created/verified successfully');
    
    await tempConnection.end();

    // Now connect to the specific database
    connection = await mysql.createConnection(connectionConfig);
    console.log(`✅ Connected to database: ${dbName}`);

    // Create essential tables
    console.log('🔧 Creating database tables...');
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username),
        INDEX idx_role (role),
        INDEX idx_is_active (is_active)
      )
    `);
    console.log('✅ Users table created');

    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50) NOT NULL,
        sku VARCHAR(50) NOT NULL UNIQUE,
        stock INT DEFAULT 0,
        image_url VARCHAR(500),
        specifications JSON,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_sku (sku),
        INDEX idx_price (price),
        INDEX idx_is_active (is_active),
        INDEX idx_name (name)
      )
    `);
    console.log('✅ Products table created');

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Categories table created');

    // Insert default categories
    await connection.execute(`
      INSERT IGNORE INTO categories (name, description) VALUES
      ('Bricks', 'Various types of bricks for construction'),
      ('Blocks', 'Concrete blocks and masonry units'),
      ('Pavers', 'Paving stones and decorative blocks'),
      ('Specialty', 'Specialty masonry products'),
      ('Accessories', 'Masonry accessories and tools')
    `);
    console.log('✅ Default categories inserted');

    // Insert sample admin user (password: admin123)
    await connection.execute(`
      INSERT IGNORE INTO users (username, email, password, first_name, last_name, role) VALUES
      ('admin', 'admin@beldenbrick.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8KzK', 'Admin', 'User', 'admin')
    `);
    console.log('✅ Sample admin user created');

    // Insert sample products
    await connection.execute(`
      INSERT IGNORE INTO products (name, description, price, category, sku, stock, image_url, specifications) VALUES
      ('Standard Red Brick', 'High-quality red clay brick perfect for residential construction', 0.75, 'Bricks', 'BRK-RED-001', 1000, '/images/bricks/red-brick.jpg', '{"dimensions": "8x4x2.25 inches", "weight": "4.5 lbs", "color": "Red", "material": "Clay"}'),
      ('Concrete Block 8x8x16', 'Standard concrete masonry unit for foundation and wall construction', 2.50, 'Blocks', 'BLK-CON-001', 500, '/images/blocks/concrete-block.jpg', '{"dimensions": "8x8x16 inches", "weight": "35 lbs", "material": "Concrete", "strength": "2000 PSI"}'),
      ('Decorative Paver Stone', 'Beautiful decorative paver for patios and walkways', 3.25, 'Pavers', 'PAV-DEC-001', 300, '/images/pavers/decorative-paver.jpg', '{"dimensions": "12x12x2 inches", "weight": "15 lbs", "color": "Natural", "finish": "Tumbled"}'),
      ('Fire Brick', 'Heat-resistant brick for fireplaces and kilns', 1.50, 'Specialty', 'BRK-FIRE-001', 200, '/images/specialty/fire-brick.jpg', '{"dimensions": "9x4.5x2.5 inches", "weight": "6 lbs", "material": "Fire Clay", "max_temp": "2700°F"}'),
      ('Mortar Mix', 'High-quality mortar mix for masonry work', 8.99, 'Accessories', 'ACC-MORT-001', 100, '/images/accessories/mortar-mix.jpg', '{"weight": "80 lbs", "coverage": "12 sq ft", "type": "Type N", "setting_time": "2-3 hours"}')
    `);
    console.log('✅ Sample products inserted');

    // Test the connection with the new database
    console.log('🧪 Testing database connection...');
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database test successful:', rows);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update your .env file with the correct database credentials');
    console.log('   2. Run: npm run dev');
    console.log('   3. Visit: http://localhost:3001/health');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Check your database username and password in .env file');
      console.log('   - Make sure MySQL server is running');
      console.log('   - Verify the user has CREATE DATABASE privileges');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Make sure MySQL server is running');
      console.log('   - Check if the port number is correct (default: 3306)');
      console.log('   - Verify the host address is correct');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();
