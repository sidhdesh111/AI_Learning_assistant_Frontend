import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const AppLayout = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-neutral-50 text-neutral-900 ">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            {<Outlet />}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
