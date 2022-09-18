import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlCategories } from "../endpoints";
import Button from "../utils/Buttons";
import GenericList from "../utils/GenericList";
import { CategoryDTO } from "./category.model";

export default function IndexCategory() {
  
  const [categories , setCategories] = useState<CategoryDTO[]>();

  useEffect(()=>{
    axios.get(urlCategories)
    .then((answer: AxiosResponse<CategoryDTO[]>) =>{
    console.log(answer.data);
    setCategories(answer.data);
    })
  },[])

  return (
    <>
      <h3>Categoria</h3>
      <Link className="btn btn-primary" to="/category/create">Crear Categoria</Link>
      <GenericList list={categories}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map(category => <tr key={category.id}>
              <td>
                <Link className="btn btn-success" to={`/category/${category.id}`}>
                  Editar
                </Link>
                <Button className="btn btn-danger">Borrar</Button>
              </td>
              <td>
                {category.name}
              </td>
            </tr> )}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}
