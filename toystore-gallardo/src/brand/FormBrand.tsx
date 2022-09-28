import { Form, Formik, FormikHelpers } from "formik";
import { brandCreationDTO } from "./brands.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import FormGroupsImage from "../utils/FormGroupImage";
import FormGroupMarkdown from '../utils/FormGroupMarkdown';

export default function FormBrand(props: formBrandProps) {
  const schemeBrand = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre de la marca debe de tener más de 2 caracteres.")
      .max(50, "El nombre de la marca debe de tener menos de 50 caracteres.")
      .required("El nombre de la marca es requerido.")
      .firstCapitalLetter()
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemeBrand}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre de la Marca"
            placeholder="Nombre de la marca"
          />
          <FormGroupsImage field="image" label="Imagen" imageLink={props.model.imageLink} />
          <FormGroupMarkdown field="biography" label="Biografía" />
          <Button
            disabled={isSubmitting}
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
