import { Form, Formik, FormikHelpers } from "formik";
import { branchCreationDTO } from "./branch.models";
import * as Yup from "yup";
import Button from "../utils/Buttons";
import FormGroupText from "../utils/FormGroupText";
import { Link } from "react-router-dom";
import MapLeaflet from "../utils/Map";

export default function FormBranches(props: formBranchProps) {
  const schemaBranches = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre de la marca debe de tener más de 2 caracteres")
      .max(50, "El nombre de la marca debe de tener menos de 50 caracteres")
      .required("El nombre de la marca es requerido")
      .firstCapitalLetter()
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemaBranches}
      onSubmit={props.onSubmit}
    >
      {({ errors, isSubmitting }) => {
        return (
          <Form>
            <FormGroupText label="Nombre" field="name" />
            <div style={{marginBottom: '1rem'}}>
                <MapLeaflet/>
            </div>

            <Button disabled={isSubmitting || Object.keys(errors).length > 0} type="submit">Guardar</Button>
            <Link className="btn btn-secondary" to="/brand">
              Cancelar
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
}

interface formBranchProps {
  model: branchCreationDTO;
  onSubmit(
    values: branchCreationDTO,
    actions: FormikHelpers<branchCreationDTO>
  ): void;
}
