import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

useEffect(() => {
    if (pathname !== "/") { 
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 520, behavior: "smooth" }); 
        }, 100);

        return () => clearTimeout(timeout);
    }
}, [pathname]);

  return null;
};

export default ScrollToTop;
