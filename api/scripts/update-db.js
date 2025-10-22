const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateDatabase() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4'
    });

    console.log('✅ Connected to database');

    // Add new columns to products table
    const alterQueries = [
      `ALTER TABLE products ADD COLUMN location VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci AFTER image_url`,
      `ALTER TABLE products ADD COLUMN year INT AFTER location`,
      `ALTER TABLE products ADD COLUMN images JSON AFTER year`
    ];

    for (const query of alterQueries) {
      try {
        await connection.execute(query);
        console.log('✅ Executed:', query);
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log('⚠️  Column already exists, skipping:', query);
        } else {
          throw error;
        }
      }
    }

    // Add indexes
    const indexQueries = [
      `CREATE INDEX IF NOT EXISTS idx_products_location ON products(location)`,
      `CREATE INDEX IF NOT EXISTS idx_products_year ON products(year)`
    ];

    for (const query of indexQueries) {
      try {
        await connection.execute(query);
        console.log('✅ Created index:', query);
      } catch (error) {
        console.log('⚠️  Index creation failed or already exists:', error.message);
      }
    }

    console.log('🎉 Database update completed successfully!');

  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

updateDatabase();
