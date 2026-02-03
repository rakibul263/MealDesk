import { createBrowserRouter } from "react-router";
import RouterLayouts from "../layouts/RouterLayouts";
import Home from "../pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AddFoodPage from "../components/AddFoodPage";
import Profile from "../components/Profile";

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
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "addFood",
        Component: AddFoodPage,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
export default router;
