import FormBranch from "./FormBranch";

export default function CreateBranch() {
  return (
    <>
      <h3>Crear Sucursal</h3>
      <FormBranch
        model={{
          name: "",
          latitude: 0,
          longitude: 0,
        }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
