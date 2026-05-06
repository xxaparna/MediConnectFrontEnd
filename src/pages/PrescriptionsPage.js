import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Receipt,
  Medication,
  EventNote,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useAuth } from "../contexts/AuthContext";

const PrescriptionsPage = () => {
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

  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mediconnectToken");
      const endpoint = user?.role === "doctor"
        ? `${NetworkConstants.BASE_URL}/api/doctors/prescriptions`
        : `${NetworkConstants.BASE_URL}/api/patients/prescriptions`;
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrescriptions(res.data);
    } catch (err) {
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

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
          <MenuItem onClick={() => navigate("/appointments")}>
            <Avatar /> Appointments
          </MenuItem>
          <MenuItem onClick={() => navigate("/medicine-reminders")}>
            <Avatar /> Medicine Reminders
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
          Your Prescriptions
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Typography>Loading prescriptions...</Typography>
      )}

      {/* Prescriptions List */}
      {!loading && prescriptions.length === 0 && (
        <Typography>No prescriptions found.</Typography>
      )}

      {!loading && prescriptions.length > 0 && (
        <List>
          {prescriptions.map((presc) => (
            <Paper key={presc._id} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Receipt sx={{ mr: 1, color: '#2563eb' }} />
                <Typography variant="h6" fontWeight="bold">
                  Prescription #{presc._id.slice(-8)}
                </Typography>
              </Box>

              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Problem: {presc.caseId?.description || presc.caseId}
              </Typography>

              <Typography variant="body2" mb={1}>
                <Medication sx={{ mr: 1, verticalAlign: 'middle' }} />
                <strong>Medicines:</strong>
              </Typography>
              <List sx={{ pl: 2 }}>
                {presc.medicines.map((med, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`${med.name} - ${med.dosage} - ${med.frequency}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body2" mb={1}>
                <EventNote sx={{ mr: 1, verticalAlign: 'middle' }} />
                <strong>Routines:</strong>
              </Typography>
              <List sx={{ pl: 2 }}>
                {presc.routines.map((rout, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText primary={`${rout.activity} at ${rout.timing}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PrescriptionsPage;
