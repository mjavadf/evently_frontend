import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import AuthContainer from "../components/AuthContainer";

function ForgotPasswordPage() {
  return (
    <AuthContainer formTitle="Forget Password">
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Typography variant="h6" align="center">You can reset your password here.</Typography>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
      </Box>
    </AuthContainer>
  );
}

export default ForgotPasswordPage;
