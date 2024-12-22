import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./app/auth/login";
import { Register } from "./app/auth/register";
import Dashboard from "./app/Dashboard";
// import MiddleWare from "./app/MiddleWare";

function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/Dashboard",
        element: <Dashboard />
      },
      {
        path: '/signup',
        element: <Register />
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
