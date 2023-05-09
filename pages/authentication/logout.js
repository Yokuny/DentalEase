import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Image from "next/image";

export default function Logout() {
  return (
    <>
      <div className="authenticationBox">
        <Box
          component="main"
          sx={{
            padding: "70px 0 100px",
          }}>
          <Box
            sx={{
              background: "#fff",
              padding: "30px 20px",
              borderRadius: "10px",
              maxWidth: "510px",
              ml: "auto",
              mr: "auto",
              textAlign: "center",
            }}
            className="bg-black">
            <Box>
              <Image
                src="/images/favicon.svg"
                alt="Black logo"
                className="black-logo"
                height={60}
                width={100}
              />

              <Image
                src="/images/logo-white.png"
                alt="White logo"
                className="white-logo"
                height={60}
                width={100}
              />
            </Box>

            <Box mt={4} mb={4}>
              <Image src="/images/coffee.png" alt="Coffee" height={80} width={80} />
            </Box>

            <Typography as="h1" fontSize="20px" fontWeight="500" mb={1}>
              Você está desconectado{" "}
            </Typography>

            <Typography>Obrigado por usar o modelo de administração Dental ease</Typography>

            <Button
              href="/authentication/sign-in/"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "16px",
                padding: "12px 10px",
                color: "#fff !important",
              }}>
              Entrar
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
