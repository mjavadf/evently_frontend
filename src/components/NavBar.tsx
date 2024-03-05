import EventIcon from "@mui/icons-material/Event";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import MaterialRouterLink from "./MaterialRouterLink";


function NavBar() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <AppBar position="static" id="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems={"center"}
            sx={{
              flexGrow: 1,
            }}
          >
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
          </Stack>
          <Box>
            {isAuth ? (
              <Button variant="outlined" href="/logout">
                Logout
              </Button>
            ) : (
              <>
                <MaterialRouterLink to="/login" variant="body2">
                  Login /{" "}
                </MaterialRouterLink>
                <MaterialRouterLink to="/signup" variant="body2">
                  {" "}
                  Sign-Up
                </MaterialRouterLink>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
