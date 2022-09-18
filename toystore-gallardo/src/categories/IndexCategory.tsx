import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlCategories } from "../endpoints";
import Button from "../utils/Buttons";
import GenericList from "../utils/GenericList";
import Pagination from "../utils/Pagination";
import { CategoryDTO } from "./category.model";

export default function IndexCategory() {
  
  const [categories , setCategories] = useState<CategoryDTO[]>();
  const [totalPages, setTotalPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    axios.get(urlCategories,{
      params: {page, recordsPerPage}
      })
    .then((answer: AxiosResponse<CategoryDTO[]>) =>{
      const totalRegisters  = parseInt(answer.headers["quantitytotalregisters"], 10);
      setTotalPages(Math.ceil(totalRegisters/recordsPerPage));
      console.log(answer.data);
    setCategories(answer.data);
    })
  },[page ,recordsPerPage])

  return (
    <>
      <h3>Categoria</h3>
      <Link className="btn btn-primary" to="/category/create">Crear Categoria</Link>

      <div className="form-group" style={{width:'150px'}}>
        <label>Registros por página:</label>
        <select 
        className="form-select"
        defaultValue={10}
        onChange= {e => {
          setPage(1);
          setRecordsPerPage(parseInt(e.currentTarget.value,10));
        }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

      </div>
      <Pagination quantityTotalPages={totalPages}
      currentPage={page}
      onChange={newPage => setPage(newPage)}
      />
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
