export interface Artwork {
  id: number;
  title: string;
  artist: string;
  description: {
    en: string;
    nl: string;
  };
  price: number | null;
  sold: boolean;
  notForSale: boolean;
  mainImage: string;
  detailImages: string[];
  dimensions: string;
  material: string;
}
