import { createBrowserRouter } from "react-router";
import RouterLayouts from "../layouts/RouterLayouts";
import Home from "../pages/Home";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RouterLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
export default router;
