import { branchDTO } from "../branch/branch.models";
import { CategoryDTO } from "../categories/category.model";
import FormToys from "./FormToy";

export default function CreateToy() {
  const categories: CategoryDTO[] = [
    { id: 1, name: "Juegos de Mesa" },
    { id: 2, name: "Juegos de destreza" },
  ];

  const sucursales: branchDTO[] = [
    { id: 1, name: "Guadalajara" },
    { id: 2, name: "Zapopan" },
  ];
  return (
    <>
      <h3>Crear Juguete</h3>
      <FormToys
        charactersSelected={[]}
        categoriesSelected={[]}
        categoriesNotSelected={categories}
        model={{ name: "", atSucursal: false, description: "" }}
        onSubmit={(values) => console.log(values)}
        branchesSelected={[]}
        branchesNotSelected={sucursales}
      />
    </>
  );
}
