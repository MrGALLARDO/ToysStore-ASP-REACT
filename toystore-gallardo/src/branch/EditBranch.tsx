import { urlBranch } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { branchCreationDTO, branchDTO } from "./branch.models";
import FormBranch from "./FormBranch";

export default function EditBranch() {
  return (
      <EditEntity<branchCreationDTO, branchDTO>
        url={urlBranch}
        urlIndex="/branch"
        nameEntity="Sucursales"
      >
        {(entity, edit) => (
          <FormBranch
            model={entity}
            onSubmit={async (values) => {
              await edit(values);
            }}
          />
        )}
      </EditEntity>
  );
}
