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
  id: number;
  name: string;
  // website: string;
  image: string;
}

