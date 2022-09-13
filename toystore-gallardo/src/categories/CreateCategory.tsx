
import { useNavigate, Link } from "react-router-dom";
import Button from "../utils/Buttons";
import { Field,Form,Formik } from "formik";
export default function CreateCategory(){
    const navigate = useNavigate();

    return(
        <>
        <h3>Crear Categoria</h3>
        <Formik initialValues={{
            nombre: ''
        }}
        onSubmit={values =>{
            console.log(values);
        }}
        >
        <Form>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Field name="Nombre" className="form-control"/>
            </div>
            <Button type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/category">Cancelar</Link>
        </Form>
        </Formik>

        </>
    )
}