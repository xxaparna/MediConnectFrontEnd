// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Alert,
//   Paper,
// } from "@mui/material";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// const DoctorDashboard = () => {
//   const { user, logout } = useAuth();

//   const [problems, setProblems] = useState([]);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "" }]);
//   const [routines, setRoutines] = useState([{ activity: "", timing: "" }]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const fetchProblems = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/doctors/problems");
//       setProblems(res.data);
//     } catch (err) {
//       setError("Failed to load problems");
//     }
//   };

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const handleAddMedicine = () =>
//     setMedicines([...medicines, { name: "", dosage: "", frequency: "" }]);
//   const handleRemoveMedicine = (index) =>
//     setMedicines(medicines.filter((_, i) => i !== index));
//   const handleMedicineChange = (index, field, value) => {
//     const newMeds = [...medicines];
//     newMeds[index][field] = value;
//     setMedicines(newMeds);
//   };

//   const handleAddRoutine = () => setRoutines([...routines, { activity: "", timing: "" }]);
//   const handleRemoveRoutine = (index) => setRoutines(routines.filter((_, i) => i !== index));
//   const handleRoutineChange = (index, field, value) => {
//     const newRouts = [...routines];
//     newRouts[index][field] = value;
//     setRoutines(newRouts);
//   };

//   const handleSubmitPrescription = async () => {
//     setError("");
//     setSuccess("");
//     if (!selectedProblem) {
//       setError("Select a problem case first");
//       return;
//     }
//     // Validate at least one medicine and routine filled
//     if (medicines.length === 0 || medicines.some(m => !m.name || !m.dosage || !m.frequency)) {
//       setError("Please fill all medicine fields");
//       return;
//     }
//     if (routines.length === 0 || routines.some(r => !r.activity || !r.timing)) {
//       setError("Please fill all routine fields");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:5000/api/doctors/prescribe", {
//         caseId: selectedProblem._id,
//         medicines,
//         routines,
//       });
//       setSuccess("Prescription submitted successfully");
//       setSelectedProblem(null);
//       setMedicines([{ name: "", dosage: "", frequency: "" }]);
//       setRoutines([{ activity: "", timing: "" }]);
//       fetchProblems();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit prescription");
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" mb={2}>
//         Welcome, Dr. {user.name}
//       </Typography>
//       <Button variant="outlined" color="error" sx={{ mb: 3 }} onClick={logout}>
//         Logout
//       </Button>

//       <Typography variant="h6" mb={1}>
//         Assigned Medical Problems
//       </Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//       <List sx={{ maxHeight: 300, overflowY: "auto", mb: 3, border: "1px solid #ccc", borderRadius: 1 }}>
//         {problems.length === 0 && (
//           <Typography textAlign="center" p={2}>
//             No pending problems assigned.
//           </Typography>
//         )}
//         {problems.map((p) => (
//           <ListItem
//             key={p._id}
//             button
//             selected={selectedProblem?._id === p._id}
//             onClick={() => setSelectedProblem(p)}
//           >
//             <ListItemText
//               primary={`Patient: ${p.patientId.name}`}
//               secondary={`Problem: ${p.description} | Duration: ${p.duration}`}
//             />
//           </ListItem>
//         ))}
//       </List>

//       {selectedProblem && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Prescription for {selectedProblem.patientId.name}'s Problem
//           </Typography>

//           <Typography variant="subtitle2" gutterBottom>
//             {selectedProblem.description} <br />
//             Notes: {selectedProblem.notes || "None"}
//           </Typography>

//           <Typography variant="subtitle1" mt={2}>
//             Medicines
//           </Typography>
//           {medicines.map((med, i) => (
//             <Box key={i} display="flex" gap={1} mb={1}>
//               <TextField
//                 label="Name"
//                 value={med.name}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "name", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Dosage"
//                 value={med.dosage}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "dosage", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Frequency"
//                 value={med.frequency}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "frequency", e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 color="error"
//                 onClick={() => handleRemoveMedicine(i)}
//                 disabled={medicines.length === 1}
//               >
//                 Remove
//               </Button>
//             </Box>
//           ))}
//           <Button onClick={handleAddMedicine} sx={{ mb: 2 }}>
//             Add Medicine
//           </Button>

