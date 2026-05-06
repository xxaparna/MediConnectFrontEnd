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
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Grid,
  Avatar,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  CheckCircle,
  Add,
  ArrowBack,
  Medication,
  Schedule,
  Person,
  EventAvailable,
  EventBusy,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MedicineReminder = () => {
  const { user } = useAuth();
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
  const goToProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const [reminders, setReminders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    medicineName: "",
    dosage: "",
    times: "",
    startDate: "",
    endDate: ""
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/patients/medicine-reminders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReminders(res.data);
    } catch (err) {
      setMsg({ type: "error", text: "Failed to load reminders." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const timesArray = form.times.split(",").map(t => t.trim());
      const reminderData = { ...form, times: timesArray };

      await axios.post(`${NetworkConstants.BASE_URL}/api/patients/medicine-reminders`, reminderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMsg({ type: "success", text: "Reminder created successfully." });
      setDialogOpen(false);
      setForm({ medicineName: "", dosage: "", times: "", startDate: "", endDate: "" });
      fetchReminders();
    } catch (err) {
      setMsg({ type: "error", text: "Failed to create reminder." });
    }
  };

  const markAsTaken = async (id) => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.put(`${NetworkConstants.BASE_URL}/api/patients/medicine-reminders/${id}`, {
        $push: { takenDates: new Date() }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchReminders();
    } catch (err) {
      setMsg({ type: "error", text: "Failed to mark as taken." });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "Missed": return "error";
      default: return "primary";
    }
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {/* Top right corner avatar with dropdown */}
      <Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleMenuOpen}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
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
              {user.name.charAt(0).toUpperCase()}
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
          <MenuItem onClick={goToProfile}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/")}>
            <Avatar /> Dashboard
          </MenuItem>
          <MenuItem onClick={() => navigate("/prescriptions")}>
            <Avatar /> Prescriptions
          </MenuItem>
          <MenuItem onClick={() => navigate("/appointments")}>
            <Avatar /> Appointments
          </MenuItem>
        </Menu>
      </Box>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4">
          Medicine Reminders
        </Typography>
      </Box>

      {/* Success/Error Messages */}
      {msg.text && (
        <Alert severity={msg.type} sx={{ mb: 2 }}>
          {msg.text}
        </Alert>
      )}

      {/* Add Reminder Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{
            backgroundColor: '#f59e0b',
            '&:hover': {
              backgroundColor: '#d97706',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 12px rgba(245, 158, 11, 0.3)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Add Medicine Reminder
        </Button>
      </Box>

      {/* Loading State */}
      {loading && (
        <Typography>Loading medicine reminders...</Typography>
      )}

      {/* Reminders List */}
      {!loading && reminders.length === 0 && (
        <Paper sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          border: '2px dashed #e2e8f0',
          borderRadius: 2
        }}>
          <Medication sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            No medicine reminders yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Add your first medicine reminder to get started
          </Typography>
        </Paper>
      )}

      {!loading && reminders.length > 0 && (
        <List>
          {reminders.map((reminder) => (
            <Paper
              key={reminder._id}
              sx={{
                mb: 2,
                p: 3,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                border: '1px solid #f1f5f9',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Medication sx={{ mr: 1, color: '#f59e0b' }} />
                <Typography variant="h6" fontWeight="bold">
                  {reminder.medicineName}
                </Typography>
                <Chip
                  label={reminder.status}
                  color={getStatusColor(reminder.status)}
                  sx={{ ml: 2 }}
                />
              </Box>

              <Typography variant="body1" gutterBottom sx={{ color: '#374151' }}>
                <strong>Dosage:</strong> {reminder.dosage}
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ color: '#374151' }}>
                <Schedule sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18 }} />
                <strong>Times:</strong> {reminder.times.join(", ")}
              </Typography>

              <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                <strong>Duration:</strong> {new Date(reminder.startDate).toLocaleDateString()} to {new Date(reminder.endDate).toLocaleDateString()}
              </Typography>

              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => markAsTaken(reminder._id)}
                  sx={{
                    borderColor: '#10b981',
                    color: '#10b981',
                    '&:hover': {
                      borderColor: '#059669',
                      backgroundColor: 'rgba(16, 185, 129, 0.04)',
                    }
                  }}
                >
                  Mark as Taken
                </Button>
              </ListItemSecondaryAction>
            </Paper>
          ))}
        </List>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          backgroundColor: '#f59e0b',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          <Medication sx={{ mr: 1, verticalAlign: 'middle' }} />
          Add Medicine Reminder
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Medicine Name"
                name="medicineName"
                value={form.medicineName}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    '&:hover fieldset': {
                      borderColor: '#f59e0b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f59e0b',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dosage"
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., 500mg, 2 tablets, 10ml"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    '&:hover fieldset': {
                      borderColor: '#f59e0b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f59e0b',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Times (comma separated)"
                name="times"
                value={form.times}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., 08:00, 14:00, 20:00"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    '&:hover fieldset': {
                      borderColor: '#f59e0b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f59e0b',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    '&:hover fieldset': {
                      borderColor: '#f59e0b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f59e0b',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    '&:hover fieldset': {
                      borderColor: '#f59e0b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f59e0b',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#f59e0b',
              '&:hover': {
                backgroundColor: '#d97706',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 12px rgba(245, 158, 11, 0.3)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Create Reminder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicineReminder;
