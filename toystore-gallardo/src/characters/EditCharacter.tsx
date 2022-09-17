import FormCharacter from "./FormCharacter";

export default function EditCharacter() {
  return (
    <>
      <h3>Editar Personaje</h3>
      <FormCharacter
        model={{ name: "", releaseDate: undefined!, imageLink: '' }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
