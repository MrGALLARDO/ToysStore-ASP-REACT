import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlToys } from "../utils/endpoints";
import { convertToyToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import FormToys from "./FormToy";
import { toyCreationDTO, toyPutGetDTO } from "./toys.models";

export default function EditToy() {
  const [toy, setToy] = useState<toyCreationDTO>();
  const [toyPutGet, setToyPutGet] = useState<toyPutGetDTO>();
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlToys}/PutGet/${id}`)
      .then((answer: AxiosResponse<toyPutGetDTO>) => {
        const model: toyCreationDTO = {
          name: answer.data.toy.name,
          inStock: answer.data.toy.inStock,
          review: answer.data.toy.review,
          imageLink: answer.data.toy.image,
          description: answer.data.toy.description,
          comingSoonDate: new Date(answer.data.toy.comingSoonDate),
          price: answer.data.toy.price,
        };
        setToy(model);
        setToyPutGet(answer.data);
      });
  }, [id]);

  async function edit(toyToEdit: toyCreationDTO) {
    try {
      const formData = convertToyToFormData(toyToEdit);
      await axios({
        method: "put",
        url: `${urlToys}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/toy/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Editar Película</h3>
      <ShowErrors errors={errors} />
      {toy && toyPutGet ? (
        <FormToys
          brandsSelected={toyPutGet.brands}
          branchesSelected={toyPutGet.branchesSelected}
          branchesNotSelected={toyPutGet.branchesNotSelected}
          categoriesNotSelected={toyPutGet.categoriesNotSelected}
          categoriesSelected={toyPutGet.categoriesSelected}
          model={toy}
          onSubmit={async (values) => await edit(values)}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
