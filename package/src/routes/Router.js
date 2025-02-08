import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const GPSlocation = lazy(() => import("../views/GPSlocation.js"));
const ChatBot = lazy(() => import("../views/Chatbot.js"));
const Signin = lazy(() => import("../views/Signin.js"));
const Signup = lazy(() => import("../views/Signup.js"));

const ThemeRoutes = [
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <PrivateRoute element={<FullLayout />} />, // Protect FullLayout
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", exact: true, element: <Starter /> },
      { path: "/Smartpill", exact: true, element: <About /> },
      { path: "/chatbot", exact: true, element: <ChatBot /> },
      { path: "/gps-location", exact: true, element: <GPSlocation /> },
    ],
  },
];

export default ThemeRoutes;
