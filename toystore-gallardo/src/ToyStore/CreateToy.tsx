import FormToys from "./FormToy";

export default function CreateToy() {
  return (
    <>
      <h3>Crear Juguete</h3>
      <FormToys
        model={{name: '', atSucursal: false, description: ''}}
        onSubmit={values => console.log(values)}
      />
    </>
  );
}
