export type ProductsProps = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type ProductProps = {
  product: ProductsProps;
};

export type ProductPropsV1 = {
  _id: string;
  user: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  price: number;
  reviews: number[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};
