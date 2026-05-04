import { Outlet, useLocation } from "react-router";
import Header from "../Header/Header";
import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { refreshAOS } from "../../lib/aos";

const AppLayout = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const aosScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  const scheduleAOSRefresh = useCallback(() => {
    if (aosScrollTimer.current !== null) return;
    aosScrollTimer.current = setTimeout(() => {
      aosScrollTimer.current = null;
      refreshAOS();
    }, 120);
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => refreshAOS());
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    return () => {
      if (aosScrollTimer.current !== null) {
        clearTimeout(aosScrollTimer.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex h-screen bg-neutral-50 text-neutral-900 ">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main
            ref={mainRef}
            onScroll={scheduleAOSRefresh}
            className="flex-1 overflow-x-hidden overflow-y-auto p-4"
          >
            {<Outlet />}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
