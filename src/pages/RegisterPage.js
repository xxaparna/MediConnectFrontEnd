import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Link,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  LocalHospital,
  Visibility,
  VisibilityOff,
  MedicalServices,
} from "@mui/icons-material";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const SPECIALITIES = [
  { value: "general", label: "General Physician" },
  { value: "gyanae", label: "Gyanae" },
  { value: "ent", label: "ENT" },
  { value: "physiotherapist", label: "Physiotherapist" },
  { value: "dentist", label: "Dentist" },
  { value: "ortho", label: "Ortho" },
  { value: "derma", label: "Derma" },
];

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");
  const [speciality, setSpeciality] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const requestBody =
        role === "doctor"
          ? { name, email, password, role, speciality }
          : { name, email, password, role };

      await axios.post(`${NetworkConstants.BASE_URL}/api/auth/register`, requestBody);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
      <Box sx={{ width: '100%', maxWidth: 600 }}>
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
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                p: 4,
                textAlign: 'center',
              }}
            >
              <MedicalServices sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                Join MediConnect
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                Create your healthcare account
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

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': { color: 'success.main' }
                  }}
                >
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                />

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
                        <LocalHospital color="action" />
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

                {role === "doctor" && (
                  <TextField
                    select
                    label="Medical Speciality"
                    fullWidth
                    margin="normal"
                    required
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MedicalServices color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {SPECIALITIES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}

                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  inputProps={{ minLength: 6 }}
                  helperText="Password should be at least 6 characters"
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

                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    },
                    '&:disabled': {
                      background: '#94a3b8',
                    },
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Already have an account?
                </Typography>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      borderColor: 'secondary.main',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RegisterPage;
