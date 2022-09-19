import { brandToyDTO } from "../brand/brands.model";

// Modelo de interface del Juguete.
export interface toy {
  id: number;
  name: string;
  description: string;
  agerestriction: boolean;
  company: string;
  price: number;
  image: string;
}

export interface toyCreationDTO {
  name: string;
  atSucursal: boolean;
  description: string;
  releaseDate?: Date;
  image?: File;
  imageLink?: string;
  categoriesIds?: number[];
  branchesIds?: number[];
  brands?: brandToyDTO[];
}

// Interfaz de estado.
export interface landingPageDTO {
  toysRestrictionAge?: toy[];
  toysWithOutRestrictionAge?: toy[];
}
