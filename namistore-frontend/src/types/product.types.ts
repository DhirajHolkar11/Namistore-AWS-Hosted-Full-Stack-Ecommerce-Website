export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive:boolean;

  category: {
    id: number;
    name: string;
  };
};