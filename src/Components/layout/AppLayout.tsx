import { Outlet, useLocation } from "react-router";
import Header from "../Header/Header";
import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { refreshAOS } from "../../lib/aos";

const AppLayout = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const scrollRaf = useRef<number | null>(null);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  const handleMainScroll = useCallback(() => {
    if (scrollRaf.current !== null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      // AOS listens to window scroll; this mirrors scroll updates from the
      // layout's internal scroll container so elements animate while scrolling down.
      window.dispatchEvent(new Event("scroll"));
    });
  }, []);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const id = requestAnimationFrame(() => refreshAOS());
    const timeoutId = window.setTimeout(() => refreshAOS(), 180);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    return () => {
      if (scrollRaf.current !== null) {
        cancelAnimationFrame(scrollRaf.current);
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
            onScroll={handleMainScroll}
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
