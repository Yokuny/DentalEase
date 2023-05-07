import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Profile() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
            Perfil
          </Typography>

          <Typography fontSize="13px">Atualizar foto de perfil e detalhes pessoais</Typography>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}>
                Nome
              </Typography>
              <TextField autoComplete="given-name" name="firstName" fullWidth id="firstName" autoFocus />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}>
                Sobrenome
              </Typography>

              <TextField fullWidth id="lastName" name="lastName" autoComplete="family-name" />
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
                Endereço de Email
              </Typography>

              <TextField fullWidth id="email" name="email" autoComplete="email" />
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
                Foto de perfil
              </Typography>

              <TextField required fullWidth name="file" type="file" id="file" autoComplete="file" />

              <Box mt={1}>
                <Image
                  src="/images/user1.png"
                  alt="profile"
                  className="borRadius100"
                  width="50"
                  height="50"
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              padding: "12px 30px",
              color: "#fff !important",
            }}>
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
