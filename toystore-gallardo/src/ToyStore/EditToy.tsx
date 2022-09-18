import FormToys from "./FormToy";

export default function EditToy() {
  return (
    <>
      <h3>Editar Juguetes</h3>
      <FormToys
        charactersSelected={[]}
        model={{
          name: "test",
          atSucursal: true,
          description: "test",
          releaseDate: new Date("2019-01-01T00:00:00"),
        }}
        onSubmit={(valores) => console.log(valores)}
        categoriesSelected={[]}
        categoriesNotSelected={[]}
        branchesSelected={[]}
        branchesNotSelected={[]}
      />
    </>
  );
}
