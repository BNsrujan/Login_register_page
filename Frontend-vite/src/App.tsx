import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./app/auth/login";
import { Register } from "./app/auth/register";
import Dashboard from "./app/Dashboard";
import NotFound from "./app/NotFound";
import MiddleWare from "./app/MiddleWare";

function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Register />
      },
      {
        path: "/",
        element: <MiddleWare />,
        children: [
          {
            path: "Dashboard",
            element: <Dashboard />
          },
          {
            path: "*",
            element: <NotFound />
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  )


  return (
    <div className=" ">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
