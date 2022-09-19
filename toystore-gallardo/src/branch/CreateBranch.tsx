import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlBranches } from "../endpoints";
import ShowErrors from "../utils/ShowErrors";
import { branchCreationDTO } from "./branch.models";
import FormBranch from "./FormBranch";

export default function CreateBranch() {
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  async function create(branch: branchCreationDTO) {
    try{
      await axios.post(urlBranches, branch)
      navigate('/branch')
    }
    catch(error){
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <h3>Crear Sucursal</h3>

      <ShowErrors errors={errors}/>
      <FormBranch
        model={{
          name: "",
          latitude: 0,
          longitude: 0,
        }}
        onSubmit={async values => await create(values)}
      />
    </>
  );
}
