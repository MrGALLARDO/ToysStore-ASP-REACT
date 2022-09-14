import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Buttons";
import FormGroupText from "../utils/FormGroupText";
import * as Yup from 'yup';
import { GenerateCreationDTO } from "./GenerateCreationDTO";



export default function FormCategory(props : formCategoryProps){
    const RegisterToy = Yup.object().shape({
        name: Yup.string()
          .min(3, 'El nombre del juguete debe de tener más de 2 caracteres')
          .max(50, 'El nombre del juguete debe de tener menos de 50 caracteres')
          .required('El nombre del juguete es requerido')
          .firstCapitalLetter(),
        description: Yup.string()
          .min(3, 'El nombre del juguete debe de tener más de 2 caracteres')
          .max(50, 'El nombre del juguete debe de tener menos de 50 caracteres')
          .required('El nombre del juguete es requerido')
          .firstCapitalLetter(),
        // lastName: Yup.string()
        //   .min(2, 'Too Short!')
        //   .max(50, 'Too Long!')
        //   .required('Required'),
        // email: Yup.string().email('Invalid email').required('Required'),
      });
    
    return (

        <Formik initialValues={props.model}
        validationSchema={RegisterToy}
        onSubmit={props.onSubmit}
        >
        
        {({ errors, isSubmitting}) => (
        
        <Form>
            <FormGroupText field='name' label="Nombre Juguete" placeHolder="Nombre Juguete"/>
            <FormGroupText field='description' label="Descripción del Juguete" placeHolder="Descripción del Juguete"/>
            <Button disabled={isSubmitting ||Object.keys(errors).length > 0} type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/category">Cancelar</Link>
        </Form>
        )}
        
        </Formik>
    )
}

interface formCategoryProps{
    model: GenerateCreationDTO;
    onSubmit(values: GenerateCreationDTO,action : FormikHelpers<GenerateCreationDTO>):void;
}