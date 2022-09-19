import FormBrand from "./FormBrand";

export default function CreateBrand() {
  return (
    <>
      <h3>Crear Personajes</h3>
      <FormBrand
        model={{ name: "", releaseDate: undefined!, description: "" }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(values);
        }}
      />
    </>
  );
}
