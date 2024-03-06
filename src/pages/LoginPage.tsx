import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AuthContainer from "../components/AuthContainer";
import MaterialRouterLink from "../components/MaterialRouterLink";
import { login } from "../services/authService";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuthStatus } from "../store";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const {login: triggerAuth} = useAuthStatus()

  const onSubmit = (data: FieldValues) => {
    login(data.email, data.password);
    triggerAuth()
  };

  return (
    <AuthContainer formTitle="Sign In">
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register("email")}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password")}
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
            <MaterialRouterLink variant="body2" to={"/forgot_password"}>
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
