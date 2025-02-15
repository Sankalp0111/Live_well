import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { MdMedication } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { FaRobot ,FaUser, FaBell,FaStethoscope} from "react-icons/fa";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2", 
  },
  {
    title: "Pill Reminder",
    href: "/Smartpill",
    icon: <MdMedication />, 
  },
  {
    title: "GPS Location",
    href: "/gps-location",
    icon: <MdMyLocation />, 
  },

  {
    title: "Symptom Checker",
    href: "/symptom",
    icon: <FaStethoscope />,
  },
  {
    title: "Chatbot",
    href: "/chatbot",
    icon: <FaRobot />, 
},

{
  title: "Alerts",
  href: "/alert",
  icon: <FaBell />,
},
{
  title: "Profile",
  href: "/profile",
  icon: <FaUser />, 
},


];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
              
                {typeof navi.icon === "string" ? (
                  <i className={navi.icon}></i>
                ) : (
                  <span className="icon">{navi.icon}</span> // Properly render React component
                )}
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
