import { brandCreationDTO } from "../brand/brands.model";
import { toyCreationDTO } from "../ToyStore/toys.models";


export function convertBrandToFormData(brand: brandCreationDTO): FormData{
    const formData = new FormData();

    formData.append('name', brand.name);
    if (brand.biography){
        formData.append('biography', brand.biography);
    }

    if (brand.releaseDate){
        formData.append("releaseDate", formatDate(brand.releaseDate));
    }

    if (brand.image){
        formData.append("image", brand.image);
    }

    return formData;
}

export function convertToyToFormData(toy: toyCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', toy.name);

    // if (toy.resumen){
    //     formData.append('resumen', toy.resumen);
    // }

    formData.append('description', toy.description);
    formData.append('inStock', String(toy.inStock));
    if (toy.releaseDate){
        formData.append("registerDate", formatDate(toy.releaseDate));
    }

    if (toy.image){
        formData.append('image', toy.image);
    }

    formData.append("categoriesIds", JSON.stringify(toy.categoriesIds));
    formData.append("branchesIds", JSON.stringify(toy.branchesIds));
    formData.append("brands", JSON.stringify(toy.brands));

    return formData;
}

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: "2-digit"
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}