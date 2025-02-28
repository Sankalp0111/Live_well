import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js"; 

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const GPSlocation = lazy(() => import("../views/GPSlocation.js"));
const ChatBot = lazy(() => import("../views/Chatbot.js"));
const Signin = lazy(() => import("../views/Signin.js"));
const Signup = lazy(() => import("../views/Signup.js"));
const Profile = lazy(() => import("../views/Profile.js"));
const Alerts = lazy(() => import("../views/Alert.js"));
const SymptomChecker = lazy(()=> import("../views/Symptom.js"));

const ThemeRoutes = [
  { path: "/signin", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <PrivateRoute element={<FullLayout />} />, // Protect FullLayout
    children: [
      { path: "/", element: <Navigate to="/signin" replace /> },
      { path: "/dashboard", exact: true, element: <Starter /> },
      { path: "/Smartpill", exact: true, element: <About /> },
      { path: "/symptom", exact: true, element: <SymptomChecker /> },
      { path: "/chatbot", exact: true, element: <ChatBot /> },
      { path: "/gps-location", exact: true, element: <GPSlocation /> },
      { path: "/profile", exact: true, element: <Profile /> },
      { path: "/alert", exact: true, element: <Alerts /> }

    ],
  },
];

export default ThemeRoutes;
