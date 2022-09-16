import FormBranch from "./FormBranch";


export default function CreateBranch() {
  return (
    <>
      <h3>Crear Marca</h3>
      <FormBranch
        model={{ name: "" }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
