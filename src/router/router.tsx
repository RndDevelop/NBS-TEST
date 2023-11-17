import { createBrowserRouter } from "react-router-dom";
import LayOut from "../components/Layout/layout";
import Home from "../components/home/home";
import Profile from "../components/user/profile";
import Login from "../components/login/sign/login";
import CreateAccount from "../components/createAccount/createAccount";
import ProtectedRoute from "../components/login/protect-router/protect-router";
import DataGrid from "../components/data-grid/dataGrid";
import Chart from "../components/data-grid/chart";
import CreateAccountUseForm from "../components/createAccount/createAccount-useForm";
import CreateAccountReactQuery from "../components/createAccount/createAccount-reactQuery";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayOut />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/datagrid",
        element: <DataGrid />,
      },
      {
        path: "/chart",
        element: <Chart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/create-account",
  //   element: <CreateAccountUseForm />,
  // },
  {
    path: "/create-account",
    element: <CreateAccountReactQuery />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
