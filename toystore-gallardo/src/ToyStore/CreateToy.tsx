import { CategoryDTO } from "../categories/category.model";
import FormToys from "./FormToy";

export default function CreateToy() {
  const categories: CategoryDTO[]= [{id: 1, name:'Juegos de Mesa'},{id: 2, name:'Juegos de destreza'}]
  return (
    <>
      <h3>Crear Juguete</h3>
      <FormToys
      categoriesSelected={[]} 
      categoriesNotSelected={categories}
        model={{ name: '', atSucursal: false, description: '' }}
        onSubmit={values => console.log(values)}/>
    </>
  );
}
