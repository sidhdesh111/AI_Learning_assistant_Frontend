import { BrainCircuit } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";
import { Link } from "react-router";

const MainFooter = () => {
  return (
    <footer className="bg-linear-to-br from-slate-200/30 to-neutral-200/20 z-40">
      <div className="container mx-auto py-20 px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="space-x-5 w-full lg:w-[40%]">
            <div className="flex  items-center gap-2">
              <div className="p-3 bg-linear-to-br from-emerald-400 to-teal-600 w-fit rounded-xl shadow-lg shadow-emerald-400/40">
                <BrainCircuit className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-bold inline-block text-slate-800">
                AI Learning Assistant
              </span>
            </div>
            <p className="pt-4 text-lg text-slate-600 font-medium">
              Our AI Learning Assistant helps users study smarter by turning
              uploaded documents into summaries, quizzes, flashcards, and
              interactive learning content in seconds.
            </p>
            <div className="space-x-2 space-y-10">
              <ul className="flex gap-4 pt-4">
                <Link target="_blank" to={"/"}>
                  <li className="p-2 bg-slate-300 rounded-lg hover:bg-teal-900 hover:!text-slate-300 transition-colors duration-500 text-teal-900 cursor-pointer">
                    <FaFacebook size={25} />
                  </li>
                </Link>
                <Link target="_blank" to={"/"}>
                  <li className="p-2 bg-slate-300 rounded-lg hover:bg-teal-900 hover:!text-slate-300 transition-colors duration-500 text-teal-900 cursor-pointer">
                    <FaInstagram size={25} />
                  </li>
                </Link>
                <Link target="_blank" to={"/"}>
                  <li className="p-2 bg-slate-300 rounded-lg hover:bg-teal-900 hover:!text-slate-300 transition-colors duration-500 text-teal-900 cursor-pointer">
                    <FaLinkedin size={25} />
                  </li>
                </Link>
                <Link target="_blank" to={"/"}>
                  <li className="p-2 bg-slate-300 rounded-lg hover:bg-teal-900 hover:!text-slate-300 transition-colors duration-500 text-teal-900 cursor-pointer">
                    <TbBrandYoutube size={25} />
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 w-full lg:w-[60%]">
            <div className="w-[45%] lg:w-[32%]">
              <div>
                <h2 className="text-lg font-bold text-emerald-900 mb-2">
                  Useful Links
                </h2>
                <ul className="flex flex-col gap-1.5 ml-2 mb-4">
                  <Link
                    to={"/"}
                    className="w-fit   text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Features</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Solutions</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Resources</li>
                  </Link>

                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Contact</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="w-[45%] lg:w-[32%]">
              <div>
                <h2 className="text-lg font-bold text-emerald-900 mb-2">
                  Useful Links
                </h2>
                <ul className="flex flex-col gap-1.5 ml-2 mb-4">
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Features</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Solutions</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Resources</li>
                  </Link>

                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Contact</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="w-[45%] lg:w-[32%]">
              <div>
                <h2 className="text-lg font-bold text-emerald-900 mb-2">
                  Useful Links
                </h2>
                <ul className="flex flex-col gap-1.5 ml-2 mb-4">
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Features</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Solutions</li>
                  </Link>
                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Resources</li>
                  </Link>

                  <Link
                    to={"/"}
                    className="w-fit  text-md font-medium  hover:text-teal-900 hover:translate-x-2 transform transition-all duration-500"
                  >
                    <li>Contact</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 bg-linear-to-br from-emerald-500 to-teal-800 px-2 lg:px-10">
        <p className="text-center text-sm font-medium text-white flex flex-col lg:flex-row items-center justify-center">
          &copy; Copyright 2026 NaraNexus LLP, Inc. All Rights Reserved, Design
          and Develop by{" "}
          <span className="text-rose-500 inline-block text-[1.2rem] mx-1.5">
            ♥
          </span>{" "}
          Sidhdesh
        </p>
      </div>
    </footer>
  );
};

export default MainFooter;
