import { createBrowserRouter } from "react-router";
import RouterLayouts from "../layouts/RouterLayouts";
import Home from "../pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AddFoodPage from "../components/AddFoodPage";
import Profile from "../components/Profile";
import Error from "../components/Error";
import AllFood from "../components/AllFood";
import FoodDetails from "../components/FoodDetails";
import axios from "axios";
import Gallery from "../components/Gallery";
import MyFood from "../components/MyFood";
import UpdateFood from "../components/UpdateFood";
import PurchasePage from "../components/PurchasePage";

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
      {
        path: "foods",
        Component: AllFood,
      },
      {
        path: "myFoods/:email",
        loader: async ({ params }) => {
          const res = await axios(
            `${import.meta.env.VITE_API_URL}/myFoods/${params.email}`,
          );
          return res.data;
        },
        Component: MyFood,
      },
      {
        path: "foods/:id",
        loader: async ({ params }) => {
          const res = await axios(
            `${import.meta.env.VITE_API_URL}/foods/${params.id}`,
          );
          return res.data;
        },
        Component: FoodDetails,
      },
      {
        path: "update-food/:id",
        loader: async ({ params }) => {
          const res = await axios(
            `${import.meta.env.VITE_API_URL}/update-food/${params.id}`,
          );
          return res.data;
        },
        Component: UpdateFood,
      },
      {
        path: "purchase/:id",
        loader: async ({ params }) => {
          const res = await axios(
            `${import.meta.env.VITE_API_URL}/purchase/${params.id}`,
          );
          return res.data;
        },
        Component: PurchasePage,
      },
      {
        path: "gallery",
        Component: Gallery,
      },
      {
        path: "/*",
        Component: Error,
      },
    ],
  },
]);
export default router;
