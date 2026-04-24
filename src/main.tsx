import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router/Route.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        duration: 5000,
      }}
    />
    <RouterProvider router={Router} />
  </AuthProvider>,
);
