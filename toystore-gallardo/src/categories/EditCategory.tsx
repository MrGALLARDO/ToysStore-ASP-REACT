//import { useParams } from "react-router-dom";
import FormCategory from "./FormCategory";

export default function EditCategory() {
  //const{id}: any = useParams();

  return (
    <>
      <h3>Editar Categoria</h3>
      <FormCategory
        model={{ name: ""}}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(values);
        }}
      />
    </>
  );
}
