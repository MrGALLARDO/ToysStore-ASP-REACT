import { branchDTO } from "../branch/branch.models";
import { brandToyDTO } from "../brand/brands.model";
import { CategoryDTO } from "../categories/category.model";

// Modelo de interface del Juguete.
export interface toyDTO {
  id: number;
  name: string;
  description?: string;
  inStock: boolean;
  price: number;
  review: string;
  comingSoonDate: Date;
  image: string;
  categories: CategoryDTO[];
  branches: branchDTO[];
  brands: brandToyDTO[];
  voteUser?: number;
  averageVote?: number;
}

export interface toyCreationDTO {
  name: string;
  inStock: boolean;
  description?: string;
  price?: number;
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
   comingSoonToys?: toyDTO[];
}

export interface toyPostGetDTO{
  categories:  CategoryDTO[];
  branches : branchDTO[];
}

export interface toyPutGetDTO {
  toy: toyDTO;
  categoriesSelected: CategoryDTO[];
  categoriesNotSelected: CategoryDTO[];
  branchesSelected: branchDTO[];
  branchesNotSelected: branchDTO[];
  brands: brandToyDTO[];
}