//           <Typography variant="subtitle1" mt={2}>
//             Routines
//           </Typography>
//           {routines.map((r, i) => (
//             <Box key={i} display="flex" gap={1} mb={1}>
//               <TextField
//                 label="Activity"
//                 value={r.activity}
//                 required
//                 onChange={(e) => handleRoutineChange(i, "activity", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Timing"
//                 value={r.timing}
//                 required
//                 onChange={(e) => handleRoutineChange(i, "timing", e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 color="error"
//                 onClick={() => handleRemoveRoutine(i)}
//                 disabled={routines.length === 1}
//               >
//                 Remove
//               </Button>
//             </Box>
//           ))}
//           <Button onClick={handleAddRoutine}>Add Routine</Button>

//           <Box mt={3}>
//             <Button variant="contained" onClick={handleSubmitPrescription}>
//               Submit Prescription
//             </Button>
//           </Box>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default DoctorDashboard;


// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Alert,
//   Paper,
// } from "@mui/material";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// const DoctorDashboard = () => {
//   const { user, logout } = useAuth();

//   const [problems, setProblems] = useState([]);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "" }]);
//   const [routines, setRoutines] = useState([{ activity: "", timing: "" }]);
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch assigned problems
//   const fetchProblems = async () => {
//     try {
//       const token = localStorage.getItem("mediconnectToken");
//       const res = await axios.get("http://localhost:5000/api/doctors/problems", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProblems(res.data);
//     } catch (err) {
//       setError("Failed to load problems");
//     }
//   };

//   // Fetch assigned appointments
//   const fetchAppointments = async () => {
//     try {
//       const token = localStorage.getItem("mediconnectToken");
//       const res = await axios.get("http://localhost:5000/api/doctors/appointments", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAppointments(res.data);
//     } catch (err) {
//       setError("Failed to load appointments");
//     }
//   };

//   useEffect(() => {
//     fetchProblems();
//     fetchAppointments();
//   }, []);

//   const handleAddMedicine = () =>
//     setMedicines([...medicines, { name: "", dosage: "", frequency: "" }]);
//   const handleRemoveMedicine = (index) =>
//     setMedicines(medicines.filter((_, i) => i !== index));
//   const handleMedicineChange = (index, field, value) => {
//     const newMeds = [...medicines];
//     newMeds[index][field] = value;
//     setMedicines(newMeds);
//   };

//   const handleAddRoutine = () => setRoutines([...routines, { activity: "", timing: "" }]);
//   const handleRemoveRoutine = (index) => setRoutines(routines.filter((_, i) => i !== index));
//   const handleRoutineChange = (index, field, value) => {
//     const newRouts = [...routines];
//     newRouts[index][field] = value;
//     setRoutines(newRouts);
//   };

//   const handleSubmitPrescription = async () => {
//     setError("");
//     setSuccess("");
//     if (!selectedProblem) {
//       setError("Select a problem case first");
//       return;
//     }
//     if (medicines.length === 0 || medicines.some(m => !m.name || !m.dosage || !m.frequency)) {
//       setError("Please fill all medicine fields");
//       return;
//     }
//     if (routines.length === 0 || routines.some(r => !r.activity || !r.timing)) {
//       setError("Please fill all routine fields");
//       return;
//     }
//     try {
//       const token = localStorage.getItem("mediconnectToken");
//       await axios.post(
//         "http://localhost:5000/api/doctors/prescribe",
//         {
//           caseId: selectedProblem._id,
//           medicines,
//           routines,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Prescription submitted successfully");
//       setSelectedProblem(null);
//       setMedicines([{ name: "", dosage: "", frequency: "" }]);
//       setRoutines([{ activity: "", timing: "" }]);
//       fetchProblems();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit prescription");
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" mb={2}>
//         Welcome, Dr. {user.name}
//       </Typography>
//       <Button variant="outlined" color="error" sx={{ mb: 3 }} onClick={logout}>
//         Logout
//       </Button>

