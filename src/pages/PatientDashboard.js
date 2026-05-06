// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Typography,
// // //   Box,
// // //   Button,
// // //   TextField,
// // //   Alert,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Paper,
// // //   MenuItem
// // // } from "@mui/material";
// // // import axios from "axios";
// // // import { useAuth } from "../contexts/AuthContext";

// // // const SPECIALITIES = [
// // //   { value: "general", label: "General Physician" },
// // //   { value: "gyanae", label: "Gyanae" },
// // //   { value: "ent", label: "ENT" },
// // //   { value: "physiotherapist", label: "Physiotherapist" },
// // //   { value: "dentist", label: "Dentist" },
// // //   { value: "ortho", label: "Ortho" },
// // //   { value: "derma", label: "Derma" },
// // // ];

// // // const PatientDashboard = () => {
// // //   const { user, logout } = useAuth();

// // //   const [problemType, setProblemType] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [duration, setDuration] = useState("");
// // //   const [notes, setNotes] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");
// // //   const [prescriptions, setPrescriptions] = useState([]);

// // //   const fetchPrescriptions = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/patients/prescriptions");
// // //       setPrescriptions(res.data);
// // //     } catch (err) {
// // //       setError("Failed to load prescriptions");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPrescriptions();
// // //   }, []);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");
// // //     if (!problemType || !description || !duration) {
// // //       setError("Problem type, description, and duration are required");
// // //       return;
// // //     }
// // //     try {
// // //       await axios.post("http://localhost:5000/api/patients/problems", {
// // //         problemType,
// // //         description,
// // //         duration,
// // //         notes,
// // //       });
// // //       setSuccess("Problem submitted successfully");
// // //       setProblemType("");
// // //       setDescription("");
// // //       setDuration("");
// // //       setNotes("");
// // //       fetchPrescriptions();
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to submit problem");
// // //     }
// // //   };

// // //   return (
// // //     <Box>
// // //       <Typography variant="h4" mb={2}>
// // //         Welcome, {user.name} (Patient)
// // //       </Typography>

// // //       <Button variant="outlined" color="error" sx={{ mb: 3 }} onClick={logout}>
// // //         Logout
// // //       </Button>

// // //       <Typography variant="h6" mb={1}>
// // //         Submit a Medical Problem
// // //       </Typography>
// // //       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
// // //       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
// // //       <Box component="form" onSubmit={handleSubmit} mb={4}>
// // //         <TextField
// // //           select
// // //           label="Problem Type"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={problemType}
// // //           onChange={(e) => setProblemType(e.target.value)}
// // //         >
// // //           {SPECIALITIES.map((option) => (
// // //             <MenuItem key={option.value} value={option.value}>
// // //               {option.label}
// // //             </MenuItem>
// // //           ))}
// // //         </TextField>
// // //         <TextField
// // //           label="Problem Description"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={description}
// // //           onChange={(e) => setDescription(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Duration"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={duration}
// // //           onChange={(e) => setDuration(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Additional Notes"
// // //           fullWidth
// // //           multiline
// // //           rows={3}
// // //           margin="normal"
// // //           value={notes}
// // //           onChange={(e) => setNotes(e.target.value)}
// // //         />
// // //         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
// // //           Submit Problem
// // //         </Button>
// // //       </Box>

// // //       <Typography variant="h6" mb={1}>
// // //         Your Prescriptions
// // //       </Typography>
// // //       {prescriptions.length === 0 && <Typography>No prescriptions yet.</Typography>}
// // //       <List>
// // //         {prescriptions.map((presc) => (
// // //           <Paper key={presc._id} sx={{ mb: 2, p: 2 }}>
// // //             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
// // //               Prescription for Problem Case: {presc.caseId}
// // //             </Typography>
// // //             <Typography variant="body2" mb={1}>
// // //               Medicines:
// // //             </Typography>
// // //             <List sx={{ pl: 2 }}>
// // //               {presc.medicines.map((med, index) => (
// // //                 <ListItem key={index} sx={{ pl: 0 }}>
// // //                   <ListItemText
// // //                     primary={`${med.name} - ${med.dosage} - ${med.frequency}`}
// // //                   />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //             <Typography variant="body2" mb={1}>
// // //               Routines:
// // //             </Typography>
// // //             <List sx={{ pl: 2 }}>
// // //               {presc.routines.map((rout, index) => (
// // //                 <ListItem key={index} sx={{ pl: 0 }}>
// // //                   <ListItemText primary={`${rout.activity} at ${rout.timing}`} />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Paper>
// // //         ))}
// // //       </List>
// // //     </Box>
// // //   );
// // // };

