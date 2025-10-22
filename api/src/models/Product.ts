import { executeQuery, executeSingleQuery } from '../config/database';
import { Product, CreateProductData, UpdateProductData, ProductSearchParams } from '../types';

export class ProductModel {
  private tableName = 'products';

  // Create a new product
  async create(productData: CreateProductData): Promise<Product> {
    const { name, description, price, category, sku, stock, imageUrl, images, location, year, specifications } = productData;
    
    const query = `
      INSERT INTO ${this.tableName} 
      (name, description, price, category, sku, stock, image_url, location, year, images, specifications, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    const params = [
      name, 
      description, 
      price, 
      category, 
      sku, 
      stock, 
      imageUrl || null,
      location || null,
      year || null,
      images ? JSON.stringify(images) : null,
      specifications ? JSON.stringify(specifications) : null,
      true
    ];
    
    const result = await executeSingleQuery(query, params);
    const product = await this.findById(result.insertId);
    if (!product) {
      throw new Error('Failed to create product');
    }
    return product;
  }

  // Find product by ID
  async findById(id: number): Promise<Product | null> {
    const query = `
      SELECT id, name, description, price, category, sku, stock, image_url as imageUrl,
             location, year, images, specifications, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE id = ?
    `;
    
    const results = await executeQuery<Product>(query, [id]);
    if (results.length > 0) {
      const product = results[0];
      // Parse JSON fields if they exist
      if (product.specifications && typeof product.specifications === 'string') {
        try {
          product.specifications = JSON.parse(product.specifications);
        } catch (error) {
          console.error('Error parsing specifications JSON:', error);
          product.specifications = {};
        }
      }
      if (product.images && typeof product.images === 'string') {
        try {
          product.images = JSON.parse(product.images);
        } catch (error) {
          console.error('Error parsing images JSON:', error);
          product.images = [];
        }
      }
      return product;
    }
    return null;
  }

  // Find product by SKU
  async findBySku(sku: string): Promise<Product | null> {
    const query = `
      SELECT id, name, description, price, category, sku, stock, image_url as imageUrl,
             location, year, images, specifications, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE sku = ?
    `;
    
    const results = await executeQuery<Product>(query, [sku]);
    if (results.length > 0) {
      const product = results[0];
      if (product.specifications && typeof product.specifications === 'string') {
        try {
          product.specifications = JSON.parse(product.specifications);
        } catch (error) {
          console.error('Error parsing specifications JSON:', error);
          product.specifications = {};
        }
      }
      if (product.images && typeof product.images === 'string') {
        try {
          product.images = JSON.parse(product.images);
        } catch (error) {
          console.error('Error parsing images JSON:', error);
          product.images = [];
        }
      }
      return product;
    }
    return null;
  }

  // Get all products with pagination and search
  async findAll(params: ProductSearchParams = {}): Promise<{ products: Product[]; total: number }> {
    const {
      q = '',
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = params;

    const offset = (page - 1) * limit;
    
    // Build WHERE clause
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];

    if (q) {
      whereClause += ' AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)';
      const searchTerm = `%${q}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      whereClause += ' AND category = ?';
      queryParams.push(category);
    }

    if (minPrice !== undefined) {
      whereClause += ' AND price >= ?';
      queryParams.push(minPrice);
    }

    if (maxPrice !== undefined) {
      whereClause += ' AND price <= ?';
      queryParams.push(maxPrice);
    }

    // Count total records
    const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
    const countResult = await executeQuery<{ total: number }>(countQuery, queryParams);
    const total = countResult[0].total;

    // Get products
    const query = `
      SELECT id, name, description, price, category, sku, stock, image_url as imageUrl,
             location, year, images, specifications, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const results = await executeQuery<Product>(query, [...queryParams, limit, offset]);
    
    // Parse JSON fields for each product
    const products = results.map(product => {
      if (product.specifications && typeof product.specifications === 'string') {
        try {
          product.specifications = JSON.parse(product.specifications);
        } catch (error) {
          console.error('Error parsing specifications JSON:', error);
          product.specifications = {};
        }
      }
      if (product.images && typeof product.images === 'string') {
        try {
          product.images = JSON.parse(product.images);
        } catch (error) {
          console.error('Error parsing images JSON:', error);
          product.images = [];
        }
      }
      return product;
    });
    
    return { products, total };
  }

  // Get products by category
  async findByCategory(category: string, limit: number = 10): Promise<Product[]> {
    const query = `
      SELECT id, name, description, price, category, sku, stock, image_url as imageUrl,
             location, year, images, specifications, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE category = ? AND is_active = true
      ORDER BY created_at DESC
      LIMIT ?
    `;
    
    const results = await executeQuery<Product>(query, [category, limit]);
    
    // Parse JSON fields for each product
    return results.map(product => {
      if (product.specifications && typeof product.specifications === 'string') {
        try {
          product.specifications = JSON.parse(product.specifications);
        } catch (error) {
          console.error('Error parsing specifications JSON:', error);
          product.specifications = {};
        }
      }
      if (product.images && typeof product.images === 'string') {
        try {
          product.images = JSON.parse(product.images);
        } catch (error) {
          console.error('Error parsing images JSON:', error);
          product.images = [];
        }
      }
      return product;
    });
  }


  // Update product
  async update(id: number, productData: UpdateProductData): Promise<Product | null> {
    const fields: string[] = [];
    const params: any[] = [];

    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'imageUrl' ? 'image_url' : 
                     key === 'isActive' ? 'is_active' : key;
        fields.push(`${dbKey} = ?`);
        
        // Handle JSON fields
        if ((key === 'specifications' || key === 'images') && typeof value === 'object') {
          params.push(JSON.stringify(value));
        } else {
          params.push(value);
        }
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push('updated_at = NOW()');
    params.push(id);

    const query = `UPDATE ${this.tableName} SET ${fields.join(', ')} WHERE id = ?`;
    await executeSingleQuery(query, params);
    
    return this.findById(id);
  }

  // Delete product
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await executeSingleQuery(query, [id]);
    return result.affectedRows > 0;
  }

  // Update stock
  async updateStock(id: number, newStock: number): Promise<boolean> {
    const query = `UPDATE ${this.tableName} SET stock = ?, updated_at = NOW() WHERE id = ?`;
    const result = await executeSingleQuery(query, [newStock, id]);
    return result.affectedRows > 0;
  }

  // Get all unique categories
  async getCategories(): Promise<string[]> {
    const query = `SELECT * FROM categories WHERE is_active = 1`;
    const result = await executeQuery<{ name: string }>(query);
    return result.map(row => row.name);
  }
}
