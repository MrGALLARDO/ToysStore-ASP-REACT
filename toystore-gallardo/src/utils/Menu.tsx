import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContex from "../auth/AutenticacionContext";
import Autorizate from "../auth/Autorizate";
import { logout } from "../auth/manageJWT";
import Button from "./Buttons";

export default function Menu() {
  const { update, claims } = useContext(AuthContex);

  function obtainNameUser(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          React ToysStore
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : " inactive")
                }
                to="/toy/filter"
              >
                Filtrar Juguetes
              </NavLink>
            </li>
            <Autorizate
              role="admin"
              autorizate={
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : " inactive")
                      }
                      to="/category"
                    >
                      Categoria
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : " inactive")
                      }
                      to="/brand"
                    >
                      Marcas
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : " inactive")
                      }
                      to="/branch"
                    >
                      Sucursales
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : " inactive")
                      }
                      to="/toy/create"
                    >
                      Crear Juguete
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : " inactive")
                      }
                      to="/users"
                    >
                      Usuarios
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div className="d-flex">
            <Autorizate
              autorizate={
                <>
                  <span className="nav-link">Hola, {obtainNameUser()}</span>
                  <Button
                    onClick={() => {
                      logout();
                      update([]);
                    }}
                    className="nav-link btn btn-link"
                  >
                    Log out
                  </Button>
                </>
              }
              notAutorizate={
                <>
                  <Link to="/Register" className="nav-link btn btn-link">
                    Registro
                  </Link>
                  <Link to="/Login" className="nav-link btn btn-link">
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
