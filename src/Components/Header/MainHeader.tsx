import {
  BrainCircuit,
  ChevronDown,
  Mail,
  MenuIcon,
  Phone,
  TextAlignEnd,
  X,
} from "lucide-react";
import React, {
  useCallback,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Link, NavLink } from "react-router";
import Big_Menu from "../Big_Menu/Big_Menu";
import Big_MobileMenu from "../Big_Menu/Big_MobileMenu";

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
    children: [
      {
        label: "ai notes",
        desc: "Notes that write themselves",
      },
      {
        label: "ai summarization",
        desc: "Review faster, anytime",
      },
      {
        label: "ai flashcard",
        desc: "Make it impossible to forget",
      },
      {
        label: "Ai Quizzes",
        desc: "Test yourself before exams do",
      },
      {
        label: "ai tutor",
        desc: "Ask questions. Get clarity 24/7",
      },
    ],
  },
  {
    label: "solutions",
    isExpanded: true,
    link: "solution",
    children: [
      {
        label: "For Students",
        desc: "Notes that write themselves",
      },
      {
        label: "For Self-Learners",
        desc: "Review faster, anytime",
      },
      {
        label: "For Educators",
        desc: "Make it impossible to forget",
      },
      {
        label: "For Professionals",
        desc: "Test yourself before exams do",
      },
    ],
  },
  {
    label: "resources",
    isExpanded: true,
    link: "resources",
    children: [
      {
        label: "FAQ",
        desc: "Notes that write themselves",
      },
      {
        label: "Help Center",
        desc: "Review faster, anytime",
      },
      {
        label: "Blog",
        desc: "Make it impossible to forget",
      },
    ],
  },
  {
    label: "Contact",
    isExpanded: false,
    link: "contact",
  },
];

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [indexofMobileMenu, setIndexOfMobileMenu] = useState<number | null>(
    null,
  );
  const [indexofBigMenu, setIndexOfBigMenu] = useState<number | null>(null);
  const closeTimeoutRef =
    React.useRef<React.RefObject<React.RefObject<any> | null>>(null);

  const handleHoverBigMenu = useCallback((index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIndexOfBigMenu(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIndexOfBigMenu(null);
    }, 300);
  }, []);

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
          <div className="flex justify-between items-center gap-2 w-full lg:px-2">
            {/* logo  */}

            <div className="w-auto lg:w-[28%]">
              <div className="flex items-center gap-1 md:gap-2 text-sm md:text-lg font-medium">
                <Link to={"/"}>
                  <div className="p-1.5 md:p-2 rounded-md md:rounded-xl bg-linear-to-br shadow-md shadow-emerald-200 tracking-tighter capitalize from-emerald-400 to-teal-700">
                    <BrainCircuit
                      className="w-5 h-5 md:w-6 md:h-6 text-white "
                      strokeWidth={3}
                    />
                  </div>
                </Link>
                <span className="hidden md:block">AI Learning Assistant</span>
              </div>
            </div>
            <div className=" hidden lg:flex lg:w-[45%] text-center  justify-center items-center">
              {/* nav  */}

              <nav>
                <ul className="relative flex justify-between items-center gap-2">
                  {menuItems?.map((item, index) => (
                    <li
                      onMouseEnter={() => handleHoverBigMenu(index)}
                      onMouseLeave={() => handleMouseLeave()}
                      key={index}
                      className="font-normal text-[1.1rem] px-2 flex items-end gap-0.5 group relative"
                    >
                      <NavLink
                        className={({ isActive }) =>
                          `${isActive ? "text-teal-600" : ""} capitalize`
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
                      {index === indexofBigMenu && item.isExpanded && (
                        <Big_Menu
                          index={index}
                          item={item}
                          handleHoverBigMenu={() => handleHoverBigMenu(index)}
                          handleMouseLeave={handleMouseLeave}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* buttons  */}
            <div className=" hidden md:w-[40%] lg:w-[30%] md:flex justify-end">
              <div className="flex items-center justify-center gap-2">
                <Link
                  to="register"> <button className="px-4 py-1.5 border-2 border-transparent hover:border-emerald-500 rounded-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 group">
                    <p
                      className="text-gray-600 font-medium text-md group-hover:text-emerald-500 transition-colors duration-300"
                    >
                      Sign Up
                    </p>
                  </button>
                </Link>
                <Link
                  to="Login"> <button className="px-4 py-1.5 border-2 rounded-lg border-transparent hover:border-emerald-500 bg-linear-to-br from-emerald-400 to-teal-500 hover:from-white hover:to-slate-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 transition-all duration-300 group">
                    <p
                      className="text-white font-medium text-md  group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-400 group-hover:to-teal-600 transition-all duration-300"
                    >
                      Try For Free
                    </p>
                  </button>
                </Link>
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
          className={`fixed inset-0 z-40 bg-slate-600/40 backdrop-blur-sm transition-opacity duration-1000 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
                    <ul className="relative h-full flex flex-col justify-center">
                      {menuItems?.map((item, index) => (
                        <React.Fragment key={index}>
                          <li
                            key={index}
                            className={`py-2 ${indexofMobileMenu === index ? null : "border-b-2 border-slate-300"} w-full flex items-end`}
                          >
                            {(item?.children?.length as number) > 0 ? (
                              <div
                                onClick={() =>
                                  setIndexOfMobileMenu(
                                    indexofMobileMenu === index ? null : index,
                                  )
                                }
                                className="font-medium capitalize cursor-pointer"
                              >
                                {item.label}
                              </div>
                            ) : (
                              <NavLink
                                to={item.link}
                                className={({ isActive }) =>
                                  `${isActive ? "text-teal-600" : ""} font-medium capitalize`
                                }
                              >
                                {item.label}
                              </NavLink>
                            )}
                            {item.isExpanded && (
                              <ChevronDown
                                strokeWidth={1.5}
                                className={`w-5 h-5 ${indexofMobileMenu === index ? "rotate-180" : ""} transform transition-normal duration-300`}
                              />
                            )}
                          </li>
                          {indexofMobileMenu === index && (
                            <Big_MobileMenu item={item} />
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  );
};

export default React.memo(MainHeader);