//       {/* Assigned Problems */}
//       <Typography variant="h6" mb={1}>
//         Assigned Medical Problems
//       </Typography>
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
//       <List sx={{ maxHeight: 300, overflowY: "auto", mb: 3, border: "1px solid #ccc", borderRadius: 1 }}>
//         {problems.length === 0 && (
//           <Typography textAlign="center" p={2}>
//             No pending problems assigned.
//           </Typography>
//         )}
//         {problems.map((p) => (
//           <ListItem
//             key={p._id}
//             button
//             selected={selectedProblem?._id === p._id}
//             onClick={() => setSelectedProblem(p)}
//           >
//             <ListItemText
//               primary={`Patient: ${p.patientId.name}`}
//               secondary={`Problem: ${p.description} | Duration: ${p.duration}`}
//             />
//           </ListItem>
//         ))}
//       </List>

//       {/* Prescription Form */}
//       {selectedProblem && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Prescription for {selectedProblem.patientId.name}'s Problem
//           </Typography>
//           <Typography variant="subtitle2" gutterBottom>
//             {selectedProblem.description} <br />
//             Notes: {selectedProblem.notes || "None"}
//           </Typography>

//           <Typography variant="subtitle1" mt={2}>
//             Medicines
//           </Typography>
//           {medicines.map((med, i) => (
//             <Box key={i} display="flex" gap={1} mb={1}>
//               <TextField
//                 label="Name"
//                 value={med.name}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "name", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Dosage"
//                 value={med.dosage}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "dosage", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Frequency"
//                 value={med.frequency}
//                 required
//                 onChange={(e) => handleMedicineChange(i, "frequency", e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 color="error"
//                 onClick={() => handleRemoveMedicine(i)}
//                 disabled={medicines.length === 1}
//               >
//                 Remove
//               </Button>
//             </Box>
//           ))}
//           <Button onClick={handleAddMedicine} sx={{ mb: 2 }}>
//             Add Medicine
//           </Button>

//           <Typography variant="subtitle1" mt={2}>
//             Routines
//           </Typography>
//           {routines.map((r, i) => (
//             <Box key={i} display="flex" gap={1} mb={1}>
//               <TextField
//                 label="Activity"
//                 value={r.activity}
//                 required
//                 onChange={(e) => handleRoutineChange(i, "activity", e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Timing"
//                 value={r.timing}
//                 required
//                 onChange={(e) => handleRoutineChange(i, "timing", e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 color="error"
//                 onClick={() => handleRemoveRoutine(i)}
//                 disabled={routines.length === 1}
//               >
//                 Remove
//               </Button>
//             </Box>
//           ))}
//           <Button onClick={handleAddRoutine}>Add Routine</Button>

//           <Box mt={3}>
//             <Button variant="contained" onClick={handleSubmitPrescription}>
//               Submit Prescription
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       {/* Assigned Appointments */}
//       <Typography variant="h6" mb={1} mt={4}>
//         Assigned Appointments
//       </Typography>
//       {appointments.length === 0 && (
//         <Typography textAlign="center" p={2}>
//           No appointments assigned.
//         </Typography>
//       )}
//       <List sx={{ maxHeight: 300, overflowY: "auto", mb: 3, border: "1px solid #ccc", borderRadius: 1 }}>
//         {appointments.map((appt) => (
//           <ListItem key={appt._id}>
//             <ListItemText
//               primary={`Patient: ${appt.patientId.name}`}
//               secondary={`Date: ${new Date(appt.appointmentDate).toLocaleDateString()} | Time: ${appt.timeSlot}`}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default DoctorDashboard;



import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Alert,
  Paper,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import {
  LocalHospital,
  Schedule,
  Healing,
  Person,
  Receipt,
  CalendarToday,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useAuth } from "../contexts/AuthContext";

