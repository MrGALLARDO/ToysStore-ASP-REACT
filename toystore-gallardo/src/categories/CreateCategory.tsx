
import { useNavigate, Link } from "react-router-dom";
import Button from "../utils/Buttons";
import { Field,Form,Formik } from "formik";
import * as Yup from 'yup';

export default function CreateCategory(){
    const navigate = useNavigate();
    const RegisterToy = Yup.object().shape({
        nombre: Yup.string()
          .min(3, 'El nombre del producto debe de tener más de 2 caracteres')
          .max(50, 'El nombre del producto debe de tener menos de 50 caracteres')
          .required('El nombre del producto es requerido'),
        // lastName: Yup.string()
        //   .min(2, 'Too Short!')
        //   .max(50, 'Too Long!')
        //   .required('Required'),
        // email: Yup.string().email('Invalid email').required('Required'),
      });

    return(
        <>
        <h3>Crear Categoria</h3>
        <Formik initialValues={{
            nombre: ''
        }}
        validationSchema={RegisterToy}
        onSubmit={values =>{
            console.log(values);
        }}
        >
        {({ errors, touched }) => (
        <Form>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Field name="nombre" className="form-control"/>
                {errors.nombre && touched.nombre ? (
             <div>{errors.nombre}</div>
           ) : null}
            </div>
            <Button type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/category">Cancelar</Link>
        </Form>
        )}
        </Formik>
        </>
    )
}