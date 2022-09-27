import { urlBrands } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertBrandToFormData } from "../utils/FormDataUtils";
import { brandCreationDTO, brandDTO } from "./brands.model";
import FormBrand from "./FormBrand";

export default function EditBrand() {
  
  const transform = (brand : brandDTO) =>{
    return {
      name: brand.name,
      imageLink: brand.image,
      biography: brand.biography,
      comingSoonDate: brand.comingSoonDate
    }
  }
  
  return (
    <>
      <EditEntity< brandCreationDTO, brandDTO>
        url={urlBrands}
        urlIndex="/brand"
        nameEntity="Marcas"
        transformFormData={convertBrandToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <FormBrand
            model={entity}
            onSubmit={async values => await edit(values)}
          />
        )}
      </EditEntity>
    </>
  );
}
