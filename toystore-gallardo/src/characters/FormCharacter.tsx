import { Form, Formik, FormikHelpers } from "formik";
import { characterCreationDTO } from "./characters.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import FormGroupDate from "../utils/FormGroupDate";

export default function FormCharacter(props: formCharacterProps) {
  const RegisterToy = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre del juguete debe de tener más de 2 caracteres")
      .max(50, "El nombre del juguete debe de tener menos de 50 caracteres")
      .required("El nombre del juguete es requerido")
      .firstCapitalLetter(),
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={RegisterToy}
      onSubmit={props.onSubmit}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre del Juguete Coleccionable"
            placeholder="Nombre del Juguete Coleccionable"
          />
          <FormGroupDate field="releaseYear" label="Fecha Lanzamiento" />
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

interface formCharacterProps {
  model: characterCreationDTO;
  onSubmit(
    values: characterCreationDTO,
    action: FormikHelpers<characterCreationDTO>
  ): void;
}
