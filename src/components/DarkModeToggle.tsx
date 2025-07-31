import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function DarkModeToggle() {
  const navigate = useNavigate();

  const getInitialMode = () => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getInitialMode);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 text-xl font-bold text-green-600 dark:text-green-600 text-3xl">
        🍽️ MealMate
      </div>
      <button
        onClick={handleLogout}
        className="fixed top-3 left-3 z-50 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white transition-colors"
      >
        🔒 Log Out
      </button>

      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="fixed top-3 right-3 z-50 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white transition-colors"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </>
  );
}
