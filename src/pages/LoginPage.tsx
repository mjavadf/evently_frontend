
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField
} from "@mui/material";
import AuthContainer from "../components/AuthContainer";
import MaterialRouterLink from "../components/MaterialRouterLink";

function LoginPage() {
  return (
    <AuthContainer formTitle="Sign In">
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <MaterialRouterLink
              variant="body2"
              to={"/forgot_password"}
            >
              Forgot password?
            </MaterialRouterLink>
          </Grid>
          <Grid item>
            <MaterialRouterLink variant="body2" to={"/signup"}>
              {"Don't have an account? Sign Up"}
            </MaterialRouterLink>
          </Grid>
        </Grid>
      </Box>
    </AuthContainer>
  );
}

export default LoginPage;
