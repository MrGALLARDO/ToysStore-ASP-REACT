
import IndexUsers from './auth/indexUsers';
import Login from './auth/Login';
import Register from './auth/Register';
import CreateBranch from './branch/CreateBranch';
import EditBranch from './branch/EditBranch';
import IndexBranch from './branch/IndexBranch';
import CreateBrand from './brand/CreateBrand';
import EditBrand from './brand/EditBrand';
import IndexBrand from './brand/IndexBrand';
import CreateCategory from './categories/CreateCategory';
import EditCategory from './categories/EditCategory';
import IndexCategory from './categories/IndexCategory';
import LandingPage from './LandingPage';
import CreateToy from './ToyStore/CreateToy';
import DetailToy from './ToyStore/DetailToy';
import EditToy from './ToyStore/EditToy';
import FilterToy from './ToyStore/FilterToys';
import RedirectLanding from './utils/RedirectLanding';

// Configuramos ruteo.
const routes = [
    
    {path:'/category/create', element : CreateCategory, isAdmin: true},
    {path:'/category/edit/:id', element :EditCategory,isAdmin: true},
    {path:'/category', element : IndexCategory,isAdmin: true},

    {path:'/brand/create', element : CreateBrand,isAdmin: true},
    {path:'/brand/edit/:id', element : EditBrand,isAdmin: true},
    {path:'/brand', element : IndexBrand,isAdmin: true},

    {path:'/branch/create', element : CreateBranch,isAdmin: true},
    {path:'/branch/edit/:id', element : EditBranch,isAdmin: true},
    {path:'/branch', element : IndexBranch,isAdmin: true},

    {path:'/toy/:id', element : DetailToy},
    {path:'/toy/create', element : CreateToy,isAdmin: true},
    {path:'/toy/edit/:id', element : EditToy,isAdmin: true},
    {path:'/toy/filter', element : FilterToy},

    {path:'/register', element :  Register},
    {path:'/login', element : Login},
    {path:'/user', element : IndexUsers, isAdmin: true},

    {path:'/', element: LandingPage},
    {path:'*', element : RedirectLanding},
];

export default routes;