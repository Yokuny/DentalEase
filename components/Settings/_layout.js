import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
export default function Layout({ children }) {
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
      }}>
      <Typography
        as="h3"
        sx={{
          fontSize: 18,
          fontWeight: 500,
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "5px",
          mb: "15px",
        }}
        className="for-dark-bottom-border">
        Configurações
      </Typography>
      {/* NavBar */}
      <NavBar />

      {/* Children */}
      {children}
    </Card>
  );
}