// // // export default PatientDashboard;


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Typography,
// // //   Box,
// // //   Button,
// // //   TextField,
// // //   Alert,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   Paper,
// // //   MenuItem
// // // } from "@mui/material";
// // // import axios from "axios";
// // // import { useAuth } from "../contexts/AuthContext";

// // // const SPECIALITIES = [
// // //   { value: "general", label: "General Physician" },
// // //   { value: "gyanae", label: "Gyanae" },
// // //   { value: "ent", label: "ENT" },
// // //   { value: "physiotherapist", label: "Physiotherapist" },
// // //   { value: "dentist", label: "Dentist" },
// // //   { value: "ortho", label: "Ortho" },
// // //   { value: "derma", label: "Derma" },
// // // ];

// // // const PatientDashboard = () => {
// // //   const { user, logout } = useAuth();

// // //   // Problem submission states
// // //   const [problemType, setProblemType] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [duration, setDuration] = useState("");
// // //   const [notes, setNotes] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");
// // //   const [prescriptions, setPrescriptions] = useState([]);

// // //   // Appointment booking states
// // //   const [doctorId, setDoctorId] = useState("");
// // //   const [appointmentDate, setAppointmentDate] = useState("");
// // //   const [timeSlot, setTimeSlot] = useState("");
// // //   const [appointmentNotes, setAppointmentNotes] = useState("");
// // //   const [appointmentError, setAppointmentError] = useState("");
// // //   const [appointmentSuccess, setAppointmentSuccess] = useState("");
// // //   const [doctors, setDoctors] = useState([]);

// // //   // Fetch prescriptions
// // //   const fetchPrescriptions = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/patients/prescriptions");
// // //       setPrescriptions(res.data);
// // //     } catch (err) {
// // //       setError("Failed to load prescriptions");
// // //     }
// // //   };

// // //   // Fetch doctors for appointment booking
// // //   const fetchDoctors = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/users?role=doctor");
// // //       setDoctors(res.data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch doctors");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPrescriptions();
// // //     fetchDoctors();
// // //   }, []);

// // //   // Handle problem submission
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     setSuccess("");
// // //     if (!problemType || !description || !duration) {
// // //       setError("Problem type, description, and duration are required");
// // //       return;
// // //     }
// // //     try {
// // //       await axios.post("http://localhost:5000/api/patients/problems", {
// // //         problemType,
// // //         description,
// // //         duration,
// // //         notes,
// // //       }, {
// // //         headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` },
// // //       });
// // //       setSuccess("Problem submitted successfully");
// // //       setProblemType("");
// // //       setDescription("");
// // //       setDuration("");
// // //       setNotes("");
// // //       fetchPrescriptions();
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to submit problem");
// // //     }
// // //   };

// // //   // Handle appointment booking submission
// // //   const handleAppointmentSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setAppointmentError("");
// // //     setAppointmentSuccess("");

