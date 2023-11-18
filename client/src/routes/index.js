import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Shop from "../pages/Shop";

export const PAGES_ROUTES = {
  home: "/",
  productDetails: "/product",
  shop: "/shop",
};

const routes = [
  { path: PAGES_ROUTES.home, Component: Home },
  { path: `${PAGES_ROUTES.productDetails}/:id`, Component: ProductDetail },
  { path: PAGES_ROUTES.shop, Component: Shop },
];

export default routes;
