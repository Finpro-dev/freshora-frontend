import { Discount } from "./discount-type";

export enum DietType {
  VEGAN = "VEGAN",
  VEGETARIAN = "VEGETARIAN",
  GLUTEN_FREE = "GLUTEN_FREE",
  HALAL = "HALAL",
}

export enum ProductGrade {
  A = "A",
  B = "B",
  C = "C",
}

export enum Unit {
  KG = "KG",
  G = "G",
  PCS = "PCS",
  PACK = "PACK",
}

export interface ProductPhotos {
  photoUrl: string;
}

export interface Product {
  serialNumber: string;
  name: string;
  slug: string;
  productCategoryId: string;
  price: number;
  description: string;
  weightPerGram: number;
  unit: Unit;
  productPhotos: ProductPhotos[];
  storageInstructions: string;
  grade: ProductGrade;
  dietType: DietType;
  discount: Discount[];
}
