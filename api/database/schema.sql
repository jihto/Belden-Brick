-- Belden Brick Database Schema
-- This file contains the SQL schema for the Belden Brick API database
-- Run this script in your phpMyAdmin to create the necessary tables

-- Create database (uncomment if you need to create the database)
-- CREATE DATABASE IF NOT EXISTS belden_brick_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE belden_brick_db;

-- Set character set for the session
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    first_name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    last_name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    sku VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    stock INT DEFAULT 0,
    image_url VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    specifications JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_sku (sku),
    INDEX idx_price (price),
    INDEX idx_is_active (is_active),
    INDEX idx_name (name),
    FULLTEXT idx_search (name, description, sku)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Categories table (optional - for better category management)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default categories
INSERT IGNORE INTO categories (name, description) VALUES
('Bricks', 'Various types of bricks for construction'),
('Blocks', 'Concrete blocks and masonry units'),
('Pavers', 'Paving stones and decorative blocks'),
('Specialty', 'Specialty masonry products'),
('Accessories', 'Masonry accessories and tools');

-- Insert sample admin user (password: admin123)
-- Note: In production, change this password immediately
INSERT IGNORE INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@beldenbrick.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8KzK', 'Admin', 'User', 'admin');

-- Insert sample products
INSERT IGNORE INTO products (name, description, price, category, sku, stock, image_url, specifications) VALUES
('Standard Red Brick', 'High-quality red clay brick perfect for residential construction', 0.75, 'Bricks', 'BRK-RED-001', 1000, '/images/bricks/red-brick.jpg', '{"dimensions": "8x4x2.25 inches", "weight": "4.5 lbs", "color": "Red", "material": "Clay"}'),
('Concrete Block 8x8x16', 'Standard concrete masonry unit for foundation and wall construction', 2.50, 'Blocks', 'BLK-CON-001', 500, '/images/blocks/concrete-block.jpg', '{"dimensions": "8x8x16 inches", "weight": "35 lbs", "material": "Concrete", "strength": "2000 PSI"}'),
('Decorative Paver Stone', 'Beautiful decorative paver for patios and walkways', 3.25, 'Pavers', 'PAV-DEC-001', 300, '/images/pavers/decorative-paver.jpg', '{"dimensions": "12x12x2 inches", "weight": "15 lbs", "color": "Natural", "finish": "Tumbled"}'),
('Fire Brick', 'Heat-resistant brick for fireplaces and kilns', 1.50, 'Specialty', 'BRK-FIRE-001', 200, '/images/specialty/fire-brick.jpg', '{"dimensions": "9x4.5x2.5 inches", "weight": "6 lbs", "material": "Fire Clay", "max_temp": "2700°F"}'),
('Mortar Mix', 'High-quality mortar mix for masonry work', 8.99, 'Accessories', 'ACC-MORT-001', 100, '/images/accessories/mortar-mix.jpg', '{"weight": "80 lbs", "coverage": "12 sq ft", "type": "Type N", "setting_time": "2-3 hours"}');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_active ON products(category, is_active);
CREATE INDEX IF NOT EXISTS idx_products_price_range ON products(price, is_active);
CREATE INDEX IF NOT EXISTS idx_users_active_role ON users(is_active, role);

-- Create views for common queries
CREATE OR REPLACE VIEW active_products AS
SELECT 
    id, name, description, price, category, sku, stock, image_url, specifications,
    created_at, updated_at
FROM products 
WHERE is_active = TRUE;

CREATE OR REPLACE VIEW active_users AS
SELECT 
    id, username, email, first_name, last_name, role, is_active,
    created_at, updated_at
FROM users 
WHERE is_active = TRUE;

-- Create stored procedures for common operations
DELIMITER //

-- Procedure to get products by category with pagination
CREATE PROCEDURE IF NOT EXISTS GetProductsByCategory(
    IN p_category VARCHAR(50),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        id, name, description, price, category, sku, stock, image_url, specifications,
        created_at, updated_at
    FROM products 
    WHERE category = p_category AND is_active = TRUE
    ORDER BY created_at DESC
    LIMIT p_limit OFFSET p_offset;
END //

-- Procedure to search products
CREATE PROCEDURE IF NOT EXISTS SearchProducts(
    IN p_search_term VARCHAR(255),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        id, name, description, price, category, sku, stock, image_url, specifications,
        created_at, updated_at
    FROM products 
    WHERE is_active = TRUE 
    AND (name LIKE CONCAT('%', p_search_term, '%') 
         OR description LIKE CONCAT('%', p_search_term, '%')
         OR sku LIKE CONCAT('%', p_search_term, '%'))
    ORDER BY 
        CASE 
            WHEN name LIKE CONCAT(p_search_term, '%') THEN 1
            WHEN name LIKE CONCAT('%', p_search_term, '%') THEN 2
            ELSE 3
        END,
        name
    LIMIT p_limit OFFSET p_offset;
END //

DELIMITER ;

-- Grant permissions (adjust as needed for your cPanel setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON belden_brick_db.* TO 'your_username'@'localhost';
-- FLUSH PRIVILEGES;