const DoctorDashboard = () => {
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
  const goToProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "" }]);
  const [routines, setRoutines] = useState([{ activity: "", timing: "" }]);
  const [appointments, setAppointments] = useState([]);
  const [treatedAppointments, setTreatedAppointments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch assigned problems
  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/doctors/problems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProblems(res.data);
    } catch (err) {
      setError("Failed to load problems");
    }
  };

  // Fetch assigned appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/doctors/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchProblems();
    fetchAppointments();
  }, []);

  const handleAddMedicine = () =>
    setMedicines([...medicines, { name: "", dosage: "", frequency: "" }]);
  const handleRemoveMedicine = (index) =>
    setMedicines(medicines.filter((_, i) => i !== index));
  const handleMedicineChange = (index, field, value) => {
    const newMeds = [...medicines];
    newMeds[index][field] = value;
    setMedicines(newMeds);
  };

  const handleAddRoutine = () => setRoutines([...routines, { activity: "", timing: "" }]);
  const handleRemoveRoutine = (index) => setRoutines(routines.filter((_, i) => i !== index));
  const handleRoutineChange = (index, field, value) => {
    const newRouts = [...routines];
    newRouts[index][field] = value;
    setRoutines(newRouts);
  };

  const handleSubmitPrescription = async () => {
    setError("");
    setSuccess("");
    if (!selectedProblem) {
      setError("Select a problem case first");
      return;
    }
    if (medicines.length === 0 || medicines.some(m => !m.name || !m.dosage || !m.frequency)) {
      setError("Please fill all medicine fields");
      return;
    }
    if (routines.length === 0 || routines.some(r => !r.activity || !r.timing)) {
      setError("Please fill all routine fields");
      return;
    }
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.post(
        `${NetworkConstants.BASE_URL}/api/doctors/prescribe`,
        {
          caseId: selectedProblem._id,
          medicines,
          routines,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Prescription submitted successfully");
      setSelectedProblem(null);
      setMedicines([{ name: "", dosage: "", frequency: "" }]);
      setRoutines([{ activity: "", timing: "" }]);
      fetchProblems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit prescription");
    }
  };

  const handleMarkAsTreated = async (caseId) => {
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.post(
        `${NetworkConstants.BASE_URL}/api/doctors/mark-treated`,
        { caseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Patient marked as treated successfully");
      fetchProblems();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark patient as treated");
    }
  };

  const handleApproveAppointment = async (apptId) => {
    setError("");
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.patch(
        `${NetworkConstants.BASE_URL}/api/doctors/appointments/${apptId}/status`,
        { status: "approved" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      setError("Failed to approve appointment");
    }
  };

  // Fetch treated appointments
  const fetchTreatedAppointments = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/doctors/treated-appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreatedAppointments(res.data);
    } catch (err) {
      setError("Failed to load treated appointments");
    }
  };

  // Mark appointment as treated
  const handleMarkAppointmentAsTreated = async (appointmentId) => {
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.post(
        `${NetworkConstants.BASE_URL}/api/doctors/mark-appointment-treated`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Appointment marked as treated successfully");
      fetchAppointments();
      fetchTreatedAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to mark appointment as treated");
    }
  };

  useEffect(() => {
    fetchProblems();
    fetchAppointments();
    fetchTreatedAppointments();
  }, []);

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {/* Top right corner avatar + buttons */}
      <Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", alignItems: "center", gap: 1 }}>
        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
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
            View Appointments
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LocalHospital />}
            onClick={() => navigate("/prescriptions")}
            sx={{
              borderColor: '#f59e0b',
              color: '#f59e0b',
              '&:hover': {
                borderColor: '#d97706',
                backgroundColor: 'rgba(245, 158, 11, 0.04)',
              }
            }}
          >
            View Prescriptions
          </Button>
        </Box>

        {/* Avatar with menu */}
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
          <Divider />
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

      {/* Main dashboard content */}
      <Typography variant="h4" mb={2}>
        Welcome, Dr. {user.name}
      </Typography>

      {/* Assigned Problems */}
      <Typography variant="h6" mb={1}>
        Assigned Medical Problems
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Grid container spacing={2} mb={3}>
        {problems.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(245, 245, 245, 0.8)' }}>
              <Typography>No pending problems assigned.</Typography>
            </Card>
          </Grid>
        )}
        {problems.map((p) => (
          <Grid item xs={12} md={6} key={p._id}>
            <Card
              sx={{
                cursor: 'pointer',
                backgroundColor: selectedProblem?._id === p._id ? 'rgba(37, 99, 235, 0.1)' : 'white',
                border: selectedProblem?._id === p._id ? '2px solid #2563eb' : '1px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.05)',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => setSelectedProblem(p)}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Patient: {p.patientId.name}
                </Typography>
                <Typography variant="body2">
                  Problem: {p.description}
                </Typography>
                <Typography variant="body2">
                  Duration: {p.duration}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Prescription Form */}
      {selectedProblem && (
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Prescription for {selectedProblem.patientId.name}'s Problem
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {selectedProblem.description} <br />
            Notes: {selectedProblem.notes || "None"}
          </Typography>

          <Typography variant="subtitle1" mt={2}>
            Medicines
          </Typography>
          {medicines.map((med, i) => (
            <Box key={i} display="flex" gap={1} mb={1}>
              <TextField
                label="Name"
                value={med.name}
                required
                onChange={(e) => handleMedicineChange(i, "name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Dosage"
                value={med.dosage}
                required
                onChange={(e) => handleMedicineChange(i, "dosage", e.target.value)}
                fullWidth
              />
              <TextField
                label="Frequency"
                value={med.frequency}
                required
                onChange={(e) => handleMedicineChange(i, "frequency", e.target.value)}
                fullWidth
              />
              <Button
                color="error"
                onClick={() => handleRemoveMedicine(i)}
                disabled={medicines.length === 1}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddMedicine} sx={{ mb: 2 }}>
            Add Medicine
          </Button>

          <Typography variant="subtitle1" mt={2}>
            Routines
          </Typography>
          {routines.map((r, i) => (
            <Box key={i} display="flex" gap={1} mb={1}>
              <TextField
                label="Activity"
                value={r.activity}
                required
                onChange={(e) => handleRoutineChange(i, "activity", e.target.value)}
                fullWidth
              />
              <TextField
                label="Timing"
                value={r.timing}
                required
                onChange={(e) => handleRoutineChange(i, "timing", e.target.value)}
                fullWidth
              />
              <Button
                color="error"
                onClick={() => handleRemoveRoutine(i)}
                disabled={routines.length === 1}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddRoutine}>Add Routine</Button>

          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" onClick={handleSubmitPrescription}>
              Submit Prescription
            </Button>
            {selectedProblem.status === "prescribed" && (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleMarkAsTreated(selectedProblem._id)}
              >
                Mark as Treated
              </Button>
            )}
          </Box>
        </Card>
      )}

      {/* Assigned Appointments */}
      <Typography variant="h6" mb={1} mt={4}>
        Assigned Appointments
      </Typography>
      <Grid container spacing={2}>
        {appointments.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(245, 245, 245, 0.8)' }}>
              <Typography>No appointments assigned.</Typography>
            </Card>
          </Grid>
        )}
        {appointments.map((appt) => (
          <Grid item xs={12} md={6} key={appt._id}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Patient: {appt.patientId.name}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(appt.appointmentDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Time: {appt.timeSlot}
                </Typography>
                <Typography variant="body2">
                  Status: {appt.status}
                </Typography>
                {appt.status === "pending" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApproveAppointment(appt._id)}
                    sx={{ mt: 1 }}
                  >
                    Approve
                  </Button>
                )}
                {appt.status === "approved" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleMarkAppointmentAsTreated(appt._id)}
                    sx={{ mt: 1 }}
                  >
                    Mark as Treated
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Patients Treated Section */}
      <Typography variant="h6" mb={1} mt={4}>
        Patients Treated
      </Typography>
      <Grid container spacing={2}>
        {treatedAppointments.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(245, 245, 245, 0.8)' }}>
              <Typography>No patients treated yet.</Typography>
            </Card>
          </Grid>
        )}
        {treatedAppointments.map((appt) => (
          <Grid item xs={12} md={6} key={appt._id}>
            <Card sx={{ p: 2, backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" color="#059669">
                  Patient: {appt.patientId.name}
                </Typography>
                <Typography variant="body2" color="#059669">
                  Date: {new Date(appt.appointmentDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="#059669">
                  Time: {appt.timeSlot}
                </Typography>
                <Typography variant="body2" color="#059669">
                  Status: Treated ✅
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;
