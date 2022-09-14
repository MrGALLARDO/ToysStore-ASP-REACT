
import { useNavigate, Link } from "react-router-dom";
import Button from "../utils/Buttons";
import { Form,Formik} from "formik";
import * as Yup from 'yup';
import FormGroupText from "../utils/FormGroupText";

export default function CreateCategory(){
    const navigate = useNavigate();
    const RegisterToy = Yup.object().shape({
        name: Yup.string()
          .min(3, 'El nombre del producto debe de tener más de 2 caracteres')
          .max(50, 'El nombre del producto debe de tener menos de 50 caracteres')
          .required('El nombre del producto es requerido')
          .firstCapitalLetter(),
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
            name: ''
        }}
        validationSchema={RegisterToy}
        onSubmit={async values =>{
            await new Promise(r => setTimeout(r,3000));
            console.log(values);
        }}
        >

       {({ errors, isSubmitting}) => (

        <Form>
            <FormGroupText field='name' label="Nombre Juguete" placeHolder="Nombre Juguete"/>
            <Button disabled={isSubmitting ||Object.keys(errors).length > 0} type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/category">Cancelar</Link>
        </Form>
        )}

        </Formik>
        </>
    )
}