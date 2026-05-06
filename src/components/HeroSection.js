import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Icon,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Alert,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  LocalHospital,
  Healing,
  Schedule,
  Person,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  MedicalServices,
} from '@mui/icons-material';
import axios from 'axios';
import NetworkConstants from '../constants/NetworkConstants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SPECIALITIES = [
  { value: "general", label: "General Physician" },
  { value: "gyanae", label: "Gyanae" },
  { value: "ent", label: "ENT" },
  { value: "physiotherapist", label: "Physiotherapist" },
  { value: "dentist", label: "Dentist" },
  { value: "ortho", label: "Ortho" },
  { value: "derma", label: "Derma" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Modal states
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("patient");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerRole, setRegisterRole] = useState("patient");
  const [registerSpeciality, setRegisterSpeciality] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);

  const features = [
    {
      icon: <LocalHospital sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Expert Medical Care',
      description: 'Connect with qualified healthcare professionals',
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Easy Appointments',
      description: 'Book and manage appointments with ease',
    },
    {
      icon: <Healing sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Medicine Reminders',
      description: 'Never miss your medication schedule',
    },
    {
      icon: <Person sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Personal Health Records',
      description: 'Keep track of your medical history',
    },
  ];

  // Login handlers
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const response = await axios.post(
        `${NetworkConstants.BASE_URL}/api/auth/login`,
        { email: loginEmail, password: loginPassword }
      );
      if (response.data.role !== loginRole) {
        setLoginError("Role selected does not match user account role");
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
      setLoginOpen(false);
      if (loginRole === "patient") navigate("/patient");
      else navigate("/doctor");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Register handlers
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    }

    setRegisterLoading(true);
    try {
      const requestBody =
        registerRole === "doctor"
          ? { name: registerName, email: registerEmail, password: registerPassword, role: registerRole, speciality: registerSpeciality }
          : { name: registerName, email: registerEmail, password: registerPassword, role: registerRole };

      await axios.post(`${NetworkConstants.BASE_URL}/api/auth/register`, requestBody);
      setRegisterSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        setRegisterOpen(false);
        setLoginOpen(true);
      }, 2000);
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Registration failed");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => {
    setLoginOpen(false);
    setLoginError("");
    setLoginEmail("");
    setLoginPassword("");
    setLoginRole("patient");
  };

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => {
    setRegisterOpen(false);
    setRegisterError("");
    setRegisterSuccess("");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterRole("patient");
    setRegisterSpeciality("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
  };

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Content */}
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              MediConnect
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400,
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Your Complete Healthcare Management Solution
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                mb: 6,
                maxWidth: '500px',
                mx: 'auto',
                opacity: 0.8,
                lineHeight: 1.6,
              }}
            >
              Connect with doctors, manage appointments, track medications, and maintain your health records all in one place.
            </Typography>

            {/* Call to Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 8,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleLoginOpen}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleRegisterOpen}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  color: 'white',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <Grid
            container
            spacing={4}
            sx={{
              maxWidth: '1200px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    minHeight: '200px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: 'white',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        </Container>
      </Box>

      {/* Login Dialog */}
      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            textAlign: 'center',
            py: 3,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <LocalHospital sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h4" component="div" fontWeight={700}>
              Welcome Back
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Sign in to your MediConnect account
          </Typography>
          <IconButton
            onClick={handleLoginClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {loginError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': { color: 'error.main' }
              }}
            >
              {loginError}
            </Alert>
          )}

          <form onSubmit={handleLoginSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
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
              value={loginRole}
              onChange={(e) => setLoginRole(e.target.value)}
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
              type={showLoginPassword ? "text" : "password"}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      edge="end"
                    >
                      {showLoginPassword ? <VisibilityOff /> : <Visibility />}
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
              disabled={loginLoading}
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
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog
        open={registerOpen}
        onClose={handleRegisterClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            textAlign: 'center',
            py: 3,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
            <MedicalServices sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h4" component="div" fontWeight={700}>
              Join MediConnect
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Create your healthcare account
          </Typography>
          <IconButton
            onClick={handleRegisterClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {registerError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': { color: 'error.main' }
              }}
            >
              {registerError}
            </Alert>
          )}

          {registerSuccess && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': { color: 'success.main' }
              }}
            >
              {registerSuccess}
            </Alert>
          )}

          <form onSubmit={handleRegisterSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
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
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
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
              value={registerRole}
              onChange={(e) => setRegisterRole(e.target.value)}
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

            {registerRole === "doctor" && (
              <TextField
                select
                label="Medical Speciality"
                fullWidth
                margin="normal"
                required
                value={registerSpeciality}
                onChange={(e) => setRegisterSpeciality(e.target.value)}
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
              type={showRegisterPassword ? "text" : "password"}
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
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
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      edge="end"
                    >
                      {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
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
              type={showRegisterConfirmPassword ? "text" : "password"}
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
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
                      onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                      edge="end"
                    >
                      {showRegisterConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              disabled={registerLoading}
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
              {registerLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
