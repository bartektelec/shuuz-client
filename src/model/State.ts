export interface ImageFormat {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  url: string;
  width: number;
}

export interface Image {
  alternativeText: string;
  caption: string;
  created_at: string;
  ext: string;
  formats: {
    [key: string]: ImageFormat;
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updated_at: "2020-11-05T10:59:26.282Z";
  url: string;
  width: number;
}

export interface Product {
  brand: string;
  category: string;
  created_at: Date;
  description: string;
  featured: boolean;
  id: number;
  image: Image;
  image_url: string | null;
  price: number;
  published_at: string;
  rating: number;
  title: string;
  updated_at: string;
}

export interface Hero {
  created_at: string;
  hero_banner: Image;
  hero_btn_text: string;
  hero_route: string;
  hero_text: string;
  hero_title: string;
  hero_image_url: string;
  id: number;
  published_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  amount: number;
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  created_at: string;
  email: string;
  id: number;
  provider: string;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
  updated_at: string;
  username: string;
}
