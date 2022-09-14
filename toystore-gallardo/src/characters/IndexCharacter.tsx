import { Link } from "react-router-dom";

export default function IndexCharacter() {
  return (
    <>
      <h3>Index Category</h3>
      <Link to="character/create">Crear Personaje</Link>
    </>
  );
}
