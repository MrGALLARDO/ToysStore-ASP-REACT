import FormBranch from "./FormBranch";

export default function EditBranch() {
  return (
    <>
      <h3>Editar Marca</h3>
      <FormBranch
        model={{
          name: "",
          latitude: 20.673467098990216,
          longitude: -103.36767228914579,
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(values);
        }}
      />
    </>
  );
}
