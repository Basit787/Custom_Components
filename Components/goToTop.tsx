"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <span
      onClick={scrollToTop}
      className={`fixed md:bottom-8 bottom-4 md:right-8 right-4 p-3 rounded-full border-2 border-secondary-foreground bg-background shadow-md transition-opacity duration-300 ease-in-out cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="text-secondary-foreground" />
    </span>
  );
};

export default GoToTop;
