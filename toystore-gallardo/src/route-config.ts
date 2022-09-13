import CreateBrand from './brands/CreateBrand';
import EditBrand from './brands/EditBrands';
import IndexBrand from './brands/IndexBrand';
import CreateCategory from './categories/CreateCategory';
import EditCategory from './categories/EditCategory';
import IndexCategory from './categories/IndexCategory';
import CreateCharacter from './characters/CreateCharacter';
import EditCharacter from './characters/EditCharacter';
import IndexCharacter from './characters/IndexCharacter';
import LandingPage from './LandingPage';
import CreateToy from './ToyStore/CreateToy';
import EditToy from './ToyStore/EditToy';
import FilterToy from './ToyStore/FilterToys';

// Configuramos ruteo.
const routes = [
    
    {path:'/category/create', element: CreateCategory},
    {path:'/category/edit', element:EditCategory},
    {path:'/category', element: IndexCategory},
    {path:'/', element: LandingPage},

    {path:'/character/create', element: CreateCharacter},
    {path:'/character/edit', element:EditCharacter},
    {path:'/character', element: IndexCharacter},

    {path:'/brand/create', element: CreateBrand},
    {path:'/brand/edit', element:EditBrand},
    {path:'/brand', element: IndexBrand},

    {path:'/toy/create', element: CreateToy},
    {path:'/toy/edit', element:EditToy},
    {path:'/toy/filter', element: FilterToy},
];


export default routes;