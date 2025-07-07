import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout.jsx"; // <<-- NEW
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Problem from "./pages/Problem.jsx";
import Admin from "./pages/Admin.jsx";
import AddTestCase from "./pages/AddTestCase.jsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ConfirmResetPassword from "./pages/ConfirmResetPassword.jsx";
import LinkedinBot from "./pages/LinkedinBot.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // <<< Wraps all pages
    children: [
      { index: true, element: <Landing /> },
      { path: "linkedinBot", element: <LinkedinBot /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "resetPassword/:activationToken", element: <ConfirmResetPassword /> },
      { path: "verifyEmail/:activationToken", element: <VerifyEmail /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "logout", element: <Home /> },
      { path: "admin", element: <Admin /> },
      { path: "addTestCase/:problemId", element: <AddTestCase /> },
      { path: "about", element: <About /> },

      // ⚠️ This must go last
      { path: ":problemId", element: <Problem /> },
    ],
  },
]);

const App = () => <RouterProvider router={appRouter} />;

export default App;
