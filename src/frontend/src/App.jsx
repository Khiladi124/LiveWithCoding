// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Problem from "./pages/Problem.jsx";
import Admin from "./pages/Admin.jsx";


const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/logout",
      element: <Home />,
    },
    {
      path: "/:problemId",
      element: <Problem />,
    },
    {
      path: "/admin",
      element: <Admin />,
    }

  ]);
  return (
      <RouterProvider router={appRouter} />
  );
};

export default App;
