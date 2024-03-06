import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import AuthContainer from "../components/AuthContainer";
import MaterialRouterLink from "../components/MaterialRouterLink";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

function SignUpPage() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);

  let navigate: NavigateFunction = useNavigate();

  const onSubmit = (data: FieldValues) => {
    register(
      data.username,
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      ""
    )
      .then(() => {
        // navigate("/");
        setSuccessful(true);
        // TO-DO: navigate to a new page
      })
      .catch((err) => {
        setError(err.response.data.detail|| err.message);
      });
  };

  return (
    <AuthContainer formTitle="Sign Up">
      <Box
        component="form"
        noValidate
        sx={{ mt: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <Alert variant="filled" severity="error" sx={{ marginY: 2 }}>
            {error}
          </Alert>
        )}
        {successful && (
          <Alert variant="outlined" severity="success" sx={{ marginY: 2 }}  action={
            <Button color="inherit" size="small" variant="text">
              Login
            </Button>
          }>
            Registration was successful.
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              {...registerForm("firstName", { minLength: 3 })}
              error={Boolean(errors.firstName)}
              helperText={
                errors.firstName
                  ? "First name should be at least 3 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              autoComplete="family-name"
              {...registerForm("lastName", { minLength: 3 })}
              error={Boolean(errors.lastName)}
              helperText={
                errors.lastName
                  ? "Last name should be at least 3 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              {...registerForm("username", { required: true, minLength: 3 })}
              error={Boolean(errors.username)}
              helperText={
                errors.username
                  ? errors.username.type === "required"
                    ? "Username is required."
                    : "Username should be at least 3 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...registerForm("email", { required: true })}
              error={Boolean(errors.email)}
              helperText={errors.email ? "Email is required." : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...registerForm("password", { required: true, minLength: 8 })}
              error={Boolean(errors.password)}
              helperText={
                errors.password
                  ? errors.password.type === "required"
                    ? "Password is required."
                    : "Password should be at least 8 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MaterialRouterLink variant="body2" to={"/login"}>
              Already have an account? Sign in
            </MaterialRouterLink>
          </Grid>
        </Grid>
      </Box>
    </AuthContainer>
  );
}

export default SignUpPage;
