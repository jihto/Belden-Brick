-- Update products table to include new fields
-- Run this script in your phpMyAdmin to add the new columns

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN location VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci AFTER image_url,
ADD COLUMN year INT AFTER location,
ADD COLUMN images JSON AFTER year;

-- Update the specifications column to handle the new structure
-- Note: This will preserve existing data but allow for the new structure
ALTER TABLE products 
MODIFY COLUMN specifications JSON;

-- Add indexes for the new fields
CREATE INDEX IF NOT EXISTS idx_products_location ON products(location);
CREATE INDEX IF NOT EXISTS idx_products_year ON products(year);

-- Update the active_products view to include new fields
CREATE OR REPLACE VIEW active_products AS
SELECT 
    id, name, description, price, category, sku, stock, image_url, location, year, images, specifications,
    created_at, updated_at
FROM products 
WHERE is_active = TRUE;

-- Update stored procedures to include new fields
DELIMITER //

-- Update GetProductsByCategory procedure
DROP PROCEDURE IF EXISTS GetProductsByCategory;
CREATE PROCEDURE GetProductsByCategory(
    IN p_category VARCHAR(50),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        id, name, description, price, category, sku, stock, image_url, location, year, images, specifications,
        created_at, updated_at
    FROM products 
    WHERE category = p_category AND is_active = TRUE
    ORDER BY created_at DESC
    LIMIT p_limit OFFSET p_offset;
END //

-- Update SearchProducts procedure
DROP PROCEDURE IF EXISTS SearchProducts;
CREATE PROCEDURE SearchProducts(
    IN p_search_term VARCHAR(255),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT 
        id, name, description, price, category, sku, stock, image_url, location, year, images, specifications,
        created_at, updated_at
    FROM products 
    WHERE is_active = TRUE 
    AND (name LIKE CONCAT('%', p_search_term, '%') 
         OR description LIKE CONCAT('%', p_search_term, '%')
         OR sku LIKE CONCAT('%', p_search_term, '%')
         OR location LIKE CONCAT('%', p_search_term, '%'))
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
