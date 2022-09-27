import { branchDTO } from "../branch/branch.models";
import { brandToyDTO } from "../brand/brands.model";
import { CategoryDTO } from "../categories/category.model";

// Modelo de interface del Juguete.
export interface toyDTO {
  id: number;
  name: string;
  description: string;
  inStock: boolean;
  price: number;
  review: string;
  comingSoonDate: Date;
  image: string;
  categories: CategoryDTO[];
  branches: branchDTO[];
  brands: brandToyDTO[];
}

export interface toyCreationDTO {
  name: string;
  inStock: boolean;
  description: string;
  price: number;
  comingSoonDate?: Date;
  image?: File;
  imageLink?: string;
  review: string;
  categoriesIds?: number[];
  branchesIds?: number[];
  brands?: brandToyDTO[];
}

// Interfaz de estado.
export interface landingPageDTO {
   inStock?: toyDTO[];
   nextToys?: toyDTO[];
}

export interface toyPostGetDTO{
  toy: toyDTO;
  categories:  CategoryDTO[];
  branches : branchDTO[];
}