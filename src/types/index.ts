export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface ProductWithRelations {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  stock: number;
  images: string[];
  categoryId: string;
  brandId: string;
  specs: Record<string, string> | null;
  featured: boolean;
  isNew: boolean;
  isOffer: boolean;
  isActive: boolean;
  createdAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
  };
}

export interface CategoryWithChildren {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  parentId: string | null;
  children?: CategoryWithChildren[];
  _count?: { products: number };
}

export interface BrandInfo {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  _count?: { products: number };
}

export interface SearchParams {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
  inStock?: string;
}
