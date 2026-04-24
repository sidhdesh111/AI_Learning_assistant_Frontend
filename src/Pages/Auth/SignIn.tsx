import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { BrainCircuit, Mail } from "lucide-react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbLockPassword } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";

import { loginAPI } from "../../Services/authServices";

import Spin_loader from "../../Components/Loader/Spin_loader";

interface ResponseData {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user?:
    | {
        id: string;
        username: string;
        email: string;
        name: string;
        profilePicture?: string;
      }
    | undefined;
  statusCode: number;
}

const SignIn = () => {
  // const saveSettings = (success: boolean): Promise<void> => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (success) {
  //         resolve();
  //       }
  //       else {
  //         reject(new Error("Failed to save settings"));
  //       }
  //     }, 2000);
  //   });
  // }

  // toast.promise(saveSettings(true), {
  //   loading: "Saving...",
  //   success: <b>Settings saved!</b>,
  //   error: <b>Could not save.</b>,
  // });

  const [email, setemail] = useState<string>("john@example.com");
  const [password, setpassword] = useState<string>("test1234");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState<boolean>(false);
  const [showpassword, setshowpassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror("");
      const response: ResponseData = await loginAPI(email, password);
      console.log("Login response:", response);
      if (response.success) {
        toast.success("Login successful!");
        // Pass both access and refresh tokens to login
        login(response?.user, response.accessToken, response.refreshToken);
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorMsg = error?.message || "Login failed. Please try again.";
      seterror(errorMsg);
      toast.error(errorMsg);
      console.error("Login error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-2 lg:px-0 ">
      <div className="flex flex-col p-8 border-2 shadow-lg shadow-emerald-100/50 rounded-3xl border-gray-100 w-lg">
        <div className="text-center">
          <div className="border w-fit mx-auto my-4 p-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-[2rem] capitalize font-[600]">Welcome Back !</h1>
          <p className="text-[1.1rem] text-gray-500 mt-1">
            Sign in to continue your Journey
          </p>
        </div>

        <div className="pt-15 pb-5">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative pb-5">
              <label
                className="text-[1rem] block pb-1 uppercase font-[600]"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex border-2 border-gray-200 rounded-md p-2 focus-within:border-teal-500 duration-300">
                <Mail className="text-gray-400" />
                <input
                  autoComplete="email"
                  className="w-full ml-2 outline-none text-[1rem] tracking-wider"
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative pb-5">
              <label
                className="text-[1rem] block pb-1 uppercase font-[600]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex border-2 border-gray-200 rounded-md p-2 focus-within:border-teal-500 duration-300">
                <TbLockPassword
                  {...({ className: "text-gray-400 w-7 h-7" } as any)}
                />
                <input
                  autoComplete="current-password"
                  className="w-full ml-2 outline-none text-[1rem] tracking-widest"
                  type={showpassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
              </div>
              <div
                className="cursor-pointer absolute right-3 top-[55%] translate-y-[-55%]"
                onClick={() => setshowpassword((prev) => !prev)}
              >
                {showpassword ? (
                  <GoEye {...({ className: "text-gray-400 w-6 h-6" } as any)} />
                ) : (
                  <GoEyeClosed
                    {...({ className: "text-gray-400 w-6 h-6" } as any)}
                  />
                )}
              </div>
            </div>
            {error && (
              <div className="p-2 bg-red-200/30 rounded-lg border-1 border-red-400 ">
                <p className="text-red-700 text-center">{error}</p>
              </div>
            )}

            <div className="pt-4 pb-10 border-b border-gray-200">
              <button
                className=" flex justify-center items-center gap-2 w-full py-3 cursor-pointer bg-gradient-to-r from-emerald-400 to-teal-500 text-[1.2rem] text-white font-[600] rounded-md hover:from-emerald-500 hover:to-teal-600 transition-all hover:shadow-lg shadow-teal-200 duration-600"
                type="submit"
              >
                {loading ? (
                  <Spin_loader color="white" width={20} height={20} />
                ) : (
                  <>
                    Sign In
                    <FaArrowRight {...({ className: "w-5 h-5" } as any)} />
                  </>
                )}
              </button>
            </div>
          </form>
          <p className="text-center mt-5 text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-teal-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
