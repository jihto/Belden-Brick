#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Belden Brick API Setup Script');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env file from template...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created!');
    console.log('⚠️  Please edit .env file with your database credentials\n');
  } else {
    console.log('❌ env.example file not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists\n');
}

// Check if database directory exists
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  console.log('📁 Creating database directory...');
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Database directory created\n');
} else {
  console.log('✅ Database directory exists\n');
}

// Check if schema.sql exists
const schemaPath = path.join(dbDir, 'schema.sql');
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema file exists\n');
} else {
  console.log('❌ Database schema file not found');
  console.log('💡 Please create database/schema.sql file\n');
}

console.log('📋 Next Steps:');
console.log('1. Edit .env file with your database credentials');
console.log('2. Create database in cPanel/phpMyAdmin');
console.log('3. Import database/schema.sql in phpMyAdmin');
console.log('4. Run: npm run dev');
console.log('5. Test: curl http://localhost:3001/health\n');

console.log('🔗 Useful Commands:');
console.log('- npm run dev          # Start development server');
console.log('- npm run build        # Build for production');
console.log('- npm start            # Start production server');
console.log('- node scripts/test-connection.js  # Test database connection\n');

console.log('📚 Documentation: See README.md for detailed setup instructions');
console.log('🎉 Setup complete! Happy coding!');
