import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Link,
  Paper,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  LocalHospital,
} from "@mui/icons-material";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${NetworkConstants.BASE_URL}/api/auth/login`,
        { email, password }
      );
      if (response.data.role !== role) {
        setError("Role selected does not match user account role");
        return;
      }
      login(
        {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        },
        response.data.token
      );
      if (role === "patient") navigate("/patient");
      else navigate("/doctor");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Header Section */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white',
                p: 4,
                textAlign: 'center',
              }}
            >
              <LocalHospital sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                Sign in to your MediConnect account
              </Typography>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 4 }}>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': { color: 'error.main' }
                  }}
                >
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  select
                  label="I am a"
                  fullWidth
                  margin="normal"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="patient">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      👤 Patient
                    </Box>
                  </MenuItem>
                  <MenuItem value="doctor">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      ⚕️ Doctor
                    </Box>
                  </MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                    },
                    '&:disabled': {
                      background: '#94a3b8',
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
