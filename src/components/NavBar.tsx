import EventIcon from "@mui/icons-material/Event";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function NavBar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

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
              flexGrow: 1
            }}
          >
            Evently
          </Typography>
          <Box>
            {isAuth ? (
              <Button variant="outlined" href="/logout">Logout</Button>
            ) : (
              <Button variant="contained" href="/login">Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