// // //     if (!doctorId || !appointmentDate || !timeSlot) {
// // //       setAppointmentError("Please fill all required appointment fields");
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(
// // //         "http://localhost:5000/api/appointments/book",
// // //         {
// // //           doctorId,
// // //           appointmentDate,
// // //           timeSlot,
// // //           notes: appointmentNotes,
// // //         },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}`,
// // //           },
// // //         }
// // //       );
// // //       setAppointmentSuccess("Appointment booked successfully");
// // //       setDoctorId("");
// // //       setAppointmentDate("");
// // //       setTimeSlot("");
// // //       setAppointmentNotes("");
// // //     } catch (err) {
// // //       setAppointmentError(err.response?.data?.message || "Failed to book appointment");
// // //     }
// // //   };

// // //   return (
// // //     <Box>
// // //       <Typography variant="h4" mb={2}>
// // //         Welcome, {user.name} (Patient)
// // //       </Typography>

// // //       <Button variant="outlined" color="error" sx={{ mb: 3 }} onClick={logout}>
// // //         Logout
// // //       </Button>

// // //       {/* Problem Submission Form */}
// // //       <Typography variant="h6" mb={1}>
// // //         Submit a Medical Problem
// // //       </Typography>
// // //       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
// // //       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
// // //       <Box component="form" onSubmit={handleSubmit} mb={4}>
// // //         <TextField
// // //           select
// // //           label="Problem Type"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={problemType}
// // //           onChange={(e) => setProblemType(e.target.value)}
// // //         >
// // //           {SPECIALITIES.map((option) => (
// // //             <MenuItem key={option.value} value={option.value}>
// // //               {option.label}
// // //             </MenuItem>
// // //           ))}
// // //         </TextField>
// // //         <TextField
// // //           label="Problem Description"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={description}
// // //           onChange={(e) => setDescription(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Duration"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={duration}
// // //           onChange={(e) => setDuration(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Additional Notes"
// // //           fullWidth
// // //           multiline
// // //           rows={3}
// // //           margin="normal"
// // //           value={notes}
// // //           onChange={(e) => setNotes(e.target.value)}
// // //         />
// // //         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
// // //           Submit Problem
// // //         </Button>
// // //       </Box>

// // //       {/* Appointment Booking Form */}
// // //       <Typography variant="h6" mb={1} mt={4}>
// // //         Book an Appointment
// // //       </Typography>
// // //       {appointmentError && <Alert severity="error" sx={{ mb: 2 }}>{appointmentError}</Alert>}
// // //       {appointmentSuccess && <Alert severity="success" sx={{ mb: 2 }}>{appointmentSuccess}</Alert>}
// // //       <Box component="form" onSubmit={handleAppointmentSubmit} mb={4}>
// // //         <TextField
// // //           select
// // //           label="Select Doctor"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={doctorId}
// // //           onChange={(e) => setDoctorId(e.target.value)}
// // //         >
// // //           {doctors.map((doc) => (
// // //             <MenuItem key={doc._id} value={doc._id}>
// // //               {doc.name} ({doc.speciality})
// // //             </MenuItem>
// // //           ))}
// // //         </TextField>
// // //         <TextField
// // //           label="Appointment Date"
// // //           type="date"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           InputLabelProps={{ shrink: true }}
// // //           value={appointmentDate}
// // //           onChange={(e) => setAppointmentDate(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Time Slot"
// // //           placeholder="10:00 AM - 10:30 AM"
// // //           fullWidth
// // //           required
// // //           margin="normal"
// // //           value={timeSlot}
// // //           onChange={(e) => setTimeSlot(e.target.value)}
// // //         />
// // //         <TextField
// // //           label="Additional Notes"
// // //           fullWidth
// // //           multiline
// // //           rows={3}
// // //           margin="normal"
// // //           value={appointmentNotes}
// // //           onChange={(e) => setAppointmentNotes(e.target.value)}
// // //         />
// // //         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
// // //           Book Appointment
// // //         </Button>
// // //       </Box>

// // //       {/* Prescriptions Display */}
// // //       <Typography variant="h6" mb={1}>
// // //         Your Prescriptions
// // //       </Typography>
// // //       {prescriptions.length === 0 && <Typography>No prescriptions yet.</Typography>}
// // //       <List>
// // //         {prescriptions.map((presc) => (
// // //           <Paper key={presc._id} sx={{ mb: 2, p: 2 }}>
// // //             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
// // //               Prescription for Problem Case: {presc.caseId}
// // //             </Typography>
// // //             <Typography variant="body2" mb={1}>
// // //               Medicines:
// // //             </Typography>
// // //             <List sx={{ pl: 2 }}>
// // //               {presc.medicines.map((med, index) => (
// // //                 <ListItem key={index} sx={{ pl: 0 }}>
// // //                   <ListItemText
// // //                     primary={`${med.name} - ${med.dosage} - ${med.frequency}`}
// // //                   />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //             <Typography variant="body2" mb={1}>
// // //               Routines:
// // //             </Typography>
// // //             <List sx={{ pl: 2 }}>
// // //               {presc.routines.map((rout, index) => (
// // //                 <ListItem key={index} sx={{ pl: 0 }}>
// // //                   <ListItemText primary={`${rout.activity} at ${rout.timing}`} />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Paper>
// // //         ))}
// // //       </List>
// // //     </Box>
// // //   );
// // // };

// // // export default PatientDashboard;



// // import React, { useState, useEffect } from "react";
// // import {
// //   Typography,
// //   Box,
// //   Button,
// //   TextField,
// //   Alert,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Paper,
// //   MenuItem,
// // } from "@mui/material";
// // import axios from "axios";
// // import { useAuth } from "../contexts/AuthContext";

// // const SPECIALITIES = [
// //   { value: "general", label: "General Physician" },
// //   { value: "gyanae", label: "Gyanae" },
// //   { value: "ent", label: "ENT" },
// //   { value: "physiotherapist", label: "Physiotherapist" },
// //   { value: "dentist", label: "Dentist" },
// //   { value: "ortho", label: "Ortho" },
// //   { value: "derma", label: "Derma" },
// // ];

// // const PatientDashboard = () => {
// //   const { user, logout } = useAuth();

// //   // Problem submission states
// //   const [problemType, setProblemType] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [duration, setDuration] = useState("");
// //   const [notes, setNotes] = useState("");
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [prescriptions, setPrescriptions] = useState([]);

// //   // Appointment booking states
// //   const [doctorId, setDoctorId] = useState("");
// //   const [appointmentDate, setAppointmentDate] = useState("");
// //   const [timeSlot, setTimeSlot] = useState("");
// //   const [appointmentNotes, setAppointmentNotes] = useState("");
// //   const [appointmentError, setAppointmentError] = useState("");
// //   const [appointmentSuccess, setAppointmentSuccess] = useState("");
// //   const [doctors, setDoctors] = useState([]);
// //   const [loadingDoctors, setLoadingDoctors] = useState(true);
// //   const [appointments, setAppointments] = useState([]);


// //   useEffect(() => {
// //   const fetchAppointments = async () => {
// //     try {
// //       const token = localStorage.getItem("mediconnectToken");
// //       const res = await axios.get("http://localhost:5000/api/patients/appointments", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setAppointments(res.data);
// //     } catch (error) {
// //       console.error("Failed to fetch appointments", error);
// //     }
// //   };
// //   fetchAppointments();
// // }, []);

// //   // Fetch prescriptions
// //   const fetchPrescriptions = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/patients/prescriptions");
// //       setPrescriptions(res.data);
// //     } catch (err) {
// //       setError("Failed to load prescriptions");
// //     }
// //   };

// //   // Fetch doctors for appointment booking
// //   const fetchDoctors = async () => {
// //     try {
// //       setLoadingDoctors(true);
// //       const token = localStorage.getItem("mediconnectToken");
// //       const res = await axios.get("http://localhost:5000/api/doctors", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setDoctors(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch doctors", err);
// //       setAppointmentError("Failed to load doctors. Please try again later.");
// //     } finally {
// //       setLoadingDoctors(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPrescriptions();
// //     fetchDoctors();
// //   }, []);

// //   // Handle problem submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setSuccess("");
// //     if (!problemType || !description || !duration) {
// //       setError("Problem type, description, and duration are required");
// //       return;
// //     }
// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/patients/problems",
// //         { problemType, description, duration, notes },
// //         { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
// //       );
// //       setSuccess("Problem submitted successfully");
// //       setProblemType("");
// //       setDescription("");
// //       setDuration("");
// //       setNotes("");
// //       fetchPrescriptions();
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to submit problem");
// //     }
// //   };

// //   // Handle appointment booking submission
// //   const handleAppointmentSubmit = async (e) => {
// //     e.preventDefault();
// //     setAppointmentError("");
// //     setAppointmentSuccess("");

// //     if (!doctorId || !appointmentDate || !timeSlot) {
// //       setAppointmentError("Please fill all required appointment fields");
// //       return;
// //     }

// //     try {
// //       await axios.post(
// //         "http://localhost:5000/api/appointments/book",
// //         { doctorId, appointmentDate, timeSlot, notes: appointmentNotes },
// //         { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
// //       );
// //       setAppointmentSuccess("Appointment booked successfully");
// //       setDoctorId("");
// //       setAppointmentDate("");
// //       setTimeSlot("");
// //       setAppointmentNotes("");
// //     } catch (err) {
// //       setAppointmentError(err.response?.data?.message || "Failed to book appointment");
// //     }
// //   };

// //   return (
// //     <Box>
// //       <Typography variant="h4" mb={2}>
// //         Welcome, {user.name} (Patient)
// //       </Typography>

// //       <Button variant="outlined" color="error" sx={{ mb: 3 }} onClick={logout}>
// //         Logout
// //       </Button>

// //       {/* Problem Submission Form */}
// //       <Typography variant="h6" mb={1}>
// //         Submit a Medical Problem
// //       </Typography>
// //       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
// //       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
// //       <Box component="form" onSubmit={handleSubmit} mb={4}>
// //         <TextField
// //           select
// //           label="Problem Type"
// //           fullWidth
// //           required
// //           margin="normal"
// //           value={problemType}
// //           onChange={(e) => setProblemType(e.target.value)}
// //         >
// //           {SPECIALITIES.map((option) => (
// //             <MenuItem key={option.value} value={option.value}>
// //               {option.label}
// //             </MenuItem>
// //           ))}
// //         </TextField>
// //         <TextField
// //           label="Problem Description"
// //           fullWidth
// //           required
// //           margin="normal"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //         />
// //         <TextField
// //           label="Duration"
// //           fullWidth
// //           required
// //           margin="normal"
// //           value={duration}
// //           onChange={(e) => setDuration(e.target.value)}
// //         />
// //         <TextField
// //           label="Additional Notes"
// //           fullWidth
// //           multiline
// //           rows={3}
// //           margin="normal"
// //           value={notes}
// //           onChange={(e) => setNotes(e.target.value)}
// //         />
// //         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
// //           Submit Problem
// //         </Button>
// //       </Box>

// //       {/* Appointment Booking Form */}
// //       <Typography variant="h6" mb={1} mt={4}>
// //         Book an Appointment
// //       </Typography>
// //       {appointmentError && <Alert severity="error" sx={{ mb: 2 }}>{appointmentError}</Alert>}
// //       {appointmentSuccess && <Alert severity="success" sx={{ mb: 2 }}>{appointmentSuccess}</Alert>}
// //       <Box component="form" onSubmit={handleAppointmentSubmit} mb={4}>
// //         <TextField
// //           select
// //           label="Select Doctor"
// //           fullWidth
// //           required
// //           margin="normal"
// //           value={doctorId}
// //           onChange={(e) => setDoctorId(e.target.value)}
// //           disabled={loadingDoctors}
// //         >
// //           <MenuItem value="">{loadingDoctors ? "Loading doctors..." : "Select Doctor"}</MenuItem>
// //           {doctors.map((doc) => (
// //             <MenuItem key={doc._id} value={doc._id}>
// //               {doc.name} ({doc.speciality})
// //             </MenuItem>
// //           ))}
// //         </TextField>
// //         <TextField
// //           label="Appointment Date"
// //           type="date"
// //           fullWidth
// //           required
// //           margin="normal"
// //           InputLabelProps={{ shrink: true }}
// //           value={appointmentDate}
// //           onChange={(e) => setAppointmentDate(e.target.value)}
// //         />
// //         <TextField
// //           label="Time Slot"
// //           placeholder="10:00 AM - 10:30 AM"
// //           fullWidth
// //           required
// //           margin="normal"
// //           value={timeSlot}
// //           onChange={(e) => setTimeSlot(e.target.value)}
// //         />
// //         <TextField
// //           label="Additional Notes"
// //           fullWidth
// //           multiline
// //           rows={3}
// //           margin="normal"
// //           value={appointmentNotes}
// //           onChange={(e) => setAppointmentNotes(e.target.value)}
// //         />
// //         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
// //           Book Appointment
// //         </Button>
// //       </Box>

// //       {/* Prescriptions Display */}
// //       <Typography variant="h6" mb={1}>
// //         Your Prescriptions
// //       </Typography>
// //       {prescriptions.length === 0 && <Typography>No prescriptions yet.</Typography>}
// //       <List>
// //         {prescriptions.map((presc) => (
// //           <Paper key={presc._id} sx={{ mb: 2, p: 2 }}>
// //             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
// //               Prescription for Problem Case: {presc.caseId}
// //             </Typography>
// //             <Typography variant="body2" mb={1}>
// //               Medicines:
// //             </Typography>
// //             <List sx={{ pl: 2 }}>
// //               {presc.medicines.map((med, index) => (
// //                 <ListItem key={index} sx={{ pl: 0 }}>
// //                   <ListItemText primary={`${med.name} - ${med.dosage} - ${med.frequency}`} />
// //                 </ListItem>
// //               ))}
// //             </List>
// //             <Typography variant="body2" mb={1}>
// //               Routines:
// //             </Typography>
// //             <List sx={{ pl: 2 }}>
// //               {presc.routines.map((rout, index) => (
// //                 <ListItem key={index} sx={{ pl: 0 }}>
// //                   <ListItemText primary={`${rout.activity} at ${rout.timing}`} />
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Paper>
// //         ))}
// //       </List>
// //       {/* Appointments Display (Add below prescriptions) */}
// // <Typography variant="h6" mb={1} mt={4}>
// //   Your Appointments
// // </Typography>
// // {appointments.length === 0 && <Typography>No appointments found.</Typography>}
// // {appointments.map((appt) => (
// //   <div key={appt._id}>
// //     Date: {new Date(appt.appointmentDate).toLocaleDateString()}, Status: {appt.status}
// //   </div>
// // ))}

// //     </Box>
// //   );
// // };

// // export default PatientDashboard;



// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Button,
//   TextField,
//   Alert,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   MenuItem,
//   Avatar,
//   IconButton,
//   Menu,
//   Tooltip,
//   Card,
//   CardContent,
//   Grid,
//   Container,
//   Fab,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   Divider,
// } from "@mui/material";
// import {
//   Person,
//   LocalHospital,
//   Schedule,
//   Healing,
//   MedicalServices,
//   Receipt,
//   CalendarToday,
//   Close as CloseIcon,
//   Medication,
//   EventNote,
//   PersonOutline,
//   ExpandMore,
//   ExpandLess,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// const SPECIALITIES = [
//   { value: "general", label: "General Physician" },
//   { value: "gyanae", label: "Gyanae" },
//   { value: "ent", label: "ENT" },
//   { value: "physiotherapist", label: "Physiotherapist" },
//   { value: "dentist", label: "Dentist" },
//   { value: "ortho", label: "Ortho" },
//   { value: "derma", label: "Derma" },
// ];

// const PatientDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Profile menu state
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   // Action buttons visibility state
//   const [showActions, setShowActions] = useState(false);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//     setShowActions(!showActions);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setShowActions(false);
//   };
//   const goToProfile = () => {
//     navigate("/profile");
//     handleMenuClose();
//   };

//   // Problem states
//   const [problemType, setProblemType] = useState("");
//   const [description, setDescription] = useState("");
//   const [duration, setDuration] = useState("");
//   const [notes, setNotes] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [prescriptions, setPrescriptions] = useState([]);

//   // Appointment states
//   const [doctorId, setDoctorId] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [appointmentNotes, setAppointmentNotes] = useState("");
//   const [appointmentError, setAppointmentError] = useState("");
//   const [appointmentSuccess, setAppointmentSuccess] = useState("");
//   const [doctors, setDoctors] = useState([]);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const [appointments, setAppointments] = useState([]);

//   // Fetch prescriptions
//   const fetchPrescriptions = async () => {
//     try {
//       const token = localStorage.getItem("mediconnectToken");
//       const res = await axios.get("http://localhost:5000/api/patients/prescriptions", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPrescriptions(res.data);
//     } catch (err) {
//       setError("Failed to load prescriptions");
//     }
//   };

//   // Fetch doctors for appointment booking
//   const fetchDoctors = async () => {
//     try {
//       setLoadingDoctors(true);
//       const token = localStorage.getItem("mediconnectToken");
//       const res = await axios.get("http://localhost:5000/api/doctors", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setDoctors(res.data);
//     } catch (err) {
//       setAppointmentError("Failed to load doctors. Please try again later.");
//     } finally {
//       setLoadingDoctors(false);
//     }
//   };

//   // Fetch appointments
//   const fetchAppointments = async () => {
//     try {
//       const token = localStorage.getItem("mediconnectToken");
//       const res = await axios.get("http://localhost:5000/api/patients/appointments", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAppointments(res.data);
//     } catch (err) {
//       console.error("Failed to fetch appointments", err);
//     }
//   };

//   useEffect(() => {
//     fetchPrescriptions();
//     fetchDoctors();
//     fetchAppointments();
//   }, []);

//   // Handle medical problem submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     if (!problemType || !description || !duration) {
//       setError("Problem type, description, and duration are required");
//       return;
//     }
//     try {
//       await axios.post(
//         "http://localhost:5000/api/patients/problems",
//         { problemType, description, duration, notes },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
//       );
//       setSuccess("Problem submitted successfully");
//       setProblemType("");
//       setDescription("");
//       setDuration("");
//       setNotes("");
//       fetchPrescriptions();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit problem");
//     }
//   };

//   // Handle appointment booking
//   const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();
//     setAppointmentError("");
//     setAppointmentSuccess("");

//     if (!doctorId || !appointmentDate || !timeSlot) {
//       setAppointmentError("Please fill all required appointment fields");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/appointments/book",
//         { doctorId, appointmentDate, timeSlot, notes: appointmentNotes },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
//       );
//       setAppointmentSuccess("Appointment booked successfully");
//       setDoctorId("");
//       setAppointmentDate("");
//       setTimeSlot("");
//       setAppointmentNotes("");
//     } catch (err) {
//       setAppointmentError(err.response?.data?.message || "Failed to book appointment");
//     }
//   };

//   return (
//     <Box sx={{ position: "relative", p: 2 }}>
//       {/* Top right corner avatar with dropdown */}
//       <Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", alignItems: "center", gap: 1 }}>
//         {/* Action buttons that appear when profile is clicked */}
//         {showActions && (
//           <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<Receipt />}
//               onClick={() => {
//                 navigate("/prescriptions");
//                 handleMenuClose();
//               }}
//               sx={{
//                 borderColor: '#2563eb',
//                 color: '#2563eb',
//                 '&:hover': {
//                   borderColor: '#1d4ed8',
//                   backgroundColor: 'rgba(37, 99, 235, 0.04)',
//                 }
//               }}
//             >
//               View Prescriptions
//             </Button>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<CalendarToday />}
//               onClick={() => {
//                 navigate("/appointments");
//                 handleMenuClose();
//               }}
//               sx={{
//                 borderColor: '#10b981',
//                 color: '#10b981',
//                 '&:hover': {
//                   borderColor: '#059669',
//                   backgroundColor: 'rgba(16, 185, 129, 0.04)',
//                 }
//               }}
//             >
//               View Appointments
//             </Button>
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<Medication />}
//               onClick={() => {
//                 navigate("/medicine-reminders");
//                 handleMenuClose();
//               }}
//               sx={{
//                 borderColor: '#f59e0b',
//                 color: '#f59e0b',
//                 '&:hover': {
//                   borderColor: '#d97706',
//                   backgroundColor: 'rgba(245, 158, 11, 0.04)',
//                 }
//               }}
//             >
//               Manage Medicine Reminders
//             </Button>
//           </Box>
//         )}

