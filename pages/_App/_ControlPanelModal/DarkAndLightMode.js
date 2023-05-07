import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const DarkAndLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Update the class on the <html> element to apply the selected mode
    const htmlElement = document.querySelector("html");
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Button
        onClick={handleToggle}
        variant="contained"
        sx={{
          textTransform: "capitalize",
        }}
        className="whiteColor">
        Trocar para {isDarkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </>
  );
};

export default DarkAndLightMode;
