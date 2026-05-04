import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ensureAOSInitialized, refreshAOS } from "../lib/aos";

/**
 * Scrolls the document on every route change. Layouts with their own
 * scroll containers (e.g. AppLayout main) should scroll those separately.
 * Initializes AOS once and refreshes after each navigation for SPA correctness.
 */
const RootOutlet = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    ensureAOSInitialized();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      refreshAOS();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, search, hash]);

  return <Outlet />;
};

export default RootOutlet;
