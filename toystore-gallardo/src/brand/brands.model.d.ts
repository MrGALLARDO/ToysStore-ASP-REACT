export interface brandDTO {
  id: number;
  name: string;
  biography: string;
  image: string;
}

export interface brandCreationDTO {
  name: string;
  image?: File;
  imageLink?: string;
  biography?: string;
}

export interface brandToyDTO {
  id: number;
  name: string;
  image: string;
}

