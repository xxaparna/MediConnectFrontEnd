import React, { useState, useEffect } from "react";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Alert,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Chip,
  Container,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Person,
  Edit,
  Save,
  Cancel,
  LocalHospital,
  Schedule,
  Medication,
  Receipt,
  CalendarToday,
  Close as CloseIcon,
  PersonOutline,
  MedicalServices,
  EventNote,
  Healing,
  Work,
  School,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const genders = ["male", "female", "other"];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const goToDashboard = () => {
    navigate(user?.role === "doctor" ? "/" : "/patient");
    handleMenuClose();
  };

  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [problems, setProblems] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [treatedAppointments, setTreatedAppointments] = useState([]);

  const isDoctor = user?.role === "doctor";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("mediconnectToken");
        const endpoint = isDoctor ? `${NetworkConstants.BASE_URL}/api/doctors/profile` : `${NetworkConstants.BASE_URL}/api/patients/profile`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        setMsg({ type: "error", text: "Failed to load profile." });
      }
    };

    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("mediconnectToken");
        const endpoint = isDoctor ? `${NetworkConstants.BASE_URL}/api/doctors/treated-problems` : `${NetworkConstants.BASE_URL}/api/patients/problems`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProblems(res.data);
      } catch (err) {
        console.error("Failed to load problems", err);
      }
    };

    const fetchReminders = async () => {
      if (!isDoctor) {
        try {
          const token = localStorage.getItem("mediconnectToken");
          const res = await axios.get(`${NetworkConstants.BASE_URL}/api/patients/medicine-reminders`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setReminders(res.data);
        } catch (err) {
          console.error("Failed to load reminders", err);
        }
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("mediconnectToken");
        const endpoint = isDoctor ? `${NetworkConstants.BASE_URL}/api/doctors/prescriptions` : `${NetworkConstants.BASE_URL}/api/patients/prescriptions`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPrescriptions(res.data);
      } catch (err) {
        console.error("Failed to load prescriptions", err);
      }
    };

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("mediconnectToken");
        const endpoint = isDoctor ? `${NetworkConstants.BASE_URL}/api/doctors/appointments` : `${NetworkConstants.BASE_URL}/api/patients/appointments`;
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };

    const fetchTreatedAppointments = async () => {
      if (isDoctor) {
        try {
          const token = localStorage.getItem("mediconnectToken");
          const res = await axios.get(`${NetworkConstants.BASE_URL}/api/doctors/treated-appointments`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTreatedAppointments(res.data);
        } catch (err) {
          console.error("Failed to load treated appointments", err);
        }
      }
    };

    fetchProfile();
    fetchProblems();
    fetchReminders();
    fetchPrescriptions();
    fetchAppointments();
    fetchTreatedAppointments();
  }, [isDoctor]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const endpoint = isDoctor ? `${NetworkConstants.BASE_URL}/api/doctors/profile` : `${NetworkConstants.BASE_URL}/api/patients/profile`;
      const res = await axios.put(endpoint, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setMsg({ type: "success", text: "Profile updated." });
      setEdit(false);
    } catch (err) {
      setMsg({ type: "error", text: "Update failed." });
    }
  };

  if (!profile) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <Typography variant="h6" color="text.secondary">Loading profile...</Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header with Avatar and Navigation */}
      <Box sx={{ position: "relative", mb: 4 }}>
        <Box sx={{ position: "absolute", right: 0, top: 0, display: "flex", alignItems: "center", gap: 2 }}>
          {/* Quick Action Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Receipt />}
              onClick={() => navigate("/prescriptions")}
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                '&:hover': {
                  borderColor: '#1d4ed8',
                  backgroundColor: 'rgba(37, 99, 235, 0.04)',
                }
              }}
            >
              Prescriptions
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CalendarToday />}
              onClick={() => navigate("/appointments")}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                '&:hover': {
                  borderColor: '#059669',
                  backgroundColor: 'rgba(16, 185, 129, 0.04)',
                }
              }}
            >
              Appointments
            </Button>
            {/* <Button
              variant="outlined"
              size="small"
              startIcon={<Medication />}
              onClick={() => navigate("/medicine-reminders")}
              sx={{
                borderColor: '#f59e0b',
                color: '#f59e0b',
                '&:hover': {
                  borderColor: '#d97706',
                  backgroundColor: 'rgba(245, 158, 11, 0.04)',
                }
              }}
            >
              {/* Reminders */}
            
          </Box>

          {/* Profile Avatar */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleMenuOpen}
              size="large"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                border: '2px solid #2563eb',
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  backgroundColor: '#2563eb',
                  color: 'white'
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={goToDashboard}>
              <Avatar /> Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                handleMenuClose();
              }}
            >
              <Avatar /> Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Page Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1e293b' }}>
          {isDoctor ? "Doctor Profile" : "Patient Profile"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {isDoctor
            ? "Manage your professional information and view your medical practice data"
            : "Manage your personal information and view your medical history"
          }
        </Typography>
      </Box>

      {/* Alert Messages */}
      {msg.text && (
        <Alert
          severity={msg.type}
          sx={{
            mb: 3,
            borderRadius: 2,
            '&.MuiAlert-standardSuccess': {
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#047857',
            },
            '&.MuiAlert-standardError': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#dc2626',
            }
          }}
        >
          {msg.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Information Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mr: 2,
                    backgroundColor: '#2563eb',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isDoctor ? `Doctor ID: ${profile._id?.slice(-8)}` : `Patient ID: ${profile._id?.slice(-8)}`}
                  </Typography>
                </Box>
              </Box>

              {!edit ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <PersonOutline sx={{ mr: 2, color: '#2563eb' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Person sx={{ mr: 2, color: '#10b981' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                        Phone
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {profile.phone || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>

                  {isDoctor ? (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                        <Work sx={{ mr: 2, color: '#8b5cf6' }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                            Specialization
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {profile.specialization || "Not provided"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                        <School sx={{ mr: 2, color: '#f59e0b' }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                            Experience
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {profile.experience ? `${profile.experience} years` : "Not provided"}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                        <Schedule sx={{ mr: 2, color: '#8b5cf6' }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                            Age
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {profile.age ? `${profile.age} years` : "Not provided"}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                        <MedicalServices sx={{ mr: 2, color: '#f59e0b' }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                            Gender
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : "Not provided"}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}

                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setEdit(true)}
                    sx={{
                      mt: 2,
                      backgroundColor: '#2563eb',
                      '&:hover': {
                        backgroundColor: '#1d4ed8',
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Name"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2563eb',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: '#2563eb',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                        },
                      },
                    }}
                  />
                  {isDoctor ? (
                    <>
                      <TextField
                        label="Specialization"
                        name="specialization"
                        value={form.specialization || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                        }}
                      />
                      <TextField
                        label="Experience (years)"
                        name="experience"
                        type="number"
                        value={form.experience || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={form.age || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                        }}
                      />
                      <TextField
                        select
                        label="Gender"
                        name="gender"
                        value={form.gender || ""}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                              borderColor: '#2563eb',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#2563eb',
                            },
                          },
                        }}
                      >
                        {genders.map(g => (
                          <MenuItem value={g} key={g}>
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </MenuItem>
                        ))}
                      </TextField>
                    </>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{
                        backgroundColor: '#10b981',
                        '&:hover': {
                          backgroundColor: '#059669',
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={() => setEdit(false)}
                      sx={{
                        borderColor: '#ef4444',
                        color: '#ef4444',
                        '&:hover': {
                          borderColor: '#dc2626',
                          backgroundColor: 'rgba(239, 68, 68, 0.04)',
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Medical History Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 3,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocalHospital sx={{ mr: 2, color: '#ef4444', fontSize: 28 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {isDoctor ? "Patients Treated" : "Medical History"}
                </Typography>
              </Box>

              {isDoctor && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Practice Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2563eb' }}>
                        {problems.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Problems Treated
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                        {treatedAppointments.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Appointments Completed
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                        {prescriptions.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Prescriptions Given
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {isDoctor ? (
                <>
                  {/* Treated Problems Section */}
                  {problems.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                        Recent Problems Treated
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '300px', overflowY: 'auto' }}>
                        {problems.slice(0, 5).map((problem) => (
                          <Paper
                            key={problem._id}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: '1px solid #f1f5f9',
                              backgroundColor: '#f8fafc'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: '#2563eb' }}>
                                  {(problem.patientName || "P").charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                    {problem.patientName || "Patient"}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {problem.problemType}
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip
                                label={problem.problemType}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                  color: '#2563eb',
                                  fontWeight: 500
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {problem.description}
                            </Typography>
                            {problem.notes && (
                              <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#64748b' }}>
                                Notes: {problem.notes}
                              </Typography>
                            )}
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                              Treated on: {new Date(problem.createdAt).toLocaleDateString()}
                            </Typography>
                          </Paper>
                        ))}
                        {problems.length > 5 && (
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                            ... and {problems.length - 5} more problems treated
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {/* Treated Appointments Section */}
                  {treatedAppointments.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                        Recent Appointments Completed
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '300px', overflowY: 'auto' }}>
                        {treatedAppointments.slice(0, 5).map((appointment) => (
                          <Paper
                            key={appointment._id}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              border: '1px solid #f1f5f9',
                              backgroundColor: '#f8fafc'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem', bgcolor: '#10b981' }}>
                                  {(appointment.patientId?.name || "P").charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                    {appointment.patientId?.name || "Patient"}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {appointment.appointmentType}
                                  </Typography>
                                </Box>
                              </Box>
                              <Chip
                                label="Completed"
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                  color: '#10b981',
                                  fontWeight: 500
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {appointment.reason}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                              Completed on: {new Date(appointment.updatedAt).toLocaleDateString()}
                            </Typography>
                          </Paper>
                        ))}
                        {treatedAppointments.length > 5 && (
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                            ... and {treatedAppointments.length - 5} more appointments completed
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )}

                  {problems.length === 0 && treatedAppointments.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Healing sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        No patients treated yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Your treated patients and completed appointments will appear here
                      </Typography>
                    </Box>
                  )}
                </>
              ) : (
                /* Patient Medical History */
                problems.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {problems.map((problem) => (
                      <Paper
                        key={problem._id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '1px solid #f1f5f9',
                          backgroundColor: '#f8fafc'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {problem.problemType}
                          </Typography>
                          <Chip
                            label={problem.duration}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(37, 99, 235, 0.1)',
                              color: '#2563eb',
                              fontWeight: 500
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {problem.description}
                        </Typography>
                        {problem.notes && (
                          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#64748b' }}>
                            Notes: {problem.notes}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Submitted: {new Date(problem.createdAt).toLocaleDateString()}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Healing sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No medical history recorded yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your medical problems will appear here
                    </Typography>
                  </Box>
                )
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Medicine Reminders Card - Only for Patients */}
        {!isDoctor && (
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Medication sx={{ mr: 2, color: '#f59e0b', fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Medicine Reminders
                  </Typography>
                </Box>

                {reminders.length > 0 ? (
                  <Grid container spacing={2}>
                    {reminders.map((reminder) => (
                      <Grid item xs={12} sm={6} md={4} key={reminder._id}>
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid #f1f5f9',
                            backgroundColor: '#ffffff',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                              {reminder.medicineName}
                            </Typography>
                            <Chip
                              label={reminder.dosage}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                color: '#f59e0b',
                                fontWeight: 500
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Times: {reminder.times.join(", ")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Duration: {new Date(reminder.startDate).toLocaleDateString()} - {new Date(reminder.endDate).toLocaleDateString()}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <EventNote sx={{ mr: 1, fontSize: 16, color: '#10b981' }} />
                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 500 }}>
                              Active Reminder
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Schedule sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No medicine reminders set
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your active reminders will appear here
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Profile;
