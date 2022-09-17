import { Form, Formik, FormikHelpers } from "formik";
import { toyCreationDTO } from "./toys.models";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupDate from "../utils/FormGroupDate";
import FormGroupImage from "../utils/FormGroupImage";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";

export default function FormToys(props: FormToyProps) {
    const schemaToys = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre de la marca debe de tener más de 2 caracteres")
            .max(50, "El nombre de la marca debe de tener menos de 50 caracteres")
            .required("El nombre de la marca es requerido")
            .firstCapitalLetter(),
        description: Yup.string()
            .min(3, "El nombre de la marca debe de tener más de 2 caracteres")
            .max(50, "El nombre de la marca debe de tener menos de 50 caracteres")
            .required("El nombre de la marca es requerido")
            .firstCapitalLetter(),
    });

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={schemaToys}
        >
            {({ errors, isSubmitting }) => (
                <Form>
                    <FormGroupText
                        field="name"
                        label="Nombre Juguete"
                        placeholder="Nombre Juguete"
                    />

                    <FormGroupCheckbox label="En sucursal" field="atSucursal" />
                    <FormGroupText label="Descripción" field={"description"} />
                    <FormGroupDate label="Fecha Lanzamiento" field="releaseDate" />
                    <FormGroupImage field="image" label="Imagen" imageLink={props.model.imageLink}/>
                    <Button
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        type="submit"
                    >
                        Guardar
                    </Button>
                    <Link className="btn btn-secondary" to="/category">
                        Cancelar
                    </Link>
                </Form>
            )}
        </Formik>
    );
}

interface FormToyProps {
    model: toyCreationDTO;
    onSubmit(
        values: toyCreationDTO,
        actions: FormikHelpers<toyCreationDTO>
    ): void;
}
