import FormCharacter from "./FormCharacter";

export default function CreateCharacter() {
  return (
    <>
      <h3>Crear Personajes</h3>
      <FormCharacter
        model={{ name: "", releaseDate: undefined!, description: "" }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 3000));
          console.log(values);
        }}
      />
    </>
  );
}
