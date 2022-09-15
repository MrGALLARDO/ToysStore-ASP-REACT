import { Formik, Form, Field } from "formik";
import { CategoryDTO } from "../categories/category.model";
import Button from "../utils/Buttons";

export default function FilterToy() {
  const valueInit: FilterToyForm = {
    name: "",
    idCategory: 0,
    coomingSoon: false,
    inStock: false,
  };

  const categories: CategoryDTO[] = [
    { id: 1, name: "Juegos de Mesa" },
    { id: 2, name: "Construcciones" },
    { id: 3, name: "Músicales" },
  ];

  return (
    <>
      <h3>Filtro Juguetes</h3>
      <Formik
        initialValues={valueInit}
        onSubmit={(values) => console.log(values)}
      >
        {({ submitForm, getFieldProps, setValues }) => (
          <Form>
            <div className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nombre del Juguete"
                  {...getFieldProps("name")}
                />
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <select
                  className="form-control"
                  {...getFieldProps("idCategory")}
                >
                  <option value="0">--Selecciona una Categoria--</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <Field
                  className="form-check-input"
                  id="coomingSoon"
                  name="coomingSoon"
                  type="checkbox"
                />
                <label className="form-check-label" htmlFor="coomingSoon">
                  Próximos Juguetes
                </label>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <Field
                  className="form-check-input"
                  id="inStock"
                  name="inStock"
                  type="checkbox"
                />
                <label className="form-check-label" htmlFor="inStock">
                  Juguetes en Stock
                </label>
              </div>

              <Button
                className="btn btn-primary mb-2 mx-sm-3"
                onClick={() => submitForm()}
              >
                Filtrar
              </Button>
              <Button
                className="btn btn-danger mb-2"
                onClick={() => setValues(valueInit)}
              >
                Limpiar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface FilterToyForm {
  name: string;
  idCategory: number;
  coomingSoon: boolean;
  inStock: boolean;
}
