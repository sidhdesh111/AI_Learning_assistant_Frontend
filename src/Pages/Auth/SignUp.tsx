import { BrainCircuit, Mail, User } from "lucide-react";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from "react-router";
import Spin_loader from "../../Components/Loader/Spin_loader";
import { FaArrowRight } from "react-icons/fa6";
import { register } from "../../Services/authServices";
import toast from "react-hot-toast";

interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface APIError {
  success: boolean;
  message: string;
  statusCode: number;
}

const SignUp = () => {
  const [showpassword, setshowpassword] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");
  const [formData, setformData] = useState<SignUpFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await register(
        formData.name,
        formData.username,
        formData.email,
        formData.password,
      );

      if (response.success) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error: APIError | any) {
      toast.error("Registration failed. Please try again.");
      seterror(error?.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen p-4 lg:p-0">
      <div className="flex flex-col p-8 border-2 shadow-lg shadow-emerald-100/50 rounded-3xl border-gray-100 w-lg">
        <div className="text-center mb-4">
          <div className="border w-fit mx-auto my-4 p-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h1 className="text-[2rem]  font-[600]">Create an account</h1>
          <p className="text-[1.1rem] text-gray-500 mt-1">
            Start your AI-powered Learning experience
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="relative pt-5">
            <label
              className="block text-[1rem] font-[600] uppercase text-black mb-1"
              htmlFor="username"
            >
              Name
            </label>
            <div className="flex p-2 border-2 border-gray-300 rounded-lg focus-within:border-teal-500">
              <User className="text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, name: e.target.value }))
                }
                autoComplete="name"
                className="w-full ml-2 outline-none text-[1rem] tracking-wider"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div className="relative pt-5">
            <label
              className="block text-[1rem] font-[600] uppercase text-black mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex p-2 border-2 border-gray-300 rounded-lg focus-within:border-teal-500">
              <User className="text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, username: e.target.value }))
                }
                autoComplete="username"
                className="w-full ml-2 outline-none text-[1rem] tracking-wider"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="relative pt-5">
            <label
              className="block text-[1rem] font-[600] uppercase text-black mb-1"
              htmlFor="username"
            >
              email
            </label>
            <div className="flex p-2 border-2 border-gray-300 rounded-lg focus-within:border-teal-500">
              <Mail className="text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full ml-2 outline-none text-[1rem] tracking-wider"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="relative pt-5">
            <label
              className="block text-[1rem] font-[600] uppercase text-black mb-1"
              htmlFor="password"
            >
              password
            </label>
            <div className="flex p-2 border-2 border-gray-300 rounded-lg focus-within:border-teal-500">
              <TbLockPassword
                {...({ className: "text-gray-400 w-7 h-7" } as any)}
              />
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setformData((prev) => ({ ...prev, password: e.target.value }))
                }
                autoComplete="current-password"
                className="w-full ml-2 outline-none text-[1rem] tracking-wider"
                placeholder="Enter your password"
              />
            </div>
            <div
              className="cursor-pointer absolute right-3 top-[50%] translate-y-[50%]"
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
            <div className="border-2 rounded-md bg-red-100/30 border-red-300 text-center p-2 mt-4">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          )}
          <div className=" border-b border-gray-200 pb-10 pt-4">
            <button
              className=" flex justify-center items-center gap-2 w-full py-3 cursor-pointer bg-gradient-to-r from-emerald-400 to-teal-500 text-[1.2rem] text-white font-[600] rounded-md hover:from-emerald-500 hover:to-teal-600 transition-all hover:shadow-lg shadow-teal-200 duration-600"
              type="submit"
            >
              {loading ? (
                <Spin_loader color="white" width={20} height={20} />
              ) : (
                <>
                  Sign Up
                  <FaArrowRight {...({ className: "w-5 h-5" } as any)} />
                </>
              )}
            </button>
          </div>
        </form>
        <p className="text-center mt-5 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-500 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
