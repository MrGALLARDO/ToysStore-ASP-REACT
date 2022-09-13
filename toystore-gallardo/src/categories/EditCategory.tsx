import { Link, useParams } from "react-router-dom";

export default function EditCategory(){
    
    const{id}: any = useParams();

    return(
        <>
        <h3>Editar Categoria</h3>
        <h4>El id es {id}</h4>
        </>
    )
}