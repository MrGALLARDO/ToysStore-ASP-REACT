import { urlBranches } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { branchDTO } from "./branch.models";

export default function IndexBranch() {
  return (
    <>
      <IndexEntity<branchDTO>
        url={urlBranches}
        urlCreate="/branch/create"
        title="Sucursales"
        nameEntity="Sucursal"
      >
        {(branches, buttons) =>
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {branches?.map(branch =>
                <tr key={branch.id}>
                  <td>
                    {buttons(`/branch/edit/${branch.id}`, branch.id)}
                  </td>
                  <td>
                    {branch.name}
                  </td>
                </tr>)}
            </tbody>
          </>
        }

      </IndexEntity>
    </>
  );
}
