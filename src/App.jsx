import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Resources from "./pages/Resources";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/videos" element={<Videos toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
          <Route path="/resources" element={<Resources toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;