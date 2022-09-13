import { Link } from "react-router-dom";

export default function IndexBrand(){
    return (
        <>
        <h3>Marcas</h3>
        <Link to="/brand/create">Crear Marca</Link>
        </>
    )
}