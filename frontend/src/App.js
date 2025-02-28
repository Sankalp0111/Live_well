import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the App component correctly
const App = () => {
  // Define your routes
  const routing = useRoutes(Themeroutes);

  return (
    <div className="dark">
      {routing}
      <ToastContainer />
    </div>
  );
};

export default App; // Export the component at the end
