import FormBrand from "./FormBrand";

export default function EditBrand() {
  return (
    <>
      <h3>Editar Personaje</h3>
      <FormBrand
        model={{ name: "", releaseDate: undefined!, imageLink: '' }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(values);
        }}
      />
    </>
  );
}
