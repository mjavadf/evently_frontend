import EventIcon from "@mui/icons-material/Event";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";


const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />
);


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
                <Link to="/login" variant="body2" component={RouterLink}>
                  Login /{" "}
                </Link>
                <Link to="/signup" variant="body2" component={RouterLink}>
                  {" "}
                  Sign-Up
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