//         <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleMenuOpen}
//             size="large"
//             aria-controls={open ? "account-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             sx={{
//               width: 56,
//               height: 56,
//               backgroundColor: 'rgba(37, 99, 235, 0.1)',
//               border: '2px solid #2563eb',
//               '&:hover': {
//                 backgroundColor: 'rgba(37, 99, 235, 0.2)',
//                 transform: 'scale(1.05)',
//               },
//               transition: 'all 0.2s ease-in-out',
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 48,
//                 height: 48,
//                 fontSize: '1.2rem',
//                 fontWeight: 'bold',
//                 backgroundColor: '#2563eb',
//                 color: 'white'
//               }}
//             >
//               {user.name.charAt(0).toUpperCase()}
//             </Avatar>
//           </IconButton>
//         </Tooltip>
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleMenuClose}
//           PaperProps={{
//             elevation: 0,
//             sx: {
//               mt: 1.5,
//               overflow: "visible",
//               filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//               "& .MuiAvatar-root": {
//                 width: 32,
//                 height: 32,
//                 ml: -0.5,
//                 mr: 1,
//               },
//               "&:before": {
//                 content: '""',
//                 display: "block",
//                 position: "absolute",
//                 top: 0,
//                 right: 14,
//                 width: 10,
//                 height: 10,
//                 bgcolor: "background.paper",
//                 transform: "translateY(-50%) rotate(45deg)",
//                 zIndex: 0,
//               },
//             },
//           }}
//           transformOrigin={{ horizontal: "right", vertical: "top" }}
//           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         >
//           <MenuItem onClick={goToProfile}>
//             <Avatar /> Profile
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               logout();
//               handleMenuClose();
//             }}
//           >
//             <Avatar /> Logout
//           </MenuItem>
//         </Menu>
//       </Box>

