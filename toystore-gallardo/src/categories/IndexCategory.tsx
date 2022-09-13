import { Link } from "react-router-dom";

export default function IndexCategory(){
    return (
        <>
        <h3>Categoria</h3>
        <Link to="/category/create">Crear Categoria</Link>
        </>
    )
}