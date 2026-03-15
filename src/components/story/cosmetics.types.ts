export type CosmeticProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  gallery?: string[];
  detailedDescription?: string;
  applicationTips?: string[];
  ingredients?: string[];
  actionDescription?: string;
};
