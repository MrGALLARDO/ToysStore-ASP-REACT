export interface characterCreationDTO {
  name: string;
  releaseDate: Date;
  image?: File;
  imageLink?: string;
  description?: string;
}

export interface characterToyDTO {
  id: number;
  name: string;
  details: string;
  image: string;
}
