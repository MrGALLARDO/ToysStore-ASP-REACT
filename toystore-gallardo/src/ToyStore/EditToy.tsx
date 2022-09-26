import FormToys from "./FormToy";

export default function EditToy() {
  return (
    <>
      <h3>Editar Juguetes</h3>
      <FormToys
        brandsSelected={[]}
        model={{
          name: "test",
          inStock: true,
          description: "test",
          releaseDate: new Date("2019-01-01T00:00:00"),
          price:0,
          review : ''
          ,
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
