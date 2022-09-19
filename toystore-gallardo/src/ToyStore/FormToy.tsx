import { Form, Formik, FormikHelpers } from "formik";
import { toyCreationDTO } from "./toys.models";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupDate from "../utils/FormGroupDate";
import FormGroupImage from "../utils/FormGroupImage";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import { CategoryDTO } from "../categories/category.model";
import { useState } from "react";
import SelectorMultiple, {
  selectorMultipleModel,
} from "../utils/SelectorMultiple";
import { branchDTO } from "../branch/branch.models";
import TypeAheadBrand from "../brand/TypeAheadBrand";
import { brandToyDTO } from "../brand/brands.model";

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

  const [categoriesSelected, setCategoriesSelected] = useState(
    mapped(props.categoriesSelected)
  );
  const [categoriesNotSelected, setCategoriesNotSelected] = useState(
    mapped(props.categoriesNotSelected)
  );

  const [branchesSelected, setBranchesSelected] = useState(
    mapped(props.branchesSelected)
  );
  const [branchesNotSelected, setBranchesNotSelected] = useState(
    mapped(props.branchesNotSelected)
  );

  const [brandsSelected, setBrandsSelected] = useState<
    brandToyDTO[]
  >(props.brandsSelected);

  function mapped(
    array: { id: number; name: string }[]
  ): selectorMultipleModel[] {
    return array.map((value) => {
      return { key: value.id, value: value.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.categoriesIds = categoriesSelected.map((value) => value.key);
        values.branchesIds = branchesSelected.map((value) => value.key);
        values.brands = brandsSelected;
        props.onSubmit(values, actions);
      }}
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
          <FormGroupImage
            field="image"
            label="Imagen"
            imageLink={props.model.imageLink}
          />

          <div className="form-group">
            <label>Categoria:</label>
            <SelectorMultiple
              selected={categoriesSelected}
              notSelected={categoriesNotSelected}
              onChange={(selected, notSelected) => {
                setCategoriesSelected(selected);
                setCategoriesNotSelected(notSelected);
              }}
            />
          </div>

          <div className="form-group">
            <label>Sucursales:</label>
            <SelectorMultiple
              selected={branchesSelected}
              notSelected={branchesNotSelected}
              onChange={(selected, notSelected) => {
                setBranchesSelected(selected);
                setBranchesNotSelected(notSelected);
              }}
            />
          </div>

          <div className="form-group">
            <TypeAheadBrand
              onAdd={(brands) => {
                setBrandsSelected(brands);
              }}
              onRemove={(brand) => {
                const brands = brandsSelected.filter(
                  (x) => x !== brand
                );
                setBrandsSelected(brands);
              }}
              brands={brandsSelected}
              listUI={(brand: brandToyDTO) => (
                <>
                  {brand.name} /{" "}
                  <input
                    placeholder="Detalles"
                    type="text"
                    value={brand.website}
                    onChange={(e) => {
                      const index = brandsSelected.findIndex(
                        (x) => x.id === brand.id
                      );

                      const brands = [...brandsSelected];
                      brands[index].website = e.currentTarget.value;
                      setBrandsSelected(brands);
                    }}
                  />
                </>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
          >
            Guardar
          </Button>
          <Link className="btn btn-secondary" to="/">
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
  categoriesSelected: CategoryDTO[];
  categoriesNotSelected: CategoryDTO[];
  branchesSelected: branchDTO[];
  branchesNotSelected: branchDTO[];
  brandsSelected: brandToyDTO[];
}
