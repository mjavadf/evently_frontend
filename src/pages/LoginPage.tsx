import {
  Alert,
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
import { NavigateFunction, useNavigate, useNavigation } from "react-router-dom";
import { useAuthStatus } from "../store";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { login: triggerAuth } = useAuthStatus();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  
  let navigate: NavigateFunction = useNavigate();
  
  const onSubmit = (data: FieldValues) => {
    login(data.username, data.password)
      .then(() => {
        triggerAuth();
        navigate("/");
        window.location.reload();
      })
      .catch((err) => setError(err.response.data.detail));
  };

  return (
    <AuthContainer formTitle="Sign In">
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <Alert variant="filled" severity="error" sx={{ marginY: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          {...register("username", { required: true, minLength: 3 })}
          error={Boolean(errors.username)}
          helperText={
            errors.username
              ? errors.username.type === "required"
                ? "Username is required."
                : "Username should be at least 3 characters"
              : ""
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", { required: true, minLength: 8 })}
          error={Boolean(errors.password)}
          helperText={
            errors.password
              ? errors.password.type === "required"
                ? "Password is required."
                : "Password should be at least 8 characters"
              : ""
          }
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
