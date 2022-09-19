import { NavLink } from "react-router-dom";

export default function Menu() {
  // const activeClass = "active";

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/"
        >
          React ToysStore
        </NavLink>
        <div className="collapse navbar-collapse">
          <u className="navbar-nav me-auto mb-2 mb-lg-0">
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
                to="/toy/filter"
              >
                Filtrar Juguetes
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
          </u>
        </div>
      </div>
    </nav>
  );
}
