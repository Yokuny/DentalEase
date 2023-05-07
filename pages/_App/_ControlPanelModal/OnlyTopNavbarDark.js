import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const OnlyTopNavbarDark = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("topNavbarDarkTheme");
    if (storedPreference === "TopNavbarDark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("topNavbarDarkTheme", isDarkMode ? "TopNavbarDark" : "light");

    // Update the class on the <html> element to apply the selected mode
    const htmlElement = document.querySelector("topnavbardark");
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

export default OnlyTopNavbarDark;
