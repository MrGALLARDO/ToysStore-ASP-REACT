import FormBranch from "./FormBranch";

export default function EditBrand() {
  return (
    <>
      <h3>Editar Marca</h3>
      <FormBranch
        model={{
          name: "",
          latitude: 20.673467098990216,
          longitude: -103.36767228914579,
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