//       {/* Main dashboard content */}
//       <Typography variant="h4" mb={2}>
//         Welcome, {user.name} (Patient)
//       </Typography>

//       {/* Medical Problem Submission Form */}
//       <Typography variant="h6" mb={1}>
//         Submit a Medical Problem
//       </Typography>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}
//       {success && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           {success}
//         </Alert>
//       )}
//       <Box component="form" onSubmit={handleSubmit} mb={4}>
//         <TextField
//           select
//           label="Problem Type"
//           fullWidth
//           required
//           margin="normal"
//           value={problemType}
//           onChange={(e) => setProblemType(e.target.value)}
//         >
//           {SPECIALITIES.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Problem Description"
//           fullWidth
//           required
//           margin="normal"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <TextField
//           label="Duration"
//           fullWidth
//           required
//           margin="normal"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//         <TextField
//           label="Additional Notes"
//           fullWidth
//           multiline
//           rows={3}
//           margin="normal"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
//           Submit Problem
//         </Button>
//       </Box>

//       {/* Appointment Booking Form */}
//       <Typography variant="h6" mb={1} mt={4}>
//         Book an Appointment
//       </Typography>
//       {appointmentError && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {appointmentError}
//         </Alert>
//       )}
//       {appointmentSuccess && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           {appointmentSuccess}
//         </Alert>
//       )}
//       <Box component="form" onSubmit={handleAppointmentSubmit} mb={4}>
//         <TextField
//           select
//           label="Select Doctor"
//           fullWidth
//           required
//           margin="normal"
//           value={doctorId}
//           onChange={(e) => setDoctorId(e.target.value)}
//           disabled={loadingDoctors}
//         >
//           <MenuItem value="">{loadingDoctors ? "Loading doctors..." : "Select Doctor"}</MenuItem>
//           {doctors.map((doc) => (
//             <MenuItem key={doc._id} value={doc._id}>
//               {doc.name} ({doc.speciality})
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Appointment Date"
//           type="date"
//           fullWidth
//           required
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           value={appointmentDate}
//           onChange={(e) => setAppointmentDate(e.target.value)}
//         />
//         <TextField
//           label="Time Slot"
//           placeholder="10:00 AM - 10:30 AM"
//           fullWidth
//           required
//           margin="normal"
//           value={timeSlot}
//           onChange={(e) => setTimeSlot(e.target.value)}
//         />
//         <TextField
//           label="Additional Notes"
//           fullWidth
//           multiline
//           rows={3}
//           margin="normal"
//           value={appointmentNotes}
//           onChange={(e) => setAppointmentNotes(e.target.value)}
//         />
//         <Button type="submit" variant="contained" sx={{ mt: 1 }}>
//           Book Appointment
//         </Button>
//       </Box>


