import { Form, Formik, FormikHelpers } from "formik";
import { brandCreationDTO } from "./brands.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import FormGroupDate from "../utils/FormGroupDate";
import FormGroupsImage from "../utils/FormGroupImage";
import FormGroupMarkdown from '../utils/FormGroupMarkdown';

export default function FormBrand(props: formBrandProps) {
  const schemeBrand = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre de la marca debe de tener más de 2 caracteres.")
      .max(50, "El nombre de la marca debe de tener menos de 50 caracteres.")
      .required("El nombre de la marca es requerido.")
      .firstCapitalLetter(),
      comingSoonDate: Yup.date()
      .required('La fecha de lanzamiento de la marca es requerida.')
      .max(new Date().toString(), 'La fecha de lanzamiento no debe ser mayor al día de hoy.')
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemeBrand}
      onSubmit={props.onSubmit}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre de la Marca"
            placeholder="Nombre de la marca"
          />
          <FormGroupDate field="comingSoonDate" label="Fecha Lanzamiento" />
          <FormGroupsImage field="image" label="Imagen" imageLink={props.model.imageLink} />
          <FormGroupMarkdown field="biography" label="Biografía" />
          <Button
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
          >
            Guardar
          </Button>
          <Link className="btn btn-secondary" to="/brand">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formBrandProps {
  model: brandCreationDTO;
  onSubmit(
    values: brandCreationDTO,
    action: FormikHelpers<brandCreationDTO>
  ): void;
}
