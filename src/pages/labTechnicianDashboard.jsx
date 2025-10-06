import { useState, useContext } from "react";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Clipboard,
  Video,
  Shield,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  FlaskConical,
  Boxes,
  ClipboardList,
} from "lucide-react";
import "../pages/labTechnicianDashboard.css";
const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard className="diagnosisDashboardPage-icon" /> },
  { name: "Appointments", icon: <CalendarCheck className="diagnosisDashboardPage-icon" /> },
  { name: "Sample Collection", icon: <FlaskConical className="diagnosisDashboardPage-icon" /> },
  { name: "Lab Inventory", icon: <Boxes className="diagnosisDashboardPage-icon" /> },
  { name: "Lab Test Requests", icon: <ClipboardList className="diagnosisDashboardPage-icon" /> },
  { name: "Lab Reports", icon: <FileText className="diagnosisDashboardPage-icon" /> },
  { name: "Technician Profile", icon: <User className="diagnosisDashboardPage-icon" /> },
  { name: "Logout", icon: <LogOut className="diagnosisDashboardPage-icon" /> },
];

const GET_DOCTORDETAILS_API_URL =
  "http://localhost:8080/doctorverfication/get/";
const GET_APPOINTMENTS_API_URL = "http://localhost:8080/Appointment/doctor/";
const LabTechnicianDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [email, setEmail] = useState("anjikadari@gmail.com");
  const { isLoggedIn, isUser, isDoctor, setUser, setDoctor, setLogin } =
    useContext(LoginContext);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigateTo = useNavigate();

  //doctor data fecting from the doctor verification data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${GET_DOCTORDETAILS_API_URL}${email}`);
        const data = await response.json();
        setDoctorProfile(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [email]);

  //doctor appoinment data fetching from the appointment data
  useEffect(() => {
    const fetchDoctorsAppointments = async () => {
      try {
        const response = await fetch(`${GET_APPOINTMENTS_API_URL}${email}`);
        const data = await response.json();
        // Handle both array and object responses
        setDoctorAppointments(data.appointments || data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setDoctorAppointments([]);
      }
    };
    fetchDoctorsAppointments();
  }, [email]);
  useEffect(
    () => {
      console.log("Doctor profile updated:", doctorProfile);
      console.log("Doctor appointments updated:", doctorAppointments);
    },
    [doctorProfile],
    [doctorAppointments]
  );

  const upcomingAppointments = [
    {
      name: "Indhu Yadav",
      time: "5:30 AM",
      type: "Patient",
      date: "04 Apr at 9:40",
    },
    {
      name: "Teju",
      time: "5:30 AM",
      type: "Prescription",
      date: "24 Apr at 2:45",
    },
    {
      name: "Ramesh",
      time: "5:30 AM",
      type: "Insurance",
      date: "19 Apr at 2:05",
    },

    {
      name: "Ramesh",
      time: "5:30 AM",
      type: "Insurance",
      date: "19 Apr at 2:05",
    },
    {
      name: "Sita",
      time: "9:00 AM",
      type: "Cash",
      date: "20 Apr at 10:15",
    },
    {
      name: "Anil",
      time: "11:30 AM",
      type: "Insurance",
      date: "21 Apr at 11:45",
    },
    {
      name: "Priya",
      time: "3:00 PM",
      type: "Online Payment",
      date: "22 Apr at 3:30",
    },
    {
      name: "Kiran",
      time: "1:15 PM",
      type: "Cash",
      date: "23 Apr at 1:20",
    },
  ];

  // const recentUpdates = [
  //   {
  //     name: "Jony",
  //     action: "New prescription created",
  //     date: "May at 9:50 PM",
  //   },
  //   { name: "Raj", action: "Completed teleconsultation", date: "" },
  //   { name: "Tinku", action: "Resolved SOS alert", date: "" },
  // ];

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <div className="diagnosisDashboardPage-dashboard-content">
            <div className="diagnosisDashboardPage-header">
              <h4 className="diagnosisDashboardPage-title">
                VDR - Medical LabTechnician Dashboard Overview
              </h4>
            </div>

            <div className="diagnosisDashboardPage-dashboard-grid">
              <div className="diagnosisDashboardPage-main-column">
                <div className="diagnosisDashboardPage-card appointments-card">
                  <div className="diagnosisDashboardPage-card-header">
                    <h3 className="diagnosisDashboardPage-card-title">Upcoming Appointments</h3>
                    <div className="diagnosisDashboardPage-card-subtitle">Recent Patient</div>
                  </div>

                  <div className="diagnosisDashboardPage-appointment-list">
                    {upcomingAppointments.map((appointment, idx) => (
                      <div key={idx} className="diagnosisDashboardPage-appointment-item">
                        <div className="diagnosisDashboardPage-appointment-info">
                          <div className="diagnosisDashboardPage-appointment-name">
                            {appointment.name}
                          </div>
                          <div className="diagnosisDashboardPage-appointment-type">
                            {appointment.time}, {appointment.type}
                          </div>
                        </div>
                        <div className="diagnosisDashboardPage-appointment-date">
                          <span>{appointment.date}</span>
                          <svg
                            className="diagnosisDashboardPage-arrow-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="diagnosisDashboardPage-services-card">
                  <div className="diagnosisDashboardPage-card-header">
                    <h3 className="diagnosisDashboardPage-card-title">Services by Recent Updates</h3>
                  </div>

                  <div className="diagnosisDashboardPage-update-list">
                    {recentUpdates.map((update, idx) => (
                      <div key={idx} className="diagnosisDashboardPage-update-item">
                        <div>
                          <div className="diagnosisDashboardPage-update-name">{update.name}</div>
                          <div className="diagnosisDashboardPage-update-action">{update.action}</div>
                        </div>
                        <div className="diagnosisDashboardPage-update-date">
                          {update.date || update.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="diagnosisDashboardPage-right-column">
                <div className="diagnosisDashboardPage-quick-actions-card">
                  <div className="diagnosisDashboardPage-card-header">
                    <h3 className="diagnosisDashboardPage-card-title">
                      Quick Actions & Notifications
                    </h3>
                  </div>

                  <div className="diagnosisDashboardPage-card-body">
                    <h3 className="diagnosisDashboardPage-section-title">Upcoming</h3>
                    <div className="diagnosisDashboardPage-action-item">
                      <div className="diagnosisDashboardPage-action-info">
                        <Calendar className="diagnosisDashboardPage-icon" />
                        <span className="diagnosisDashboardPage-action-text">Today at 3:00 PM</span>
                      </div>
                      <svg
                        className="diagnosisDashboardPage-arrow-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <h3 className="diagnosisDashboardPage-section-title">Pending</h3>
                    <div className="diagnosisDashboardPage-action-item">
                      <div className="diagnosisDashboardPage-action-info">
                        <FileText className="diagnosisDashboardPage-icon" />
                        <span className="diagnosisDashboardPage-action-text">
                          New prescription req
                        </span>
                      </div>
                      <svg
                        className="diagnosisDashboardPage-arrow-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <h3 className="diagnosisDashboardPage-section-title">New Requests</h3>
                    <div className="diagnosisDashboardPage-action-item">
                      <div className="diagnosisDashboardPage-action-info">
                        <FileText className="diagnosisDashboardPage-icon" />
                        <span className="diagnosisDashboardPage-action-text">New appointment req</span>
                      </div>
                      <svg
                        className="diagnosisDashboardPage-arrow-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Patients":
        return <Patients />;
      case "Prescriptions":
        return <Prescriptions />;
      case "Teleconsultations":
        return <Teleconsultations />;
      case "Appointments":
        return <Appointments />;
      case "Profile":
        return <Profile />;
      case "Sample Collection":
        return <SampleCollection />;
      case "Lab Inventory":
        return <LabInventory />;
      case "Lab Test Requests":
        return <LabTestRequests />;
      case "Lab Reports":
        return <LabReports />;
      case "Technician Profile":
        return <TechnicianProfile />;
      default:
        return (
          <div className="diagnosisDashboardPage-center-message">
            <p>No services yet this movement.</p>
          </div>
        );
    }
  };

  // Patients component
  const Patients = () => (
    <div className="diagnosisDashboardPage-patients">
      <h3>Patients</h3>

      <div className="diagnosisDashboardPage-card">
        <div className="diagnosisDashboardPage-search">
          <input
            type="text"
            placeholder="Search patients..."
            className="diagnosisDashboardPage-search-input"
          />
        </div>

        <div className="diagnosisDashboardPage-table-container">
          <table className="diagnosisDashboardPage-patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Last Visit</th>
                {/* <th>Status</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Raja Singh</td>
                <td>P-001</td>
                <td>Apr 04, 2025</td>
                {/* <td className="diagnosisDashboardPage-status active">Active</td> */}
                <td>
                  <button className="diagnosisDashboardPage-view-btn">View</button>
                </td>
              </tr>
              <tr>
                <td>Salman</td>
                <td>P-002</td>
                <td>Apr 24, 2025</td>
                {/* <td className="diagnosisDashboardPage-status active">Active</td> */}
                <td>
                  <button className="diagnosisDashboardPage-view-btn">View</button>
                </td>
              </tr>
              <tr>
                <td>Sowmith</td>
                <td>P-003</td>
                <td>Apr 19, 2025</td>
                {/* <td className="diagnosisDashboardPage-status pending">Pending</td> */}
                <td>
                  <button className="diagnosisDashboardPage-view-btn">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="diagnosisDashboardPage-mobile-card">
          <div className="diagnosisDashboardPage-card-item">
            <span className="diagnosisDashboardPage-font-bold">Name:</span> Raju
            <span className="diagnosisDashboardPage-font-bold">ID:</span> P-001
            <span className="diagnosisDashboardPage-font-bold">Last Visit:</span> Apr 04, 2025
            <span className="diagnosisDashboardPage-font-bold">Status:</span> Active
            <button className="diagnosisDashboardPage-view-btn">View</button>
          </div>

          <div className="diagnosisDashboardPage-card-item">
            <span className="diagnosisDashboardPage-font-bold">Name:</span> Raja Singh
            <span className="diagnosisDashboardPage-font-bold">ID:</span> P-002
            <span className="diagnosisDashboardPage-font-bold">Last Visit:</span> Apr 24, 2025
            <span className="diagnosisDashboardPage-font-bold">Status:</span> Active
            <button className="diagnosisDashboardPage-view-btn">View</button>
          </div>

          <div className="diagnosisDashboardPage-card-item">
            <span className="diagnosisDashboardPage-font-bold">Name:</span> Sowmith
            <span className="diagnosisDashboardPage-font-bold">ID:</span> P-003
            <span className="diagnosisDashboardPage-font-bold">Last Visit:</span> Apr 19, 2025
            <span className="diagnosisDashboardPage-font-bold">Status:</span> Pending
            <button className="diagnosisDashboardPage-view-btn">View</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Prescriptions component
  const Prescriptions = () => (
    <div className="diagnosisDashboardPage-prescriptions-container">
      <h3 className="diagnosisDashboardPage-prescriptions-title">Prescriptions</h3>

      <div className="diagnosisDashboardPage-prescriptions-card">
        {/* Header: Search + Button */}
        <div className="diagnosisDashboardPage-search-container">
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="diagnosisDashboardPage-search-input"
          />
          <button className="diagnosisDashboardPage-new-prescription-button">New Prescription</button>
        </div>

        {/* Desktop Table */}
        <div className="diagnosisDashboardPage-desktop-table">
          <table className="diagnosisDashboardPage-table">
            <thead className="diagnosisDashboardPage-table-header">
              <tr>
                <th className="diagnosisDashboardPage-table-cell">Patient</th>
                <th className="diagnosisDashboardPage-table-cell">Medication</th>
                <th className="diagnosisDashboardPage-table-cell">Dosage</th>
                <th className="diagnosisDashboardPage-table-cell">Created</th>
                <th className="diagnosisDashboardPage-table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="diagnosisDashboardPage-table-body">
              <tr>
                <td className="diagnosisDashboardPage-table-cell">Indhu yadav</td>
                <td className="diagnosisDashboardPage-table-cell">Amoxicillin</td>
                <td className="diagnosisDashboardPage-table-cell">500mg, 3x daily</td>
                <td className="diagnosisDashboardPage-table-cell">Apr 04, 2025</td>
                <td className="diagnosisDashboardPage-table-cell">
                  <span className="diagnosisDashboardPage-status-active">Active</span>
                </td>
              </tr>
              <tr>
                <td className="diagnosisDashboardPage-table-cell">Teju</td>
                <td className="diagnosisDashboardPage-table-cell">Lisinopril</td>
                <td className="diagnosisDashboardPage-table-cell">10mg, daily</td>
                <td className="diagnosisDashboardPage-table-cell">Apr 24, 2025</td>
                <td className="diagnosisDashboardPage-table-cell">
                  <span className="diagnosisDashboardPage-status-active">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="diagnosisDashboardPage-mobile-cards">
          <div className="diagnosisDashboardPage-card">
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Patient:</span> Indhu yadav
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Medication:</span> Amoxicillin
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Dosage:</span> 500mg, 3x daily
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Created:</span> Apr 04, 2025
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Status:</span>
              <span className="diagnosisDashboardPage-status-active">Active</span>
            </div>
          </div>

          <div className="diagnosisDashboardPage-card">
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Patient:</span> Teju
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Medication:</span> Lisinopril
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Dosage:</span> 10mg, daily
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Created:</span> Apr 24, 2025
            </div>
            <div className="diagnosisDashboardPage-card-info">
              <span className="diagnosisDashboardPage-font-bold">Status:</span>
              <span className="diagnosisDashboardPage-status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Teleconsultations component
  const Teleconsultations = () => (
    <div className="diagnosisDashboardPage-teleconsultations-container">
      <h3 className="diagnosisDashboardPage-teleconsultations-title">Teleconsultations</h3>

      <div className="diagnosisDashboardPage-sessions-container">
        {/* Upcoming Sessions */}
        <div className="diagnosisDashboardPage-sessions-card upcoming-sessions">
          <h2 className="diagnosisDashboardPage-sessions-heading">Upcoming Sessions</h2>
          <div className="diagnosisDashboardPage-session-list">
            <div className="diagnosisDashboardPage-session-item">
              <div className="diagnosisDashboardPage-session-info">
                <div className="diagnosisDashboardPage-session-name">Indhu yadav</div>
                <div className="diagnosisDashboardPage-session-time">04 Apr. at 9:40</div>
              </div>
              <button className="diagnosisDashboardPage-join-button">Join</button>
            </div>
            <div className="diagnosisDashboardPage-session-item">
              <div className="diagnosisDashboardPage-session-info">
                <div className="diagnosisDashboardPage-session-name">Teju</div>
                <div className="diagnosisDashboardPage-session-time">24 Apr. at 2:45</div>
              </div>
              <button className="diagnosisDashboardPage-join-button">Join</button>
            </div>
          </div>
        </div>

        {/* Past Sessions */}
        <div className="diagnosisDashboardPage-sessions-card past-sessions">
          <h2 className="diagnosisDashboardPage-sessions-heading">Past Sessions</h2>
          <div className="diagnosisDashboardPage-session-list">
            <div className="diagnosisDashboardPage-session-item">
              <div className="diagnosisDashboardPage-session-info">
                <div className="diagnosisDashboardPage-session-name">Jony</div>
                <div className="diagnosisDashboardPage-session-time">19 Apr. at 2:05</div>
              </div>
              <button className="diagnosisDashboardPage-view-notes-button">View Notes</button>
            </div>
            <div className="diagnosisDashboardPage-session-item">
              <div className="diagnosisDashboardPage-session-info">
                <div className="diagnosisDashboardPage-session-name">Raj</div>
                <div className="diagnosisDashboardPage-session-time">15 Apr. at 11:30</div>
              </div>
              <button className="diagnosisDashboardPage-view-notes-button">View Notes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Appointments component
  const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentCount, setAppointmentCount] = useState(0);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            ` ${GET_APPOINTMENTS_API_URL}${email}`
          );

          console.log("API Response:", response.data);

          // If appointments are wrapped inside a property
          const appointmentList = Array.isArray(response.data)
            ? response.data
            : response.data.appointments || [];

          setAppointments(appointmentList);
          setAppointmentCount(appointmentList.length);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching appointments:", err);
          setError("Failed to fetch appointments.");
          setLoading(false);
        }
      };

      if (email) {
        fetchAppointments();
      } else {
        setError("Doctor ID not found");
        setLoading(false);
      }
    }, [email]);

    if (loading) return <div>Loading appointments...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="diagnosisDashboardPage-p-4 max-w-4xl mx-auto">
        <h1 className="diagnosisDashboardPage-text-2xl font-bold mb-4">
          Medical Lab Technician Dashboard
        </h1>

        <div className="diagnosisDashboardPage-bg-white shadow rounded p-4 mb-6">
          <h2 className="diagnosisDashboardPage-text-xl font-semibold mb-2">Total Appointments</h2>
          <p className="diagnosisDashboardPage-text-3xl font-bold text-blue-600">{appointmentCount}</p>
        </div>

        <div className="diagnosisDashboardPage-bg-white shadow rounded p-4">
          <h2 className="diagnosisDashboardPage-text-xl font-semibold mb-4">Appointment List</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="diagnosisDashboardPage-space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="diagnosisDashboardPage-border p-4 rounded hover:shadow"
                >
                  <p>
                    <strong>Patient Name:</strong> {appointment.patientName}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  // Profile component
  const Profile = () => (
    <div className="diagnosisDashboardPage-doctor-profile-container">
      <h1 className="diagnosisDashboardPage-doctor-profile-title">Doctor Profile</h1>
      <div className="diagnosisDashboardPage-doctor-card2">
        {/* Header Section */}
        <div className="diagnosisDashboardPage-doctor-header">
          <div className="diagnosisDashboardPage-doctor-header-content">
            <div className="diagnosisDashboardPage-doctor-avatar">
              <img
                src={`data:image/jpeg;base64,${doctorProfile.doctorPhoto}`}
                alt="doctor-image"
                className="diagnosisDashboardPage-docDashboard_doctor-profile_img"
              />
            </div>
            <div className="diagnosisDashboardPage-doctor-info">
              <h2 className="diagnosisDashboardPage-doctor-name">{doctorProfile.fullName}</h2>
              <p className="diagnosisDashboardPage-doctor-role">
                Speciality: {doctorProfile.medicalSpeciality}
              </p>
              <p className="diagnosisDashboardPage-doctor-license">
                License: {doctorProfile.medicalLicenseNumber}
              </p>
            </div>
            <div className="diagnosisDashboardPage-total-right">
              <button className="diagnosisDashboardPage-edit-button">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="diagnosisDashboardPage-doctor-section">
          <h3 className="diagnosisDashboardPage-section-title">Personal Information</h3>
          <div className="diagnosisDashboardPage-info-grid two-column">
            <ul className="diagnosisDashboardPage-Personal-information-Ul-left">
              <li>
                <p className="diagnosisDashboardPage-info-label">Email :</p>
                <p>{doctorProfile.email}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Phone :</p>
                <p>{doctorProfile.mobileNumber}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Gender :</p>
                <p>{doctorProfile.gender}</p>
              </li>
              <li>
                <p className="diagnosisDashboardPage-info-label">Address :</p>
                <p>{doctorProfile.personalAddress}</p>
              </li>
            </ul>
          </div>
        </div>

        <hr className="diagnosisDashboardPage-line" />

        {/* Professional Information */}
        <div className="diagnosisDashboardPage-doctor-section">
          <h3 className="diagnosisDashboardPage-section-title">Professional Information</h3>
          <div className="diagnosisDashboardPage-info-grid two-column">
            <ul className="diagnosisDashboardPage-Personal-information-Ul-left">
              <li>
                <p className="diagnosisDashboardPage-info-label">Medical License No</p>
                <p>{doctorProfile.medicalLicenseNumber}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">License Expiry</p>
                <p>{doctorProfile.medicalLicenseNumberExpiryDate}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Specialization</p>
                <p>{doctorProfile.medicalSpeciality}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Educational Background</p>
                <p>{doctorProfile.educationalBackground}</p>
              </li>
              <li>
                <p className="diagnosisDashboardPage-info-label">Experience</p>
                <p>{doctorProfile.experience} years</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Current Hospital/Clinic</p>
                <p>{doctorProfile.hospitalCurrentWorking}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Clinic/Hospital Name</p>
                <p>{doctorProfile.hospitalOrClinic}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Clinic/Hospital Address</p>
                <p>{doctorProfile.hospitalAddress}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Languages Spoken</p>
                <p>{doctorProfile.launguage}</p>
              </li>
              <li>
                <p className="diagnosisDashboardPage-info-label">Disciplinary Actions</p>
                <p>{doctorProfile.disciplinaryActions || "None"}</p>
              </li>

              <li>
                <p className="diagnosisDashboardPage-info-label">Bio</p>
                <p>{doctorProfile.description || "N/A"}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Schedule */}
        <div className="diagnosisDashboardPage-doctor-section border-top">
          <h3 className="diagnosisDashboardPage-section-title">Schedule & Availability</h3>
          <div className="diagnosisDashboardPage-schedule-grid">
            <div className="diagnosisDashboardPage-schedule-box">
              <p className="diagnosisDashboardPage-schedule-day">Monday - Friday</p>
              <p className="diagnosisDashboardPage-schedule-time">9:00 AM - 5:00 PM</p>
            </div>
            <div className="diagnosisDashboardPage-schedule-box">
              <p className="diagnosisDashboardPage-schedule-day">Saturday</p>
              <p className="diagnosisDashboardPage-schedule-time">10:00 AM - 2:00 PM</p>
            </div>
            <div className="diagnosisDashboardPage-schedule-box">
              <p className="diagnosisDashboardPage-schedule-day">Sunday</p>
              <p className="diagnosisDashboardPage-schedule-time">Closed</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="diagnosisDashboardPage-doctor-section border-top">
          <h3 className="diagnosisDashboardPage-section-title">Account Settings</h3>
          <div className="diagnosisDashboardPage-settings-links">
            <button className="diagnosisDashboardPage-settings-link">Change Password</button>
            <button className="diagnosisDashboardPage-settings-link">Notification Preferences</button>
            <button className="diagnosisDashboardPage-settings-link">Two-Factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  );

  // SampleCollection component
  const SampleCollection = () => {
    const [samples, setSamples] = useState([
      {
        id: "SC001",
        patientName: "Manoj Kumar",
        testType: "Blood Test",
        collectionDate: "May 05, 2025",
        status: "Collected",
        priority: "Normal",
      },
      {
        id: "SC002",
        patientName: "Priya Sharma",
        testType: "Urine Analysis",
        collectionDate: "May 06, 2025",
        status: "Pending",
        priority: "Urgent",
      },
      {
        id: "SC003",
        patientName: "Rahul Singh",
        testType: "Complete Blood Count",
        collectionDate: "May 06, 2025",
        status: "Pending",
        priority: "High",
      },
      {
        id: "SC004",
        patientName: "Deepa Patel",
        testType: "Lipid Profile",
        collectionDate: "May 07, 2025",
        status: "Collected",
        priority: "Normal",
      },
    ]);

    return (
      <div className="diagnosisDashboardPage-sample-collection-container">
        <h3 className="diagnosisDashboardPage-page-title">Sample Collection</h3>

        <div className="diagnosisDashboardPage-card">
          <div className="diagnosisDashboardPage-card-header">
            <div className="diagnosisDashboardPage-search-container">
              <input
                type="text"
                placeholder="Search samples..."
                className="diagnosisDashboardPage-search-input"
              />
              <button className="diagnosisDashboardPage-add-btn">New Sample</button>
            </div>
          </div>

          <div className="diagnosisDashboardPage-table-container">
            <table className="diagnosisDashboardPage-sample-table">
              <thead>
                <tr>
                  <th>Sample ID</th>
                  <th>Patient Name</th>
                  <th>Test Type</th>
                  <th>Collection Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.id}>
                    <td>{sample.id}</td>
                    <td>{sample.patientName}</td>
                    <td>{sample.testType}</td>
                    <td>{sample.collectionDate}</td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-status-badge ${
                          sample.status === "Collected"
                            ? "status-success"
                            : "status-pending"
                        }`}
                      >
                        {sample.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-priority-badge priority-${sample.priority.toLowerCase()}`}
                      >
                        {sample.priority}
                      </span>
                    </td>
                    <td>
                      <button className="diagnosisDashboardPage-action-btn">Collect</button>
                      <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view cards */}
          <div className="diagnosisDashboardPage-mobile-cards">
            {samples.map((sample) => (
              <div key={sample.id} className="diagnosisDashboardPage-mobile-card">
                <div className="diagnosisDashboardPage-card-header">
                  <span className="diagnosisDashboardPage-sample-id">{sample.id}</span>
                  <span
                    className={`diagnosisDashboardPage-status-badge ${
                      sample.status === "Collected"
                        ? "status-success"
                        : "status-pending"
                    }`}
                  >
                    {sample.status}
                  </span>
                </div>
                <div className="diagnosisDashboardPage-card-content">
                  <p>
                    <strong>Patient:</strong> {sample.patientName}
                  </p>
                  <p>
                    <strong>Test:</strong> {sample.testType}
                  </p>
                  <p>
                    <strong>Date:</strong> {sample.collectionDate}
                  </p>
                  <p>
                    <strong>Priority:</strong>
                    <span
                      className={`diagnosisDashboardPage-priority-badge priority-${sample.priority.toLowerCase()}`}
                    >
                      {sample.priority}
                    </span>
                  </p>
                </div>
                <div className="diagnosisDashboardPage-card-actions">
                  <button className="diagnosisDashboardPage-action-btn">Collect</button>
                  <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // LabInventory component
  const LabInventory = () => {
    const [inventory, setInventory] = useState([
      {
        id: "INV001",
        itemName: "Test Tubes",
        category: "Collection",
        quantity: 350,
        threshold: 100,
        lastRestocked: "Apr 15, 2025",
        status: "In Stock",
      },
      {
        id: "INV002",
        itemName: "Latex Gloves",
        category: "Safety",
        quantity: 42,
        threshold: 50,
        lastRestocked: "Apr 20, 2025",
        status: "Low Stock",
      },
      {
        id: "INV003",
        itemName: "HbA1c Reagent",
        category: "Reagent",
        quantity: 15,
        threshold: 5,
        lastRestocked: "Apr 28, 2025",
        status: "In Stock",
      },
      {
        id: "INV004",
        itemName: "Microscope Slides",
        category: "Equipment",
        quantity: 0,
        threshold: 20,
        lastRestocked: "Mar 10, 2025",
        status: "Out of Stock",
      },
    ]);

    const getStatusClass = (status) => {
      switch (status) {
        case "In Stock":
          return "status-success";
        case "Low Stock":
          return "status-warning";
        case "Out of Stock":
          return "status-danger";
        default:
          return "";
      }
    };

    return (
      <div className="diagnosisDashboardPage-lab-inventory-container">
        <h3 className="diagnosisDashboardPage-page-title">Laboratory Inventory</h3>

        <div className="diagnosisDashboardPage-dashboard-summary">
          <div className="diagnosisDashboardPage-summary-card">
            <div className="diagnosisDashboardPage-summary-title">Total Items</div>
            <div className="diagnosisDashboardPage-summary-value">173</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card warning">
            <div className="diagnosisDashboardPage-summary-title">Low Stock</div>
            <div className="diagnosisDashboardPage-summary-value">12</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card danger">
            <div className="diagnosisDashboardPage-summary-title">Out of Stock</div>
            <div className="diagnosisDashboardPage-summary-value">5</div>
          </div>
        </div>

        <div className="diagnosisDashboardPage-card">
          <div className="diagnosisDashboardPage-card-header">
            <div className="diagnosisDashboardPage-search-container">
              <input
                type="text"
                placeholder="Search inventory..."
                className="diagnosisDashboardPage-search-input"
              />
              <div className="diagnosisDashboardPage-action-buttons">
                <button className="diagnosisDashboardPage-add-btn">Add Item</button>
                <button className="diagnosisDashboardPage-restock-btn">Restock</button>
              </div>
            </div>
          </div>

          <div className="diagnosisDashboardPage-table-container">
            <table className="diagnosisDashboardPage-inventory-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                  <th>Last Restocked</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.threshold}</td>
                    <td>{item.lastRestocked}</td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-status-badge ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="diagnosisDashboardPage-action-btn">Update</button>
                      <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view cards */}
          <div className="diagnosisDashboardPage-mobile-cards">
            {inventory.map((item) => (
              <div key={item.id} className="diagnosisDashboardPage-mobile-card">
                <div className="diagnosisDashboardPage-card-header">
                  <span className="diagnosisDashboardPage-item-id">{item.id}</span>
                  <span
                    className={`diagnosisDashboardPage-status-badge ${getStatusClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="diagnosisDashboardPage-card-content">
                  <p>
                    <strong>Item:</strong> {item.itemName}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Threshold:</strong> {item.threshold}
                  </p>
                  <p>
                    <strong>Last Restocked:</strong> {item.lastRestocked}
                  </p>
                </div>
                <div className="diagnosisDashboardPage-card-actions">
                  <button className="diagnosisDashboardPage-action-btn">Update</button>
                  <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // LabTestRequests component
  const LabTestRequests = () => {
    const [testRequests, setTestRequests] = useState([
      {
        id: "TR001",
        patientName: "Amit Kumar",
        physicianName: "Dr. Ravi Desai",
        testType: "Complete Blood Count",
        priority: "Urgent",
        requestDate: "May 05, 2025",
        status: "Pending",
      },
      {
        id: "TR002",
        patientName: "Neha Patel",
        physicianName: "Dr. Sunita Sharma",
        testType: "Liver Function Test",
        priority: "Normal",
        requestDate: "May 05, 2025",
        status: "In Progress",
      },
      {
        id: "TR003",
        patientName: "Rajesh Singh",
        physicianName: "Dr. Ravi Desai",
        testType: "Thyroid Profile",
        priority: "Normal",
        requestDate: "May 06, 2025",
        status: "Pending",
      },
      {
        id: "TR004",
        patientName: "Aarti Gupta",
        physicianName: "Dr. Karan Malhotra",
        testType: "Lipid Profile",
        priority: "High",
        requestDate: "May 06, 2025",
        status: "Completed",
      },
    ]);

    const getStatusClass = (status) => {
      switch (status) {
        case "Pending":
          return "status-pending";
        case "In Progress":
          return "status-progress";
        case "Completed":
          return "status-completed";
        default:
          return "";
      }
    };

    const getPriorityClass = (priority) => {
      switch (priority) {
        case "Urgent":
          return "priority-urgent";
        case "High":
          return "priority-high";
        case "Normal":
          return "priority-normal";
        default:
          return "";
      }
    };

    return (
      <div className="diagnosisDashboardPage-lab-test-requests-container">
        <h3 className="diagnosisDashboardPage-page-title">Lab Test Requests</h3>

        <div className="diagnosisDashboardPage-dashboard-summary">
          <div className="diagnosisDashboardPage-summary-card">
            <div className="diagnosisDashboardPage-summary-title">Total Requests</div>
            <div className="diagnosisDashboardPage-summary-value">24</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card warning">
            <div className="diagnosisDashboardPage-summary-title">Pending</div>
            <div className="diagnosisDashboardPage-summary-value">8</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card progress">
            <div className="diagnosisDashboardPage-summary-title">In Progress</div>
            <div className="diagnosisDashboardPage-summary-value">5</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card completed">
            <div className="diagnosisDashboardPage-summary-title">Completed</div>
            <div className="diagnosisDashboardPage-summary-value">11</div>
          </div>
        </div>

        <div className="diagnosisDashboardPage-card">
          <div className="diagnosisDashboardPage-card-header">
            <div className="diagnosisDashboardPage-search-container">
              <input
                type="text"
                placeholder="Search requests..."
                className="diagnosisDashboardPage-search-input"
              />
              <select className="diagnosisDashboardPage-filter-select">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="diagnosisDashboardPage-table-container">
            <table className="diagnosisDashboardPage-requests-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Patient Name</th>
                  <th>Physician</th>
                  <th>Test Type</th>
                  <th>Priority</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.patientName}</td>
                    <td>{request.physicianName}</td>
                    <td>{request.testType}</td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-priority-badge ${getPriorityClass(
                          request.priority
                        )}`}
                      >
                        {request.priority}
                      </span>
                    </td>
                    <td>{request.requestDate}</td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-status-badge ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>
                      {request.status === "Pending" && (
                        <button className="diagnosisDashboardPage-action-btn">Process</button>
                      )}
                      {request.status === "In Progress" && (
                        <button className="diagnosisDashboardPage-action-btn">Complete</button>
                      )}
                      <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view cards */}
          <div className="diagnosisDashboardPage-mobile-cards">
            {testRequests.map((request) => (
              <div key={request.id} className="diagnosisDashboardPage-mobile-card">
                <div className="diagnosisDashboardPage-card-header">
                  <span className="diagnosisDashboardPage-request-id">{request.id}</span>
                  <span
                    className={`diagnosisDashboardPage-status-badge ${getStatusClass(request.status)}`}
                  >
                    {request.status}
                  </span>
                </div>
                <div className="diagnosisDashboardPage-card-content">
                  <p>
                    <strong>Patient:</strong> {request.patientName}
                  </p>
                  <p>
                    <strong>Physician:</strong> {request.physicianName}
                  </p>
                  <p>
                    <strong>Test:</strong> {request.testType}
                  </p>
                  <p>
                    <strong>Priority:</strong>
                    <span
                      className={`diagnosisDashboardPage-priority-badge ${getPriorityClass(
                        request.priority
                      )}`}
                    >
                      {request.priority}
                    </span>
                  </p>
                  <p>
                    <strong>Date:</strong> {request.requestDate}
                  </p>
                </div>
                <div className="diagnosisDashboardPage-card-actions">
                  {request.status === "Pending" && (
                    <button className="diagnosisDashboardPage-action-btn">Process</button>
                  )}
                  {request.status === "In Progress" && (
                    <button className="diagnosisDashboardPage-action-btn">Complete</button>
                  )}
                  <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // LabReports component
  const LabReports = () => {
    const [reports, setReports] = useState([
      {
        id: "R001",
        patientName: "Vikram Singh",
        testType: "Complete Blood Count",
        collectionDate: "May 03, 2025",
        reportDate: "May 04, 2025",
        referredBy: "Dr. Priya Sharma",
        status: "Completed",
      },
      {
        id: "R002",
        patientName: "Anjali Gupta",
        testType: "Liver Function Test",
        collectionDate: "May 04, 2025",
        reportDate: "May 05, 2025",
        referredBy: "Dr. Raj Kumar",
        status: "Pending Review",
      },
      {
        id: "R003",
        patientName: "Sanjay Patel",
        testType: "Lipid Profile",
        collectionDate: "May 05, 2025",
        reportDate: "May 06, 2025",
        referredBy: "Dr. Anita Desai",
        status: "Completed",
      },
      {
        id: "R004",
        patientName: "Meera Joshi",
        testType: "Thyroid Profile",
        collectionDate: "May 05, 2025",
        reportDate: "Processing",
        referredBy: "Dr. Vikram Thakur",
        status: "Processing",
      },
    ]);

    const getStatusClass = (status) => {
      switch (status) {
        case "Completed":
          return "status-completed";
        case "Pending Review":
          return "status-review";
        case "Processing":
          return "status-processing";
        default:
          return "";
      }
    };

    return (
      <div className="diagnosisDashboardPage-lab-reports-container">
        <h3 className="diagnosisDashboardPage-page-title">Laboratory Reports</h3>

        <div className="diagnosisDashboardPage-dashboard-summary">
          <div className="diagnosisDashboardPage-summary-card">
            <div className="diagnosisDashboardPage-summary-title">Total Reports</div>
            <div className="diagnosisDashboardPage-summary-value">42</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card completed">
            <div className="diagnosisDashboardPage-summary-title">Completed</div>
            <div className="diagnosisDashboardPage-summary-value">32</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card warning">
            <div className="diagnosisDashboardPage-summary-title">Pending Review</div>
            <div className="diagnosisDashboardPage-summary-value">7</div>
          </div>
          <div className="diagnosisDashboardPage-summary-card processing">
            <div className="diagnosisDashboardPage-summary-title">Processing</div>
            <div className="diagnosisDashboardPage-summary-value">3</div>
          </div>
        </div>

        <div className="diagnosisDashboardPage-card">
          <div className="diagnosisDashboardPage-card-header">
            <div className="diagnosisDashboardPage-search-container">
              <input
                type="text"
                placeholder="Search reports..."
                className="diagnosisDashboardPage-search-input"
              />
              <select className="diagnosisDashboardPage-filter-select">
                <option value="all">All Reports</option>
                <option value="completed">Completed</option>
                <option value="pending-review">Pending Review</option>
                <option value="processing">Processing</option>
              </select>
            </div>
          </div>

          <div className="diagnosisDashboardPage-table-container">
            <table className="diagnosisDashboardPage-reports-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Patient Name</th>
                  <th>Test Type</th>
                  <th>Collection Date</th>
                  <th>Report Date</th>
                  <th>Referred By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.patientName}</td>
                    <td>{report.testType}</td>
                    <td>{report.collectionDate}</td>
                    <td>{report.reportDate}</td>
                    <td>{report.referredBy}</td>
                    <td>
                      <span
                        className={`diagnosisDashboardPage-status-badge ${getStatusClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                      <button className="diagnosisDashboardPage-action-btn">Print</button>
                      {report.status === "Pending Review" && (
                        <button className="diagnosisDashboardPage-action-btn">Approve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view cards */}
          <div className="diagnosisDashboardPage-mobile-cards">
            {reports.map((report) => (
              <div key={report.id} className="diagnosisDashboardPage-mobile-card">
                <div className="diagnosisDashboardPage-card-header">
                  <span className="diagnosisDashboardPage-report-id">{report.id}</span>
                  <span
                    className={`diagnosisDashboardPage-status-badge ${getStatusClass(report.status)}`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="diagnosisDashboardPage-card-content">
                  <p>
                    <strong>Patient:</strong> {report.patientName}
                  </p>
                  <p>
                    <strong>Test:</strong> {report.testType}
                  </p>
                  <p>
                    <strong>Collection Date:</strong> {report.collectionDate}
                  </p>
                  <p>
                    <strong>Report Date:</strong> {report.reportDate}
                  </p>
                  <p>
                    <strong>Referred By:</strong> {report.referredBy}
                  </p>
                </div>
                <div className="diagnosisDashboardPage-card-actions">
                  <button className="diagnosisDashboardPage-action-btn view-btn">View</button>
                  <button className="diagnosisDashboardPage-action-btn">Print</button>
                  {report.status === "Pending Review" && (
                    <button className="diagnosisDashboardPage-action-btn">Approve</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // TechnicianProfile component
  const TechnicianProfile = () => {
    const [techProfile, setTechProfile] = useState({
      fullName: "Rakesh Kumar",
      email: "rakesh.kumar@vdrlabs.com",
      mobileNumber: "9876543210",
      gender: "Male",
      personalAddress: "204, Sunshine Apartments, Banjara Hills, Hyderabad",
      licenseNumber: "MLT-2023-45678",
      licenseExpiry: "December 31, 2026",
      specialization: "Clinical Pathology",
      educationalBackground:
        "B.Sc. Medical Laboratory Technology, M.Sc. Clinical Biochemistry",
      experience: "5",
      currentLab: "VDR Medical Diagnostics, Main Branch",
      labAddress: "Plot No. 45, Health District, Hyderabad",
      languages: "English, Hindi, Telugu",
      certifications: "NABL Certified Clinical Laboratory Technician",
      profilePhoto: "techPhoto.jpg",
      bio: "Experienced medical laboratory technician specializing in hematology and clinical biochemistry with over 5 years of experience in diagnostic laboratories.",
    });

    return (
      <div className="diagnosisDashboardPage-technician-profile-container">
        <h3 className="diagnosisDashboardPage-technician-profile-title">Technician Profile</h3>
        <div className="diagnosisDashboardPage-technician-card">
          {/* Header Section */}
          <div className="diagnosisDashboardPage-technician-header">
            <div className="diagnosisDashboardPage-technician-header-content">
              <div className="diagnosisDashboardPage-technician-avatar">
                <img
                  src="/api/placeholder/150/150"
                  alt="technician-profile"
                  className="diagnosisDashboardPage-technician-profile-img"
                />
              </div>
              <div className="diagnosisDashboardPage-technician-info">
                <h2 className="diagnosisDashboardPage-technician-name">{techProfile.fullName}</h2>
                <p className="diagnosisDashboardPage-technician-role">
                  Specialization: {techProfile.specialization}
                </p>
                <p className="diagnosisDashboardPage-technician-license">
                  License: {techProfile.licenseNumber}
                </p>
              </div>
              <div className="diagnosisDashboardPage-total-right">
                <button className="diagnosisDashboardPage-edit-button">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="diagnosisDashboardPage-technician-section">
            <h3 className="diagnosisDashboardPage-section-title">Personal Information</h3>
            <div className="diagnosisDashboardPage-info-grid two-column">
              <ul className="diagnosisDashboardPage-Personal-information-Ul-left">
                <li>
                  <p className="diagnosisDashboardPage-info-label">Email:</p>
                  <p>{techProfile.email}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Phone:</p>
                  <p>{techProfile.mobileNumber}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Gender:</p>
                  <p>{techProfile.gender}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Address:</p>
                  <p>{techProfile.personalAddress}</p>
                </li>
              </ul>
            </div>
          </div>

          <hr className="diagnosisDashboardPage-line" />

          {/* Professional Information */}
          <div className="diagnosisDashboardPage-technician-section">
            <h3 className="diagnosisDashboardPage-section-title">Professional Information</h3>
            <div className="diagnosisDashboardPage-info-grid two-column">
              <ul className="diagnosisDashboardPage-Personal-information-Ul-left">
                <li>
                  <p className="diagnosisDashboardPage-info-label">License Number:</p>
                  <p>{techProfile.licenseNumber}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">License Expiry:</p>
                  <p>{techProfile.licenseExpiry}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Specialization:</p>
                  <p>{techProfile.specialization}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Educational Background:</p>
                  <p>{techProfile.educationalBackground}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Experience:</p>
                  <p>{techProfile.experience} years</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Current Laboratory:</p>
                  <p>{techProfile.currentLab}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Laboratory Address:</p>
                  <p>{techProfile.labAddress}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Languages:</p>
                  <p>{techProfile.languages}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Certifications:</p>
                  <p>{techProfile.certifications}</p>
                </li>
                <li>
                  <p className="diagnosisDashboardPage-info-label">Bio:</p>
                  <p>{techProfile.bio}</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Schedule */}
          <div className="diagnosisDashboardPage-technician-section border-top">
            <h3 className="diagnosisDashboardPage-section-title">Schedule & Availability</h3>
            <div className="diagnosisDashboardPage-schedule-grid">
              <div className="diagnosisDashboardPage-schedule-box">
                <p className="diagnosisDashboardPage-schedule-day">Monday - Friday</p>
                <p className="diagnosisDashboardPage-schedule-time">8:00 AM - 4:00 PM</p>
              </div>
              <div className="diagnosisDashboardPage-schedule-box">
                <p className="diagnosisDashboardPage-schedule-day">Saturday</p>
                <p className="diagnosisDashboardPage-schedule-time">9:00 AM - 1:00 PM</p>
              </div>
              <div className="diagnosisDashboardPage-schedule-box">
                <p className="diagnosisDashboardPage-schedule-day">Sunday</p>
                <p className="diagnosisDashboardPage-schedule-time">Off</p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="diagnosisDashboardPage-technician-section border-top">
            <h3 className="diagnosisDashboardPage-section-title">Account Settings</h3>
            <div className="diagnosisDashboardPage-settings-links">
              <button className="diagnosisDashboardPage-settings-link">Change Password</button>
              <button className="diagnosisDashboardPage-settings-link">
                Notification Preferences
              </button>
              <button className="diagnosisDashboardPage-settings-link">
                Laboratory Equipment Access
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="diagnosisDashboardPage-docDashboard-container">
      {/* Toggle Button for Mobile */}
      <button className="diagnosisDashboardPage-docDashboard-toggle-button" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`diagnosisDashboardPage-docDashboard-sidebar ${
          isSidebarOpen ? "docDashboard-sidebar-open" : ""
        }`}
      >
        <div className="diagnosisDashboardPage-docDashboard-sidebar-header">
          <span className="diagnosisDashboardPage-docDashboard-sidebar-title">Menu</span>
        </div>

        <nav className="diagnosisDashboardPage-docDashboard-menu-li">
          <ul className="diagnosisDashboardPage-docDashboard-menu-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div
                  className={`diagnosisDashboardPage-docDashboard-menu-item ${
                    activePage === item.name ? "docDashboard-active" : ""
                  } ${item.name === "Logout" ? "docDashboard-logout" : ""}`}
                  onClick={() => {
                    if (item.name === "Logout") {
                      if (window.confirm("Are you sure you want to logout?")) {
                        setLogin(false);
                        navigateTo("/loginAndRegistrationPage");
                      }
                    } else {
                      setActivePage(item.name);
                    }
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="diagnosisDashboardPage-docDashboard-main-content">{renderContent()}</div>
    </div>
  );
};

export default LabTechnicianDashboard;
