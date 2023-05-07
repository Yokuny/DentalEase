import React from "react";
import { Stack, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Stack
        sx={{
          backgroundColor: "#fff",
          p: "25px",
          borderRadius: "10px 10px 0 0",
          textAlign: "center",
          mt: "15px",
        }}
        className="footer">
        <Box>
          <Typography>
            Copyright{" "}
            <Link href="https://github.com/Yokuny" target="_blank" underline="none" rel="noreferrer">
              Yokuny
            </Link>{" "}
            e{" "}
            <Link
              href="https://www.instagram.com/fillipy_gama/"
              target="_blank"
              underline="none"
              rel="noreferrer">
              Fillipy Gama
            </Link>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
