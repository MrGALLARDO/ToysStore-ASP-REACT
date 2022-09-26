export interface brandDTO {
  id: number;
  name: string;
  biography: string;
  releaseDate: Date;
  image: string;
}

export interface brandCreationDTO {
  name: string;
  releaseDate?: Date;
  image?: File;
  imageLink?: string;
  biography?: string;
}

export interface brandToyDTO {
  id: number;
  name: string;
  // website: string;
  image: string;
}

