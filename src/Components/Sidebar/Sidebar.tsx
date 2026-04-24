import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  LayoutDashboard,
  LogOut,
  User,
  X,
  type LucideProps,
} from "lucide-react";
type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

type NavLinksdata = {
  to: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
}[];

const Sidebar = (props: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks: NavLinksdata = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      text: "Dashboard",
    },
    {
      to: "/documents",
      icon: FileText,
      text: "Documents",
    },
    {
      to: "/flashcards",
      icon: BookOpen,
      text: "Flashcard",
    },
    {
      to: "/profile",
      icon: User,
      text: "profile",
    },
  ];

  return (
    <>
      <div
        onClick={props.toggleSidebar}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${props.isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${props.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* logo and Close button for mobile */}

        <div className="flex items-center justify-between h-18 px-5 border-b border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12  rounded-xl bg-linear-to-br from-emerald-400 to-teal-500/50 shadow-md shadow-emerald-500/20">
              <BrainCircuit
                className="text-white"
                size={30}
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-sm  md:text-base font-bold text-slate-900 tracking-tight">
              AI Learning Assistant
            </h1>
          </div>
          <button
            onClick={props.toggleSidebar}
            className="md:hidden text-slate-50 hover:text-slate-900"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={props.toggleSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 capitalize py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={20}
                    strokeWidth={2.5}
                    className={`transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`}
                  />

                  {link.text}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        {/* logout */}
        <div className="px-3 py-4 border-t border-slate-200/60">
          <button
            className="group flex items-center gap-3  w-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut
              size={20}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
