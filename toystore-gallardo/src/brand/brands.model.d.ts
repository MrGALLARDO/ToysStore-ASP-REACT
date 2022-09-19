export interface brandCreationDTO {
  name: string;
  releaseDate: Date;
  image?: File;
  imageLink?: string;
  description?: string;
}

export interface brandToyDTO {
  id: number;
  name: string;
  details: string;
  image: string;
}
