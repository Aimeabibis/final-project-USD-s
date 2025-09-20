import { useState } from "react";
import {
  Home,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps {
  darkMode: boolean;
}

export const Sidebar = ({ darkMode }: SidebarProps) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`transition-all duration-300 gap-10 ${
        openSidebar ? "w-64" : "w-20"
      } ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-lg p-4 flex flex-col`}
    >
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          {openSidebar ? "FitTrack360" : "FT"}
        </h1>
        <span
          onClick={() => setOpenSidebar(!openSidebar)}
          className={`cursor-pointer rounded-full  p-1 -mr-8 shadow-md  ${
            darkMode
              ? "bg-gray-800  hover:bg-green-100 hover:text-gray-900"
              : "bg-white text-gray-900 hover:bg-green-100"
          }`}
        >
          {" "}
          {openSidebar ? <ChevronLeft /> : <ChevronRight />}
        </span>
      </div>

      <nav className="flex flex-col space-y-4 ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 
     ${isActive ? "font-bold " : ""} ${darkMode ? "hover:text-gray-900" : ""}`
          }
        >
          <Home size={20} />
          {openSidebar && "Dashboard"}
        </NavLink>
        <NavLink
          to="/users"
          className={({
            isActive,
          }) => `flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700
          ${isActive ? "font-bold " : ""} ${
            darkMode ? "hover:text-gray-900" : ""
          }`}
        >
          <Users size={20} />
          {openSidebar && "Utilisateurs"}
        </NavLink>
        <NavLink
          to="/activities"
          className={({
            isActive,
          }) => `flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700
          ${isActive ? "font-bold " : ""}
          ${darkMode ? "hover:text-gray-900" : ""}`}
        >
          <Activity size={20} />
          {openSidebar && "Activités"}
        </NavLink>
        <a
          onClick={() => handleLogout()}
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 cursor-pointer ${
            darkMode ? "hover:text-gray-900" : ""
          }`}
        >
          <LogOut size={20} />
          {openSidebar && "Déconnexion"}
        </a>
      </nav>
    </aside>
  );
};
