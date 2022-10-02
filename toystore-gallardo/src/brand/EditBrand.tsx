import { urlBrands } from "../utils/endpoints";
import EditEntity from "../utils/EditEntity";
import { convertBrandToFormData } from "../utils/FormDataUtils";
import { brandCreationDTO, brandDTO } from "./brands.model";
import FormBrand from "./FormBrand";

export default function EditBrand() {
  const transform = (brand: brandDTO) => {
    return {
      name: brand.name,
      imageLink: brand.image,
      biography: brand.biography,
    };
  };

  return (
    <>
      <EditEntity<brandCreationDTO, brandDTO>
        url={urlBrands}
        urlIndex="/brand"
        nameEntity="Marca"
        transformFormData={convertBrandToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <FormBrand model={entity} onSubmit={async (values) => edit(values)} />
        )}
      </EditEntity>
    </>
  );
}
