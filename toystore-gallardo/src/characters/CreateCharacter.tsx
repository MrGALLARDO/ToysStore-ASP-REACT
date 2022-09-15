import FormCharacter from "./FormCharacter";

export default function CreateCharacter() {
  return (
    <>
      <h3>Crear Personajes</h3>
      <FormCharacter
        model={{ name: "", releaseYear: undefined! }}
        onSubmit={(values) => console.log(values)}
      />
    </>
  );
}
