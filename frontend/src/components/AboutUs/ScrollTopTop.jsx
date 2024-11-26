import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { scrollTop } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt die Seite nach oben
  }, [scrollTop]);

  return null;
};

export default ScrollToTop;
