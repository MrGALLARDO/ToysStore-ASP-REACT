import axios, { AxiosResponse } from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryDTO } from "../categories/category.model";
import { urlCategories, urlToys } from "../utils/endpoints";
import Button from "../utils/Buttons";
import Pagination from "../utils/Pagination";
import ListToys from "./ListToys";
import { toyDTO } from "./toys.models";

export default function FilterToy() {
  const valueInit: FilterToyForm = {
    name: "",
    categoryId: 0,
    comingSoonToys: false,
    inStock: false,
    page: 1,
    recordsPerPage: 1,
  };

  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [toys, setToys] = useState<toyDTO[]>([]);
  const [totalPages, setRecordsPerPages] = useState(0);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    axios
      .get(`${urlCategories}/all`)
      .then((answer: AxiosResponse<CategoryDTO[]>) => {
        setCategories(answer.data);
      });
  }, []);

  useEffect(() => {
    if (query.get("name")) {
      valueInit.name = query.get("name")!;
    }

    if (query.get("categoryId")) {
      valueInit.categoryId = parseInt(query.get("categoryId")!, 10);
    }

    if (query.get("comingSoonToys")) {
      valueInit.comingSoonToys = true;
    }

    if (query.get("inStock")) {
      valueInit.inStock = true;
    }

    if (query.get("page")) {
      valueInit.page = parseInt(query.get("page")!, 10);
    }

    findToys(valueInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function findToys(values: FilterToyForm) {
    modifyURL(values);
    axios
      .get(`${urlToys}/filter`, { params: values })
      .then((answer: AxiosResponse<toyDTO[]>) => {
        const totalRegisters = parseInt(
          answer.headers["quantityTotalRegisters"],
          10
        );
        setRecordsPerPages(
          Math.ceil(totalRegisters / valueInit.recordsPerPage)
        );

        setToys(answer.data);
      });
  }

  function modifyURL(values: FilterToyForm) {
    const queryStrings: string[] = [];
    if (values.name) {
      queryStrings.push(`name=${values.name}`);
    }

    if (values.categoryId !== 0) {
      queryStrings.push(`categoryId=${values.categoryId}`);
    }

    if (values.comingSoonToys) {
      queryStrings.push(`coomingSoonToys=${values.comingSoonToys}`);
    }

    if (values.inStock) {
      queryStrings.push(`inStock=${values.inStock}`);
    }

    queryStrings.push(`page=${values.page}`);

    navigate(`/toy/filter?${queryStrings.join("&")}`);
  }

  return (
    <>
      <h3>Filtro Juguetes</h3>
      <Formik initialValues={valueInit} 
      onSubmit={values => {
        values.page = 1;
        findToys(values)
      }}
      >
        {({ submitForm, getFieldProps, setValues, values }) => (
          <>
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
                    {...getFieldProps("categoryId")}
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
                    id="comingSoonToys"
                    name="comingSoonToys"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="comingSoonToys">
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
                  onClick={() => {
                    setValues(valueInit);
                    findToys(valueInit);
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </Form>

            <ListToys toys={toys} />
            <Pagination
              quantityTotalPages={totalPages}
              currentPage={values.page}
              onChange={(newPage) => {
                values.page = newPage;
                findToys(values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface FilterToyForm {
  name: string;
  categoryId: number;
  comingSoonToys: boolean;
  inStock: boolean;
  page: number;
  recordsPerPage: number;
}
