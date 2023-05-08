import React from "react";
import Button from "@mui/material/Button";

const RTLSwitch = () => {
  return (
    <>
      <div className="lang-sidebar">
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
          }}
          className="whiteColor mr-10px"
          href="/">
          Trocar para esquerda para direita
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            textTransform: "capitalize",
          }}
          className="whiteColor"
          href="/ar">
          Trocar para direita para esquerda
        </Button>
      </div>
    </>
  );
};

export default RTLSwitch;
