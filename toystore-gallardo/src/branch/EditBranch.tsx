import FormBranches from "./FormBranch";

export default function EditBrand() {
  return (
    <>
      <h3>Editar Marca</h3>
      <FormBranches
        model={{ name: "" }}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 3000));
            console.log(values);
          }}
      />
    </>
  );
}
