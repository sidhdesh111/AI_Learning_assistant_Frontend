import { Link } from "react-router";
import { Home } from "lucide-react";

const Not_Found = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-linear-to-b from-slate-50 to-white">
      <div
        className="text-center max-w-md"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        <p className="text-8xl font-black text-emerald-600/90 tracking-tighter mb-2">
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-600 font-medium mb-8">
          The page you are looking for does not exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:from-teal-600 hover:to-emerald-500 transition"
        >
          <Home className="w-5 h-5" />
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Not_Found;