//     </Box>
//   );
// };

// export default PatientDashboard;


import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  MenuItem,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Receipt,
  CalendarToday,
  Medication,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useAuth } from "../contexts/AuthContext";

const SPECIALITIES = [
  { value: "general", label: "General Physician" },
  { value: "gyanae", label: "Gyanae" },
  { value: "ent", label: "ENT" },
  { value: "physiotherapist", label: "Physiotherapist" },
  { value: "dentist", label: "Dentist" },
  { value: "ortho", label: "Ortho" },
  { value: "derma", label: "Derma" },
];

const PatientDashboard = () => {
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

  // Problem states
  const [problemType, setProblemType] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  // Appointment states
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");
  const [appointmentError, setAppointmentError] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [appointments, setAppointments] = useState([]);

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/patients/prescriptions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrescriptions(res.data);
    } catch (err) {
      setError("Failed to load prescriptions");
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/doctors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(res.data);
    } catch (err) {
      setAppointmentError("Failed to load doctors. Please try again later.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("mediconnectToken");
      const res = await axios.get(`${NetworkConstants.BASE_URL}/api/patients/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Handle medical problem submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!problemType || !description || !duration) {
      setError("Problem type, description, and duration are required");
      return;
    }
    try {
      await axios.post(
        `${NetworkConstants.BASE_URL}/api/patients/problems`,
        { problemType, description, duration, notes },
        { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
      );
      setSuccess("Problem submitted successfully");
      setProblemType("");
      setDescription("");
      setDuration("");
      setNotes("");
      fetchPrescriptions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit problem");
    }
  };

  // Handle appointment booking
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setAppointmentError("");
    setAppointmentSuccess("");

    if (!doctorId || !appointmentDate || !timeSlot) {
      setAppointmentError("Please fill all required appointment fields");
      return;
    }

    try {
      await axios.post(
        `${NetworkConstants.BASE_URL}/api/appointments/book`,
        { doctorId, appointmentDate, timeSlot, notes: appointmentNotes },
        { headers: { Authorization: `Bearer ${localStorage.getItem("mediconnectToken")}` } }
      );
      setAppointmentSuccess("Appointment booked successfully");
      setDoctorId("");
      setAppointmentDate("");
      setTimeSlot("");
      setAppointmentNotes("");
    } catch (err) {
      setAppointmentError(err.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {/* Top right corner avatar + buttons */}
      <Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", alignItems: "center", gap: 1 }}>
        {/* Action buttons always visible */}
        <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
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
            View Prescriptions
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
            View Appointments
          </Button>
          <Button
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
            Manage Medicine Reminders
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
        Welcome, {user.name} 
      </Typography>

      {/* Medical Problem Submission Form */}
      <Typography variant="h6" mb={1}>
        Submit a Medical Problem
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} mb={4}>
        <TextField
          select
          label="Problem Type"
          fullWidth
          required
          margin="normal"
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
        >
          {SPECIALITIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Problem Description"
          fullWidth
          required
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Duration"
          fullWidth
          required
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <TextField
          label="Additional Notes"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Submit Problem
        </Button>
      </Box>

      {/* Appointment Booking Form */}
      <Typography variant="h6" mb={1} mt={4}>
        Book an Appointment
      </Typography>
      {appointmentError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {appointmentError}
        </Alert>
      )}
      {appointmentSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {appointmentSuccess}
        </Alert>
      )}
      <Box component="form" onSubmit={handleAppointmentSubmit} mb={4}>
        <TextField
          select
          label="Select Doctor"
          fullWidth
          required
          margin="normal"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          disabled={loadingDoctors}
        >
          <MenuItem value="">{loadingDoctors ? "Loading doctors..." : "Select Doctor"}</MenuItem>
          {doctors.map((doc) => (
            <MenuItem key={doc._id} value={doc._id}>
              {doc.name} ({doc.speciality})
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Appointment Date"
          type="date"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        <TextField
          label="Time Slot"
          placeholder="10:00 AM - 10:30 AM"
          fullWidth
          required
          margin="normal"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <TextField
          label="Additional Notes"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={appointmentNotes}
          onChange={(e) => setAppointmentNotes(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
