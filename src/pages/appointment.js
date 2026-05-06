import React, { useState, useEffect } from "react";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";

const AppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

useEffect(() => {
  const token = localStorage.getItem("mediconnectToken");
  axios.get(`${NetworkConstants.BASE_URL}/api/doctors`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setDoctors(res.data))
  .catch(console.error);
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("mediconnectToken");
      await axios.post(`${NetworkConstants.BASE_URL}/api/appointments/book`, {
          doctorId,
          appointmentDate,
          timeSlot,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Appointment booked successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Doctor</label>
        <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d._id} value={d._id}>{d.name} ({d.speciality})</option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />

        <label>Time Slot</label>
        <input type="text" placeholder="10:00 AM - 10:30 AM" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required />

        <label>Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />

        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AppointmentPage;
