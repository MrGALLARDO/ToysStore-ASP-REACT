import { brandCreationDTO } from "../brand/brands.model";


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

// export function convertirPeliculaAFormData(pelicula: peliculaCreacionDTO): FormData {
//     const formData = new FormData();

//     formData.append('titulo', pelicula.titulo);

//     if (pelicula.resumen){
//         formData.append('resumen', pelicula.resumen);
//     }

//     formData.append('trailer', pelicula.trailer);
//     formData.append('enCines', String(pelicula.enCines));
//     if (pelicula.fechaLanzamiento){
//         formData.append("fechaLanzamiento", formatearFecha(pelicula.fechaLanzamiento));
//     }

//     if (pelicula.poster){
//         formData.append('poster', pelicula.poster);
//     }

//     formData.append("generosIds", JSON.stringify(pelicula.generosIds));
//     formData.append("cinesIds", JSON.stringify(pelicula.cinesIds));
//     formData.append("actores", JSON.stringify(pelicula.actores));

//     return formData;
// }

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