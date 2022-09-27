export interface brandDTO {
  id: number;
  name: string;
  biography: string;
  comingSoonDate: Date;
  image: string;
}

export interface brandCreationDTO {
  name: string;
  comingSoonDate?: Date;
  image?: File;
  imageLink?: string;
  biography?: string;
}

export interface brandToyDTO {
  brands: brandToyDTO[];
  branchesSelected: branchDTO[];
  branchesNotSelected: branchDTO[];
  categoriesNotSelected: CategoryDTO[];
  categoriesSelected: CategoryDTO[];
  id: number;
  name: string;
  image: string;
}

