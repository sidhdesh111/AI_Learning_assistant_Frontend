import { createBrowserRouter } from "react-router-dom";
import Dashboardpage from "../Pages/Dashboard/Dashboardpage";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Not_Found from "../Pages/Not_Found";

import Home from "../Pages/Home/Home";

import ProtectedRoutes from "../Components/auth/ProtectedRoutes";
import DocumentList from "../Pages/Documents/DocumentList";
import DocumentDetailPage from "../Pages/Documents/DocumentDetailPage";

import FlashcardListPage from "../Pages/Flashcards/FlashcardListPage";
import QuizTakepage from "../Pages/Quizzes/QuizTakepage";
import QuizResultpage from "../Pages/Quizzes/QuizResultpage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import AppLayout from "../Components/layout/AppLayout";

import FlashcardDisplay from "../Pages/Flashcards/FlashcardDisplay";
import MainLayout from "../Components/layout/MainLayout";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Contact from "../Pages/Contact/Contact";

export const Router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboardpage />,
          },
          {
            path: "/documents",
            element: <DocumentList />,
          },
          {
            path: "/documents/:id",
            element: <DocumentDetailPage />,
          },
          {
            path: "/flashcards",
            element: <FlashcardListPage />,
          },
          {
            path: "/flashcards/:id",
            element: <FlashcardDisplay />,
          },
          {
            path: "/quizzes/:quizId",
            element: <QuizTakepage />,
          },
          {
            path: "/quizzes/:quizId/results",
            element: <QuizResultpage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Not_Found />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <Not_Found />,
      },
    ],
  },
]);
