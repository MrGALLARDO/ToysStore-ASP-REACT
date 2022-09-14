
import { useNavigate} from "react-router-dom";
import FormCategory from "./FormCategory";

export default function CreateCategory(){
    const navigate = useNavigate();

    return(
        <>
        <h3>Crear Categoria</h3>
       <FormCategory model={{name : '', description:''}}
       onSubmit={async values =>{
        await new Promise(r => setTimeout(r,3000))
        console.log(values);
       }}
       />
        </>
    )
}