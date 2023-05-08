import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const OnlyLeftSidebarDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem("leftSidebarTheme");
    if (storedPreference === "leftsidebardark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("leftSidebarTheme", isDarkMode ? "leftsidebardark" : "light");

    // Update the class on the <leftsidebardark> element to apply the selected mode
    const htmlElement = document.querySelector("leftsidebardark");
    if (isDarkMode) {
      htmlElement.classList.add("leftsidebardark");
    } else {
      htmlElement.classList.remove("leftsidebardark");
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

export default OnlyLeftSidebarDarkMode;
