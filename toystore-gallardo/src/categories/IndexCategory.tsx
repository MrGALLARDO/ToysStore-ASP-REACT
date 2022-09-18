import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { urlCategories } from "../endpoints";
import { CategoryDTO } from "./category.model";

export default function IndexCategory() {
  
  useEffect(()=>{
    axios.get(urlCategories)
    .then((answer: AxiosResponse<CategoryDTO[]>) =>{
      console.log(answer.data);
    })
  },[])

  return (
    <>
      <h3>Categoria</h3>
      <Link className="btn btn-primary" to="/category/create">Crear Categoria</Link>
    </>
  );
}
