import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function ErrorPage() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          padding: "150px 0",
        }}>
        <Typography
          as="h1"
          sx={{
            fontWeight: "800",
            fontSize: "8rem",
          }}>
          404
        </Typography>

        <Typography
          as="h1"
          sx={{
            fontWeight: "500",
            fontSize: "22px",
            mt: "20px",
            mb: "10px",
          }}>
          A pagina que você está procurando não existe
        </Typography>

        <Typography>
          A pagina que você está procurando não existe ou foi removida, o nome foi alterado ou está
          temporariamente indisponível.
        </Typography>

        <Link href="/" className="text-decoration-none">
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 30px",
              color: "#fff !important",
            }}>
            Voltar a página inicial
          </Button>
        </Link>
      </Box>
    </>
  );
}
