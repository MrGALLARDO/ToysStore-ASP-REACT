import { Link } from "react-router-dom";

export default function IndexBranch() {
  return (
    <>
      <h3>Marcas</h3>
      <Link to="/branch/create">Crear Marca</Link>
    </>
  );
}
