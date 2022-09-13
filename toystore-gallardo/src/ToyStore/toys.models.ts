import { Decipher } from "crypto";

// Modelo de interface del Juguete.
export interface toy{
    id: number;
    name: string;
    description: string;
    agerestriction: boolean;
    company: string;
    precio: number;
    image: string;
}

// Interfaz de estado.
export interface landingPageDTO{
    toysRestrictionAge?: toy[];
    toysWithOutRestrictionAge?: toy[];
}