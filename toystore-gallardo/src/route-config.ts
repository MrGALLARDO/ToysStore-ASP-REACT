import IndexCategory from "./category/indexCategory";
import LandingPage from './LandingPage';

const routes = [
    {path:'/category', element: IndexCategory},
    {path:'/', element: LandingPage}
];

export default routes;