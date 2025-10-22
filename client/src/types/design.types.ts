/**
 * Design Types and Interfaces
 * 
 * This file contains all TypeScript interfaces and types related to design
 * used in the design page and related components.
 */

// Base Design Interface
export interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  slug?: string;
  tags?: string[];
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  viewCount?: number;
  likeCount?: number;
  shareCount?: number;
}

// Design Category Interface
export interface DesignCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  designCount?: number;
  parentId?: string;
  children?: DesignCategory[];
  isActive?: boolean;
}

// Design Filter Interface
export interface DesignFilter {
  category?: string;
  tags?: string[];
  featured?: boolean;
  search?: string;
  sortBy?: 'title' | 'createdAt' | 'viewCount' | 'likeCount' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Design List Response Interface
export interface DesignListResponse {
  designs: Design[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: DesignFilter;
  categories: DesignCategory[];
}

// Design State Interface for React Components
export interface DesignState {
  designs: Design[];
  selectedCategory: string;
  filteredDesigns: Design[];
  isLoading: boolean;
  error: string | null;
  filters: DesignFilter;
  categories: DesignCategory[];
}

// Design Action Types for State Management
export type DesignAction = 
  | { type: 'SET_DESIGNS'; payload: Design[] }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_FILTERS'; payload: DesignFilter }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CATEGORIES'; payload: DesignCategory[] }
  | { type: 'FILTER_DESIGNS' };

// Design Card Props Interface
export interface DesignCardProps {
  design: Design;
  onSelect?: (design: Design) => void;
  onLike?: (design: Design) => void;
  onShare?: (design: Design) => void;
  showActions?: boolean;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

// Design Grid Props Interface
export interface DesignGridProps {
  designs: Design[];
  onDesignSelect?: (design: Design) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

// Design Category Filter Props Interface
export interface DesignCategoryFilterProps {
  categories: DesignCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
  variant?: 'sidebar' | 'horizontal' | 'dropdown';
}

// Design Search Props Interface
export interface DesignSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
  onFilterToggle?: () => void;
}

// Design Sort Props Interface
export interface DesignSortProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  className?: string;
}

// Design Pagination Props Interface
export interface DesignPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showInfo?: boolean;
}

// Design Form Data Interface (for admin/editing)
export interface DesignFormData {
  title: string;
  category: string;
  image: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
}

// Design Validation Interface
export interface DesignValidation {
  title: boolean;
  category: boolean;
  image: boolean;
  description?: boolean;
}

// Design API Response Interface
export interface DesignApiResponse {
  success: boolean;
  data?: Design | Design[];
  message?: string;
  error?: string;
}

// Design Statistics Interface
export interface DesignStats {
  totalDesigns: number;
  totalCategories: number;
  featuredDesigns: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  averageViews: number;
  topCategory: string;
}

// Design Comparison Interface
export interface DesignComparison {
  designs: Design[];
  maxDesigns: number;
  features: string[];
}

// Design Wishlist Interface
export interface DesignWishlist {
  id: string;
  userId: string;
  designId: number;
  design: Design;
  addedAt: Date;
}

// Design Review Interface
export interface DesignReview {
  id: string;
  designId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  helpful: number;
  verified: boolean;
}

// Design FAQ Interface
export interface DesignFAQ {
  id: string;
  designId: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

// Design Gallery Interface
export interface DesignGallery {
  mainImage: string;
  thumbnails: string[];
  allImages: string[];
  currentIndex: number;
  totalImages: number;
}

// Design Details Interface (extends base Design)
export interface DesignDetails extends Design {
  fullDescription: string;
  specifications?: DesignSpecification[];
  features?: DesignFeature[];
  applications?: DesignApplication[];
  relatedDesigns?: Design[];
  reviews?: DesignReview[];
  faqs?: DesignFAQ[];
  gallery: DesignGallery;
  architect?: string;
  location?: string;
  year?: number;
  area?: number;
  style?: string;
  materials?: string[];
}

// Design Specification Interface
export interface DesignSpecification {
  id: string;
  name: string;
  value: string;
  unit?: string;
  category: 'dimensions' | 'area' | 'materials' | 'style' | 'other';
  order: number;
}

// Design Feature Interface
export interface DesignFeature {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category: 'architecture' | 'interior' | 'landscape' | 'sustainability' | 'technology' | 'aesthetics';
  order: number;
  isHighlighted?: boolean;
}

// Design Application Interface
export interface DesignApplication {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'residential' | 'commercial' | 'industrial' | 'public' | 'hospitality' | 'educational';
  examples?: string[];
  order: number;
}

// Design Breadcrumb Props Interface
export interface DesignBreadcrumbProps {
  category: string;
  designTitle: string;
  className?: string;
}

// Design SEO Props Interface
export interface DesignSEOProps {
  design: DesignDetails;
  className?: string;
}

// Design Share Props Interface
export interface DesignShareProps {
  design: Design;
  onShare: (platform: string) => void;
  className?: string;
}

// Design Like Props Interface
export interface DesignLikeProps {
  designId: number;
  isLiked: boolean;
  likeCount: number;
  onToggle: (designId: number) => void;
  className?: string;
}

// Design View Props Interface
export interface DesignViewProps {
  design: Design;
  onView: (design: Design) => void;
  className?: string;
}

// Design Tag Props Interface
export interface DesignTagProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
  maxTags?: number;
}

// Design Filter Sidebar Props Interface
export interface DesignFilterSidebarProps {
  categories: DesignCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filters: DesignFilter;
  onFilterChange: (filters: DesignFilter) => void;
  onClearFilters: () => void;
  className?: string;
}

// Design Modal Props Interface
export interface DesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: Design | null;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
}

// Design Carousel Props Interface
export interface DesignCarouselProps {
  designs: Design[];
  onDesignSelect: (design: Design) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

// Export all interfaces as a namespace for easier imports
export namespace DesignTypes {
  export type Base = Design;
  export type Category = DesignCategory;
  export type Filter = DesignFilter;
  export type ListResponse = DesignListResponse;
  export type State = DesignState;
  export type Action = DesignAction;
  export type CardProps = DesignCardProps;
  export type GridProps = DesignGridProps;
  export type CategoryFilterProps = DesignCategoryFilterProps;
  export type SearchProps = DesignSearchProps;
  export type SortProps = DesignSortProps;
  export type PaginationProps = DesignPaginationProps;
  export type FormData = DesignFormData;
  export type Validation = DesignValidation;
  export type ApiResponse = DesignApiResponse;
  export type Stats = DesignStats;
  export type Comparison = DesignComparison;
  export type Wishlist = DesignWishlist;
  export type Review = DesignReview;
  export type FAQ = DesignFAQ;
  export type Gallery = DesignGallery;
  export type Details = DesignDetails;
  export type Specification = DesignSpecification;
  export type Feature = DesignFeature;
  export type Application = DesignApplication;
  export type BreadcrumbProps = DesignBreadcrumbProps;
  export type SEOProps = DesignSEOProps;
  export type ShareProps = DesignShareProps;
  export type LikeProps = DesignLikeProps;
  export type ViewProps = DesignViewProps;
  export type TagProps = DesignTagProps;
  export type FilterSidebarProps = DesignFilterSidebarProps;
  export type ModalProps = DesignModalProps;
  export type CarouselProps = DesignCarouselProps;
}
