/**
 * Product Details Types and Interfaces
 * 
 * This file contains all TypeScript interfaces and types related to product details
 * used in the product details page and related components.
 */

import { Product } from './products.types';

// Image with Caption Interface
export interface ImageWithCaption {
  id: number;
  url: string;
  caption?: string;
  alt?: string;
  order?: number;
  isMain?: boolean;
  thumbnail?: string;
}
 
// Project DTO Interface (Data Transfer Object)
export interface ProductDto extends Product { 
}

// Product Specification Interface
export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
  unit?: string;
  category: 'dimensions' | 'weight' | 'strength' | 'absorption' | 'color' | 'material' | 'other';
  order: number;
  isRequired?: boolean;
}

// Product Feature Interface
export interface ProductFeature {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category: 'quality' | 'safety' | 'environment' | 'maintenance' | 'design' | 'durability';
  order: number;
  isHighlighted?: boolean;
}

// Product Application Interface
export interface ProductApplication {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'residential' | 'commercial' | 'industrial' | 'landscape' | 'interior' | 'exterior';
  examples?: string[];
  order: number;
}

// Product Review Interface
export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  helpful: number;
  verified: boolean;
  images?: string[];
  pros?: string[];
  cons?: string[];
}

// Product FAQ Interface
export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isActive: boolean;
  helpful: number;
}

// Product Gallery Interface
export interface ProductGallery {
  mainImage: ImageWithCaption;
  thumbnails: ImageWithCaption[];
  allImages: ImageWithCaption[];
  currentIndex: number;
  totalImages: number;
}

// Product Details State Interface
export interface ProductDetailsState {
  project: ProductDto | null;
  selectedImage: ImageWithCaption | null;
  selectedImageIndex: number;
  isLoading: boolean;
  error: string | null;
  gallery: ProductGallery;
  activeTab: 'overview' | 'specifications' | 'features' | 'applications' | 'reviews' | 'faq';
}

// Product Details Action Types
export type ProductDetailsAction = 
  | { type: 'SET_PROJECT'; payload: ProductDto }
  | { type: 'SET_SELECTED_IMAGE'; payload: { image: ImageWithCaption; index: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'NEXT_IMAGE' }
  | { type: 'PREVIOUS_IMAGE' }
  | { type: 'CLOSE_IMAGE_DIALOG' };

// Product Details Props Interface
export interface ProductDetailsProps {
  projectId?: string;
  projectSlug?: string;
  initialProject?: ProductDto;
  onImageSelect?: (image: ImageWithCaption) => void;
  onTabChange?: (tab: string) => void;
  className?: string;
}

// Image Dialog Props Interface
export interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageWithCaption | null;
  imageIndex: number;
  totalImages: number;
  onNext: () => void;
  onPrevious: () => void;
  projectTitle?: string;
}

// Product Gallery Props Interface
export interface ProductGalleryProps {
  images: ImageWithCaption[];
  onImageSelect: (image: ImageWithCaption, index: number) => void;
  className?: string;
}

// Product Specifications Props Interface
export interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
  className?: string;
}

// Product Features Props Interface
export interface ProductFeaturesProps {
  features: ProductFeature[];
  className?: string;
}

// Product Applications Props Interface
export interface ProductApplicationsProps {
  applications: ProductApplication[];
  className?: string;
}

// Product Reviews Props Interface
export interface ProductReviewsProps {
  reviews: ProductReview[];
  averageRating: number;
  totalReviews: number;
  onAddReview?: () => void;
  className?: string;
}

// Product FAQ Props Interface
export interface ProductFAQProps {
  faqs: ProductFAQ[];
  className?: string;
}

// Product Tabs Props Interface
export interface ProductTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: {
    id: string;
    label: string;
    count?: number;
  }[];
  className?: string;
}

// Product CTA Props Interface
export interface ProductCTAProps {
  onRequestQuote: () => void;
  onDownloadCatalog: () => void;
  onAddToCart?: () => void;
  className?: string;
}

// Product Related Items Props Interface
export interface ProductRelatedProps {
  relatedProducts: Product[];
  onProductSelect: (product: Product) => void;
  className?: string;
}

// Product Breadcrumb Props Interface
export interface ProductBreadcrumbProps {
  category: string;
  productTitle: string;
  className?: string;
}

// Product SEO Props Interface
export interface ProductSEOProps {
  project: ProductDto;
  className?: string;
}

// Product Share Props Interface
export interface ProductShareProps {
  project: ProductDto;
  onShare: (platform: string) => void;
  className?: string;
}

// Product Comparison Props Interface
export interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: number) => void;
  onClear: () => void;
  className?: string;
}

// Product Wishlist Props Interface
export interface ProductWishlistProps {
  productId: number;
  isInWishlist: boolean;
  onToggle: (productId: number) => void;
  className?: string;
}

// Product Form Data Interface (for editing)
export interface ProductDetailsFormData {
  title: string;
  description: string;
  category: string;
  location?: string;
  year?: number;
  images: ImageWithCaption[];
  specifications: ProductSpecification[];
  features: ProductFeature[];
  applications: ProductApplication[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Product API Response Interface
export interface ProductDetailsApiResponse {
  success: boolean;
  data?: ProductDto;
  message?: string;
  error?: string;
}

// Product Details Validation Interface
export interface ProductDetailsValidation {
  title: boolean;
  description: boolean;
  category: boolean;
  images: boolean;
  specifications: boolean;
  features: boolean;
  applications: boolean;
}

// Product Details Statistics Interface
export interface ProductDetailsStats {
  viewCount: number;
  shareCount: number;
  downloadCount: number;
  inquiryCount: number;
  averageRating: number;
  totalReviews: number;
}

// Export all interfaces as a namespace for easier imports
export namespace ProductDetailsTypes {
  export type Specification = ProductSpecification;
  export type Feature = ProductFeature;
  export type Application = ProductApplication;
  export type Review = ProductReview;
  export type FAQ = ProductFAQ;
  export type Gallery = ProductGallery;
  export type State = ProductDetailsState;
  export type Action = ProductDetailsAction;
  export type Props = ProductDetailsProps;
  export type ImageDialog = ImageDialogProps;
  export type GalleryProps = ProductGalleryProps;
  export type SpecificationsProps = ProductSpecificationsProps;
  export type FeaturesProps = ProductFeaturesProps;
  export type ApplicationsProps = ProductApplicationsProps;
  export type ReviewsProps = ProductReviewsProps;
  export type FAQProps = ProductFAQProps;
  export type TabsProps = ProductTabsProps;
  export type CTAProps = ProductCTAProps;
  export type RelatedProps = ProductRelatedProps;
  export type BreadcrumbProps = ProductBreadcrumbProps;
  export type SEOProps = ProductSEOProps;
  export type ShareProps = ProductShareProps;
  export type ComparisonProps = ProductComparisonProps;
  export type WishlistProps = ProductWishlistProps;
  export type FormData = ProductDetailsFormData;
  export type ApiResponse = ProductDetailsApiResponse;
  export type Validation = ProductDetailsValidation;
  export type Stats = ProductDetailsStats;
}
