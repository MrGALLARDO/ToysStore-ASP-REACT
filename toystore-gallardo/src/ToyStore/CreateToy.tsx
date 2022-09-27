import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { branchDTO } from "../branch/branch.models";
import { CategoryDTO } from "../categories/category.model";
import { urlToys } from "../utils/endpoints";
import { convertToyToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import FormToys from "./FormToy";
import { toyCreationDTO, toyPostGetDTO } from "./toys.models";

export default function CreateToy() {
  const [categoriesNotSelected, setCategoriesNotSelected] = useState<
    CategoryDTO[]
  >([]);
  const [branchesNotSelected, setBranchesNotSelected] = useState<branchDTO[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlToys}/postget`)
      .then((answer: AxiosResponse<toyPostGetDTO>) => {
        setCategoriesNotSelected(answer.data.categories);
        setBranchesNotSelected(answer.data.branches);
        setLoaded(true);
      });
  }, []);

  async function create(toy: toyCreationDTO) {
    try {
      const formData = convertToyToFormData(toy);
      await axios({
        method: "post",
        url: urlToys,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((answer: AxiosResponse<number>) =>
        navigation(`/toy/${answer.data}`)
      );
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Crear Juguete</h3>
      <ShowErrors errors={errors} />
      {loaded ? (
        <FormToys
          brandsSelected={[]}
          branchesNotSelected={branchesNotSelected}
          branchesSelected={[]}
          categoriesNotSelected={categoriesNotSelected}
          categoriesSelected={[]}
          model={{
            name: "",
            inStock: false,
            description: "",
            price: 0,
            review: "",
          }}
          onSubmit={async (values) => create(values)}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
