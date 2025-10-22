/**
 * Types Index File
 * 
 * This file exports all TypeScript interfaces and types from the application
 * for easy importing across components and pages.
 */

// Product Types
export * from './products.types';
export type {
  Product,
  ProductCategory,
  ProductFilter,
  ProductListResponse,
  ProductState,
  ProductAction,
  ProductCardProps,
  ProductGridProps,
  CategoryFilterProps,
  ProductSearchProps,
  ProductSortProps,
  ProductPaginationProps,
  ProductFormData,
  ProductValidation,
  ProductApiResponse,
  ProductStats,
  ProductComparison,
  ProductWishlist,
  ProductReview,
  ProductFAQ,
  ProductSpecification,
  ProductVariant,
  ProductBundle,
  ProductRecommendation,
  ProductTypes
} from './products.types';

// Product Details Types
export * from './product-details.types';
export type {
  ImageWithCaption,
  Project,
  ProjectDto,
  ProductSpecification as ProductDetailsSpecification,
  ProductFeature,
  ProductApplication,
  ProductReview as ProductDetailsReview,
  ProductFAQ as ProductDetailsFAQ,
  ProductGallery,
  ProductDetailsState,
  ProductDetailsAction,
  ProductDetailsProps,
  ImageDialogProps,
  ProductGalleryProps,
  ProductSpecificationsProps,
  ProductFeaturesProps,
  ProductApplicationsProps,
  ProductReviewsProps,
  ProductFAQProps,
  ProductTabsProps,
  ProductCTAProps,
  ProductRelatedProps,
  ProductBreadcrumbProps,
  ProductSEOProps,
  ProductShareProps,
  ProductComparisonProps,
  ProductWishlistProps,
  ProductDetailsFormData,
  ProductDetailsApiResponse,
  ProductDetailsValidation,
  ProductDetailsStats,
  ProductDetailsTypes
} from './product-details.types';

// Design Types
export * from './design.types';
export type {
  Design,
  DesignCategory,
  DesignFilter,
  DesignListResponse,
  DesignState,
  DesignAction,
  DesignCardProps,
  DesignGridProps,
  DesignCategoryFilterProps,
  DesignSearchProps,
  DesignSortProps,
  DesignPaginationProps,
  DesignFormData,
  DesignValidation,
  DesignApiResponse,
  DesignStats,
  DesignComparison,
  DesignWishlist,
  DesignReview,
  DesignFAQ,
  DesignGallery,
  DesignDetails,
  DesignSpecification,
  DesignFeature,
  DesignApplication,
  DesignBreadcrumbProps,
  DesignSEOProps,
  DesignShareProps,
  DesignLikeProps,
  DesignViewProps,
  DesignTagProps,
  DesignFilterSidebarProps,
  DesignModalProps,
  DesignCarouselProps,
  DesignTypes
} from './design.types';

// Common Types (if any)
export interface BaseEntity {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  pagination?: PaginationParams;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Component Props Base Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BaseFormProps extends BaseComponentProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface BaseModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface BaseCardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
  isActive?: boolean;
  isExternal?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  iterationCount?: number | 'infinite';
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  stack?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Utility types are exported directly above
