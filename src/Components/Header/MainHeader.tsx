import {
  BrainCircuit,
  ChevronDown,
  Mail,
  MenuIcon,
  Phone,
  TextAlignEnd,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";

const menuItems = [
  {
    label: "home",
    isExpanded: false,
    link: "/",
  },
  {
    label: "Features",
    isExpanded: true,
    link: "feature",
  },
  {
    label: "solutions",
    isExpanded: true,
    link: "solution",
  },
  {
    label: "resources",
    isExpanded: true,
    link: "resources",
  },
  {
    label: "Contact",
    isExpanded: false,
    link: "contact",
  },
];

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indexofBigMenu, setIndexOfBigMenu] = useState<number | null>(null);

  const handleMouseLeave = (index: number) => {
    setIndexOfBigMenu(indexofBigMenu === index ? index : null);
    console.log(indexofBigMenu);
  };

  console.log(indexofBigMenu);

  return (
    <header className="relative transition-all duration-1000 ease-in-out">
      {/* Top bar  */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-800 py-2 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-center md:justify-between">
            <div>
              <ul className="flex flex-wrap justify-center flex-row sm:flex-row gap-2 md:gap-4">
                <li className="flex items-center gap-2">
                  <div className="p-1 border-2 border-white rounded-full">
                    <Mail className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <Link
                    className="text-white text-sm font-medium "
                    to={"mailto:info@example.com"}
                  >
                    info@example.com
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <div className="p-1 border-2 border-white rounded-full">
                    <Phone className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <Link
                    className="text-white text-sm font-medium "
                    to={"tel:+1234567890"}
                  >
                    +1 (234) 567-890
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-white italic">
                #Study Smarter with AI
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Menu bar  */}

      <div className="bg-slate-100/10 py-5 md:py-4 px-6 shadow-md shadow-gray-200">
        <div className="container mx-auto ">
          <div className="flex  justify-between items-center gap-2 w-full lg:px-10">
            {/* logo  */}

            <div className="w-auto lg:w-[20%]">
              <div className="flex items-center gap-1 md:gap-2 text-sm md:text-lg font-medium">
                <div className="p-1.5 md:p-2 rounded-md md:rounded-xl bg-linear-to-br shadow-md shadow-emerald-200 tracking-tighter capitalize from-emerald-400 to-teal-700">
                  <BrainCircuit
                    className="w-5 h-5 md:w-6 md:h-6 text-white "
                    strokeWidth={3}
                  />
                </div>
                <span className="hidden md:block"> AI Learning Assistant</span>
              </div>
            </div>
            <div className=" hidden lg:block w-[40%]">
              {/* nav  */}

              <nav>
                <ul
                  onMouseLeave={() => setIndexOfBigMenu(null)}
                  className="flex justify-between items-center gap-2"
                >
                  {menuItems?.map((item, index) => (
                    <li
                      onMouseEnter={() => setIndexOfBigMenu(index)}
                      key={index}
                      className="font-normal capitalize text-[1.1rem] px-2 flex items-end gap-0.5 group "
                    >
                      <NavLink
                        className={({ isActive }) =>
                          `${isActive ? "text-teal-600" : ""}`
                        }
                        to={item.link as string}
                      >
                        {item.label}
                      </NavLink>
                      {item.isExpanded && (
                        <ChevronDown
                          strokeWidth={1.5}
                          className="w-5 h-5 group-hover:rotate-180 transition-normal duration-300"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* buttons  */}
            <div className=" hidden md:w-[40%] lg:w-[25%] md:flex justify-end">
              <div className="flex items-center justify-center gap-2">
                <button className="px-6 py-1.5 border-2 border-transparent hover:border-emerald-500 rounded-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 group">
                  <Link
                    to="register"
                    className="text-gray-600 font-medium text-md group-hover:text-emerald-500 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </button>
                <button className="px-6 py-1.5 border-2 rounded-lg border-transparent hover:border-emerald-500 bg-linear-to-br from-emerald-400 to-teal-500 hover:from-white hover:to-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 transition-all duration-300 group">
                  <Link
                    to="Login"
                    className="text-white font-medium text-md  group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-400 group-hover:to-teal-600 transition-all duration-300"
                  >
                    Try For Free
                  </Link>
                </button>
              </div>
            </div>
            {/*  Mobile Menu Link  */}
            <div className="flex lg:hidden  w-[20%] justify-end">
              <div
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <TextAlignEnd />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu  */}

      {
        <div
          className={`fixed inset-0 z-40 bg-slate-600/40 backdrop-blur-sm transition-opacity duration-1000 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`fixed top-0 right-0 z-70 transform transition-transform ease-in-out duration-1000 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-[100vw]"} bg-white w-full md:w-[80%] min-h-screen`}
          >
            <div className="px-4">
              <div>
                {/* top bar  */}
                <div className="py-4 flex items-center justify-between border-b-2 border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-700/20 rounded-lg inline-block">
                      <BrainCircuit
                        className="w-6 h-6 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-lg font-medium text-slate-900 capitalize">
                      AI learning Assistant
                    </p>
                  </div>
                  <div className="p-1 rounded-full border border-slate-500 hover:border-slate-900 transition-colors duration-300 group">
                    <X
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="w-6 h-6 text-slate-500 group-hover:text-slate-900 cursor-pointer transition-colors duration-300"
                      strokeWidth={3}
                    />
                  </div>
                </div>

                <div>
                  <nav>
                    <ul className="flex flex-col justify-center gap-4">
                      {menuItems?.map((item, index) => (
                        <li key={index}>
                          <NavLink
                            to={item.link!}
                            className={({ isActive }) =>
                              `${isActive ? "hover:text-emerald-700" : ""} text-emerald-300`
                            }
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {indexofBigMenu}
    </header>
  );
};

export default MainHeader;
