import './App.css';
import Menu from './utils/Menu';
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import routes from './route-config';
import path from 'path';

function App() {

  return (
    <>
      <BrowserRouter>
        <Menu/>
        <div className="container">
          <Routes>
            {routes.map(({path, element: Component}) => (
              <Route path={path} element={<Component/>} />
            ))}

          </Routes>
      </div>
    </BrowserRouter>

    </>
  );
}

export default App;
