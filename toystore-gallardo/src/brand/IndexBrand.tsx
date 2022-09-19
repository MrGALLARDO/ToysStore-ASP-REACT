import { brandDTO } from "../brand/brands.model";
import { urlBrands } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";

export default function IndexBrand() {
  return (
    <>

<IndexEntity<brandDTO>
    url={urlBrands} 
    urlCreate="/brand/create" 
    title="Marcas"
    nameEntity="marca"
    >
      {(brands, buttons)=>
      <>
    <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {brands?.map(brand => 
            <tr key={brand.id}>
              <td>
                {buttons(`/brand/edit/${brand.id}`, brand.id)}
              </td>
              <td>
                {brand.name}
              </td>
            </tr>)}
          </tbody>  
          </>
      }
          
          </IndexEntity>
    </>
  );
}