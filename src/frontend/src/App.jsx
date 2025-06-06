// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Problem from "./pages/Problem.jsx";
import Admin from "./pages/Admin.jsx";
import AddTestCase from "./pages/AddTestCase.jsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Landing/>,
    },
    {
      path: "/home",
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
      element: <Admin/>,
    },
    {
      path:"/addTestCase/:problemId",
      element:<AddTestCase/>
    },
    {
      path: "/about",
      element: <About />,
    },

  ]);
  return (
      <RouterProvider router={appRouter} />
  );
};

export default App;
