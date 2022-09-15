import "./App.css";
import Menu from "./utils/Menu";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./route-config";
import ConfigureValidations from "./validations";

ConfigureValidations();

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="container">
          <Routes>
            {routes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
