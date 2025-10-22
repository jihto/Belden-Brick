/**
 * Product Types and Interfaces
 * 
 * This file contains all TypeScript interfaces and types related to products
 * used across the products page and related components.
 */

// Base Product Interface

export interface Product {
  id: number;
  name: string;
  title?: string; // For compatibility with existing components
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  imageUrl?: string; 
  images?: string[];
  specifications?: {
    dimensions?: string;
    weight?: string;
    strength?: string;
    absorption?: string;
    color?: string;
    material?: string;
    features?: string[];
  } | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 

// Product Category Interface
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
  parentId?: string;
  children?: ProductCategory[];
}

// Product Filter Interface
export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

// Product List Response Interface
export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: ProductFilter;
}

// Product State Interface for React Components
export interface ProductState {
  products: Product[];
  selectedCategory: string;
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilter;
}

// Product Action Types for State Management
export type ProductAction = 
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_FILTERS'; payload: ProductFilter }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'FILTER_PRODUCTS' };

// Product Card Props Interface
export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  showActions?: boolean;
  className?: string;
}

// Product Grid Props Interface
export interface ProductGridProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

// Category Filter Props Interface
export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

// Product Search Props Interface
export interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

// Product Sort Props Interface
export interface ProductSortProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  className?: string;
}

// Product Pagination Props Interface
export interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Product Form Data Interface (for admin/editing)
export interface ProductFormData {
  title: string;
  size: string;
  category: string;
  image: string;
  description?: string;
  price?: number;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
}

// Product Validation Interface
export interface ProductValidation {
  title: boolean;
  size: boolean;
  category: boolean;
  image: boolean;
  price?: boolean;
}

// Product API Response Interface
export interface ProductApiResponse {
  success: boolean;
  data?: Product | Product[];
  message?: string;
  error?: string;
}

// Product Statistics Interface
export interface ProductStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  outOfStockProducts: number;
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
}

// Product Comparison Interface
export interface ProductComparison {
  products: Product[];
  maxProducts: number;
  features: string[];
}

// Product Wishlist Interface
export interface ProductWishlist {
  id: string;
  userId: string;
  productId: number;
  product: Product;
  addedAt: Date;
}

// Product Review Interface
export interface ProductReview {
  id: string;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  helpful: number;
  verified: boolean;
}

// Product FAQ Interface
export interface ProductFAQ {
  id: string;
  productId: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

// Product Specification Interface
export interface ProductSpecification {
  id: string;
  productId: number;
  name: string;
  value: string;
  unit?: string;
  category: string;
  order: number;
}

// Product Variant Interface
export interface ProductVariant {
  id: string;
  productId: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  image?: string;
  isDefault?: boolean;
}

// Product Bundle Interface
export interface ProductBundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  discount: number;
  totalPrice: number;
  image?: string;
  isActive: boolean;
}

// Product Recommendation Interface
export interface ProductRecommendation {
  product: Product;
  reason: string;
  score: number;
  type: 'similar' | 'complementary' | 'trending' | 'personalized';
}

// Export all interfaces as a namespace for easier imports
export namespace ProductTypes {
  export type Base = Product;
  export type Category = ProductCategory;
  export type Filter = ProductFilter;
  export type ListResponse = ProductListResponse;
  export type State = ProductState;
  export type Action = ProductAction;
  export type CardProps = ProductCardProps;
  export type GridProps = ProductGridProps;
  export type CategoryFilter = CategoryFilterProps;
  export type SearchProps = ProductSearchProps;
  export type SortProps = ProductSortProps;
  export type PaginationProps = ProductPaginationProps;
  export type FormData = ProductFormData;
  export type Validation = ProductValidation;
  export type ApiResponse = ProductApiResponse;
  export type Stats = ProductStats;
  export type Comparison = ProductComparison;
  export type Wishlist = ProductWishlist;
  export type Review = ProductReview;
  export type FAQ = ProductFAQ;
  export type Specification = ProductSpecification;
  export type Variant = ProductVariant;
  export type Bundle = ProductBundle;
  export type Recommendation = ProductRecommendation;
}
