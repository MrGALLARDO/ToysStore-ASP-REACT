import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlBrands } from "../endpoints";
import { convertBrandToFormData } from "../utils/FormDataUtils";
import ShowErrors from "../utils/ShowErrors";
import { brandCreationDTO } from "./brands.model";
import FormBrand from "./FormBrand";

export default function CreateBrand() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(brand: brandCreationDTO) {
    try {
      const formData = convertBrandToFormData(brand);
      await axios({
        method: 'post',
        url: urlBrands,
        data: formData,
        headers:{'Content-Type': 'multipart/form-data'}
      });

      navigate("/brand");
    } catch (error) {
      setErrors(error.response.data);
    }
  }
  
  return (
    <>
      <h3>Crear Marca</h3>
      <ShowErrors errors={errors}/>
      <FormBrand
        model={{ name: "" }}
        onSubmit={async (values) => {
          await create(values);
        }}
      />
    </>
  );
}
