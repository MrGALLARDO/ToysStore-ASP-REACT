
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
    
    {path:'/category/create', element : CreateCategory},
    {path:'/category/edit/:id', element :EditCategory},
    {path:'/category', element : IndexCategory},
    {path:'/', element: LandingPage},

    {path:'/brand/create', element : CreateBrand},
    {path:'/brand/edit/:id', element : EditBrand},
    {path:'/brand', element : IndexBrand},

    {path:'/branch/create', element : CreateBranch},
    {path:'/branch/edit/:id', element : EditBranch},
    {path:'/branch', element : IndexBranch},

    {path:'/toy/:id', element : DetailToy},

    {path:'/toy/create', element : CreateToy},
    {path:'/toy/edit/:id', element : EditToy},
    {path:'/toy/filter', element : FilterToy},
    {path:'*', element : RedirectLanding},
];

export default routes;