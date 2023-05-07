import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import RTLSwitch from "@/components/_App/_ControlPanelModal/RTLSwitch";
import DarkAndLightMode from "@/components/_App/_ControlPanelModal/DarkAndLightMode";
import OnlyLeftSidebarDarkMode from "@/components/_App/_ControlPanelModal/OnlyLeftSidebarDarkMode";
import OnlyTopNavbarDark from "@/components/_App/_ControlPanelModal/OnlyTopNavbarDark";

export default function ThemeSwitch() {
  return (
    <>
      <Box>
        <Box
          sx={{
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
          className="for-dark-bottom-border">
          <Typography component="h1" fontWeight="500" fontSize="18px">
            Tema
          </Typography>
          <Typography fontSize="13px">Personalize o aplicativo</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}>
              Tema escuro e claro
            </Typography>
            {/* DarkAndLightMode */}
            <DarkAndLightMode />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}>
              Apenas barra lateral escura
            </Typography>
            {/* OnlyLeftSidebarDarkMode */}
            <OnlyLeftSidebarDarkMode />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}>
              Apenas barra superior escura
            </Typography>
            {/* OnlyTopNavbarDark */}
            <OnlyTopNavbarDark />
          </Grid>

          <Grid item xs={12}>
            <Typography
              component="label"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                mb: "10px",
                display: "block",
              }}>
              Direita para a esquerda
            </Typography>
            {/* RTLSwitch */}
            <RTLSwitch />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
