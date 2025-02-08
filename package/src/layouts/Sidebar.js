import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { MdMedication } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { FaRobot } from "react-icons/fa";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2", // Keep this as a string for Bootstrap icons
  },
  {
    title: "Pill Reminder",
    href: "/Smartpill",
    icon: <MdMedication />, // This is a React component
  },
  {
    title: "GPS Location",
    href: "/gps-location",
    icon: <MdMyLocation />, // GPS pinpoint icon
  },
  {
    title: "Chatbot",
    href: "/chatbot",
    icon: <FaRobot />, // Chatbot icon
}
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
                {/* Check if the icon is a string (Bootstrap) or a React component */}
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
