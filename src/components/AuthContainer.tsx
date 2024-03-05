import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import AuthBanner from "./AuthBanner";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface Props {
  children: ReactNode;
  formTitle: "Sign In" | "Sign Up" | "Forget Password"
}

function AuthContainer({ children, formTitle }: Props) {
  const [adjustedHeight, setAdjustedHeight] = useState("100vh");

  useEffect(() => {
    const navbarHeight = (document.getElementById("navbar") as HTMLElement)
      .offsetHeight;
    const adjustedHeightValue = `calc(100vh - ${navbarHeight}px)`;
    setAdjustedHeight(adjustedHeightValue);
  }, []);

  return (
    <Grid
      container
      component="main"
      sx={{
        height: adjustedHeight,
      }}
    >
      <AuthBanner />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {formTitle}
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AuthContainer;
