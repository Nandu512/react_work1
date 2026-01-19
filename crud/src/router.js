import { createBrowserRouter } from "react-router-dom";
import ListProducts from "./components/ListProducts";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListProducts />,
  },
  {
    path: "/create",
    element: <CreateProduct />,
  },
  {
    path: "/edit/:id",
    element: <EditProduct />,
  },
]);

export default router;
