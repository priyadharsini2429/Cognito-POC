import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ConfirmUser from "./ConfirmUser";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/confirm",
      element: <ConfirmUser />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
