import { executeQuery, executeSingleQuery } from '../config/database';
import { User, CreateUserData, UpdateUserData, UserSearchParams } from '../types';
import bcrypt from 'bcryptjs';

export class UserModel {
  private tableName = 'users';

  // Create a new user
  async create(userData: CreateUserData): Promise<User> {
    const { username, email, password, firstName, lastName, role = 'user' } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO ${this.tableName} 
      (username, email, password, first_name, last_name, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    const params = [username, email, hashedPassword, firstName, lastName, role, true];
    
    const result = await executeSingleQuery(query, params);
    const user = await this.findById(result.insertId);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    const query = `
      SELECT id, username, email, first_name as firstName, last_name as lastName, 
             role, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE id = ?
    `;
    
    const results = await executeQuery<User>(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, username, email, password, first_name as firstName, last_name as lastName, 
             role, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE email = ?
    `;
    
    const results = await executeQuery<User>(query, [email]);
    return results.length > 0 ? results[0] : null;
  }

  // Find user by username
  async findByUsername(username: string): Promise<User | null> {
    const query = `
      SELECT id, username, email, password, first_name as firstName, last_name as lastName, 
             role, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      WHERE username = ?
    `;
    
    const results = await executeQuery<User>(query, [username]);
    return results.length > 0 ? results[0] : null;
  }

  // Get all users with pagination and search
  async findAll(params: UserSearchParams = {}): Promise<{ users: User[]; total: number }> {
    const {
      q = '',
      role,
      isActive,
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
      whereClause += ' AND (username LIKE ? OR email LIKE ? OR first_name LIKE ? OR last_name LIKE ?)';
      const searchTerm = `%${q}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (role) {
      whereClause += ' AND role = ?';
      queryParams.push(role);
    }

    if (typeof isActive === 'boolean') {
      whereClause += ' AND is_active = ?';
      queryParams.push(isActive);
    }

    // Count total records
    const countQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
    const countResult = await executeQuery<{ total: number }>(countQuery, queryParams);
    const total = countResult[0].total;

    // Get users
    const query = `
      SELECT id, username, email, first_name as firstName, last_name as lastName, 
             role, is_active as isActive, created_at as createdAt, updated_at as updatedAt
      FROM ${this.tableName} 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const users = await executeQuery<User>(query, [...queryParams, limit, offset]);
    
    return { users, total };
  }

  // Update user
  async update(id: number, userData: UpdateUserData): Promise<User | null> {
    const fields: string[] = [];
    const params: any[] = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbKey = key === 'firstName' ? 'first_name' : 
                     key === 'lastName' ? 'last_name' : 
                     key === 'isActive' ? 'is_active' : key;
        fields.push(`${dbKey} = ?`);
        params.push(value);
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

  // Delete user
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await executeSingleQuery(query, [id]);
    return result.affectedRows > 0;
  }

  // Verify password
  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // Update password
  async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const query = `UPDATE ${this.tableName} SET password = ?, updated_at = NOW() WHERE id = ?`;
    const result = await executeSingleQuery(query, [hashedPassword, id]);
    return result.affectedRows > 0;
  }
}
