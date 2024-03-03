import EventIcon from "@mui/icons-material/Event";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventIcon />
          <Typography
            marginLeft={2}
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Evently
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
