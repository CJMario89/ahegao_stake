import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    const onResize = (e) => {
      setScreenWidth(e.target.innerWidth);
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [screenWidth]);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  const isMobile = screenWidth < 800;
  return {
    screenWidth,
    isMobile,
  };
};

export default useScreenWidth;
