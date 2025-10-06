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
} from "lucide-react";
import "../pages/docDashboard.css";
const menuItems = [
  { name: "Dashboard", icon: <Calendar className="icon" /> },
  { name: "Appointments", icon: <Clock className="icon" /> },
  { name: "Patients", icon: <Users className="icon" /> },
  { name: "Prescriptions", icon: <Clipboard className="icon" /> },
  { name: "Teleconsultations", icon: <Video className="icon" /> },
  { name: "Services", icon: <FileText className="icon" /> },
  { name: "Insurance", icon: <Shield className="icon" /> },
  { name: "SOS Alerts", icon: <Bell className="icon" /> },
  { name: "Profile", icon: <User className="icon" /> },
  { name: "Logout", icon: <LogOut className="icon" /> },
];

const GET_DOCTORDETAILS_API_URL =
  "http://localhost:8080/doctorverfication/get/";
const GET_APPOINTMENTS_API_URL = "http://localhost:8080/Appointment/doctor/";
const DocDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState({});
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [email, setEmail] = useState("xdoctor@static.com");

  const {
    isLoggedIn,
    isUser,
    isDoctor,
    setUser,
    setDoctor,
    setLogin,
    loginPersonMail,
  } = useContext(LoginContext);

  useEffect(()=>{  setEmail(loginPersonMail);
},[loginPersonMail])
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
        console.log("this is raw data : ", data);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };
    fetchDoctors();
  }, [email]);
  useEffect(() => {
    // window.alert(email);
    // window.alert(doctorProfile)
    console.log(doctorProfile);
    // console.log();
  }, []);

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
          <div className="dashboard-content">
            <div className="header">
              <h4 className="title">VDR - Doctor Overview</h4>
            </div>

            <div className="dashboard-grid">
              <div className="main-column">
                <div className="card appointments-card">
                  <div className="card-header">
                    <h3 className="card-title">Upcoming Appointments</h3>
                    <div className="card-subtitle">Recent Patient</div>
                  </div>

                  <div className="appointment-list">
                    {upcomingAppointments.map((appointment, idx) => (
                      <div key={idx} className="appointment-item">
                        <div className="appointment-info">
                          <div className="appointment-name">
                            {appointment.name}
                          </div>
                          <div className="appointment-type">
                            {appointment.time}, {appointment.type}
                          </div>
                        </div>
                        <div className="appointment-date">
                          <span>{appointment.date}</span>
                          <svg
                            className="arrow-icon"
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

                {/* <div className="services-card">
                  <div className="card-header">
                    <h3 className="card-title">Services by Recent Updates</h3>
                  </div>

                  <div className="update-list">
                    {recentUpdates.map((update, idx) => (
                      <div key={idx} className="update-item">
                        <div>
                          <div className="update-name">{update.name}</div>
                          <div className="update-action">{update.action}</div>
                        </div>
                        <div className="update-date">
                          {update.date || update.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="right-column">
                <div className="quick-actions-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Quick Actions & Notifications
                    </h3>
                  </div>

                  <div className="card-body">
                    <h3 className="section-title">Upcoming</h3>
                    <div className="action-item">
                      <div className="action-info">
                        <Calendar className="icon" />
                        <span className="action-text">Today at 3:00 PM</span>
                      </div>
                      <svg
                        className="arrow-icon"
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

                    <h3 className="section-title">Pending</h3>
                    <div className="action-item">
                      <div className="action-info">
                        <FileText className="icon" />
                        <span className="action-text">
                          New prescription req
                        </span>
                      </div>
                      <svg
                        className="arrow-icon"
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

                    <h3 className="section-title">New Requests</h3>
                    <div className="action-item">
                      <div className="action-info">
                        <FileText className="icon" />
                        <span className="action-text">New appointment req</span>
                      </div>
                      <svg
                        className="arrow-icon"
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
      default:
        return (
          <div className="center-message">
            <p>No services yet this movement.</p>
          </div>
        );
    }
  };

  // Patients component
  const Patients = () => (
    <div className="patients">
      <h3>Patients</h3>

      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Search patients..."
            className="search-input"
          />
        </div>

        <div className="table-container">
          <table className="patient-table">
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
                {/* <td className="status active">Active</td> */}
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
              <tr>
                <td>Salman</td>
                <td>P-002</td>
                <td>Apr 24, 2025</td>
                {/* <td className="status active">Active</td> */}
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
              <tr>
                <td>Sowmith</td>
                <td>P-003</td>
                <td>Apr 19, 2025</td>
                {/* <td className="status pending">Pending</td> */}
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mobile-card">
          <div className="card-item">
            <span className="font-bold">Name:</span> Raju
            <span className="font-bold">ID:</span> P-001
            <span className="font-bold">Last Visit:</span> Apr 04, 2025
            <span className="font-bold">Status:</span> Active
            <button className="view-btn">View</button>
          </div>

          <div className="card-item">
            <span className="font-bold">Name:</span> Raja Singh
            <span className="font-bold">ID:</span> P-002
            <span className="font-bold">Last Visit:</span> Apr 24, 2025
            <span className="font-bold">Status:</span> Active
            <button className="view-btn">View</button>
          </div>

          <div className="card-item">
            <span className="font-bold">Name:</span> Sowmith
            <span className="font-bold">ID:</span> P-003
            <span className="font-bold">Last Visit:</span> Apr 19, 2025
            <span className="font-bold">Status:</span> Pending
            <button className="view-btn">View</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Prescriptions component
  const Prescriptions = () => (
    <div className="prescriptions-container">
      <h3 className="prescriptions-title">Prescriptions</h3>

      <div className="prescriptions-card">
        {/* Header: Search + Button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="search-input"
          />
          <button className="new-prescription-button">New Prescription</button>
        </div>

        {/* Desktop Table */}
        <div className="desktop-table">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-cell">Patient</th>
                <th className="table-cell">Medication</th>
                <th className="table-cell">Dosage</th>
                <th className="table-cell">Created</th>
                <th className="table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td className="table-cell">Indhu yadav</td>
                <td className="table-cell">Amoxicillin</td>
                <td className="table-cell">500mg, 3x daily</td>
                <td className="table-cell">Apr 04, 2025</td>
                <td className="table-cell">
                  <span className="status-active">Active</span>
                </td>
              </tr>
              <tr>
                <td className="table-cell">Teju</td>
                <td className="table-cell">Lisinopril</td>
                <td className="table-cell">10mg, daily</td>
                <td className="table-cell">Apr 24, 2025</td>
                <td className="table-cell">
                  <span className="status-active">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-cards">
          <div className="card">
            <div className="card-info">
              <span className="font-bold">Patient:</span> Indhu yadav
            </div>
            <div className="card-info">
              <span className="font-bold">Medication:</span> Amoxicillin
            </div>
            <div className="card-info">
              <span className="font-bold">Dosage:</span> 500mg, 3x daily
            </div>
            <div className="card-info">
              <span className="font-bold">Created:</span> Apr 04, 2025
            </div>
            <div className="card-info">
              <span className="font-bold">Status:</span>
              <span className="status-active">Active</span>
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <span className="font-bold">Patient:</span> Teju
            </div>
            <div className="card-info">
              <span className="font-bold">Medication:</span> Lisinopril
            </div>
            <div className="card-info">
              <span className="font-bold">Dosage:</span> 10mg, daily
            </div>
            <div className="card-info">
              <span className="font-bold">Created:</span> Apr 24, 2025
            </div>
            <div className="card-info">
              <span className="font-bold">Status:</span>
              <span className="status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Teleconsultations component
  const Teleconsultations = () => (
    <div className="teleconsultations-container">
      <h3 className="teleconsultations-title">Teleconsultations</h3>

      <div className="sessions-container">
        {/* Upcoming Sessions */}
        <div className="sessions-card upcoming-sessions">
          <h2 className="sessions-heading">Upcoming Sessions</h2>
          <div className="session-list">
            <div className="session-item">
              <div className="session-info">
                <div className="session-name">Indhu yadav</div>
                <div className="session-time">04 Apr. at 9:40</div>
              </div>
              <button className="join-button">Join</button>
            </div>
            <div className="session-item">
              <div className="session-info">
                <div className="session-name">Teju</div>
                <div className="session-time">24 Apr. at 2:45</div>
              </div>
              <button className="join-button">Join</button>
            </div>
          </div>
        </div>

        {/* Past Sessions */}
        <div className="sessions-card past-sessions">
          <h2 className="sessions-heading">Past Sessions</h2>
          <div className="session-list">
            <div className="session-item">
              <div className="session-info">
                <div className="session-name">Jony</div>
                <div className="session-time">19 Apr. at 2:05</div>
              </div>
              <button className="view-notes-button">View Notes</button>
            </div>
            <div className="session-item">
              <div className="session-info">
                <div className="session-name">Raj</div>
                <div className="session-time">15 Apr. at 11:30</div>
              </div>
              <button className="view-notes-button">View Notes</button>
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
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Appointments</h2>
          <p className="text-3xl font-bold text-blue-600">{appointmentCount}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Appointment List</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="border p-4 rounded hover:shadow"
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

  const Profile = () => (
    <div className="doctor-profile-container">
      <h1 className="doctor-profile-title">Doctor Profile : {email}</h1>
      <div className="doctor-card2">
        {/* Header Section */}
        <div className="doctor-header">
          <div className="doctor-header-content">
            {/* Left Section - Doctor Image */}
            <div className="doctor-avatar">
              <img
                src={`data:image/jpeg;base64,${doctorProfile.doctorPhoto}`}
                alt="doctor-image"
                // className="docDashboard_doctor-profile_img"
              />
            </div>
            {/* Center Section - Doctor Info */}
            <div className="doctor-info">
              <h2 className="doctor-name">{doctorProfile.fullName}</h2>
              <p className="doctor-role">
                Speciality: {doctorProfile.medicalSpeciality}
              </p>
              <p className="doctor-license">
                License: {doctorProfile.medicalLicenseNumber}
              </p>
            </div>
            <div className="qr-sec">
              <div
                className="qr-image-block"
                dangerouslySetInnerHTML={{ __html: doctorProfile.qrCodeSvg }}
              />
            </div>
            {/* <div className="total-right"> */}

            {/* <button className="edit-button">Edit Profile</button> */}
            {/* </div> */}
          </div>
        </div>

        {/* Personal Information */}
        <div className="doctor-section">
          <h3 className="section-title">Personal Information</h3>
          <ul className="Personal-information-Ul-left">
            <li>
              <p className="info-label">Email :</p>
              <p>{doctorProfile.email}</p>
            </li>
            <li>
              <p className="info-label">Phone :</p>
              <p>{doctorProfile.mobileNumber}</p>
            </li>
            <li>
              <p className="info-label">Gender :</p>
              <p>{doctorProfile.gender}</p>
            </li>
            <li>
              <p className="info-label">Address :</p>
              <p>{doctorProfile.personalAddress}</p>
            </li>
          </ul>
        </div>

        <hr className="line" />

        {/* Professional Information */}
        <div className="doctor-section">
          <h3 className="section-title">Professional Information</h3>
          <ul className="professional-info-list">
            <li>
              <p className="info-label">Medical License No</p>
              <p>{doctorProfile.medicalLicenseNumber}</p>
            </li>
            <li>
              <p className="info-label">License Expiry</p>
              <p>{doctorProfile.medicalLicenseNumberExpiryDate}</p>
            </li>
            <li>
              <p className="info-label">Specialization</p>
              <p>{doctorProfile.medicalSpeciality}</p>
            </li>
            <li>
              <p className="info-label">Educational Background</p>
              <p>{doctorProfile.educationalBackground}</p>
            </li>
            <li>
              <p className="info-label">Experience</p>
              <p>{doctorProfile.experience} years</p>
            </li>
            <li>
              <p className="info-label">Current Hospital/Clinic</p>
              <p>{doctorProfile.hospitalCurrentWorking}</p>
            </li>
            <li>
              <p className="info-label">Clinic/Hospital Name</p>
              <p>{doctorProfile.hospitalOrClinic}</p>
            </li>
            <li>
              <p className="info-label">Clinic/Hospital Address</p>
              <p>{doctorProfile.hospitalAddress}</p>
            </li>
            <li>
              <p className="info-label">Languages Spoken</p>
              <p>{doctorProfile.launguage}</p>
            </li>
            <li>
              <p className="info-label">Disciplinary Actions</p>
              <p>{doctorProfile.disciplinaryActions || "None"}</p>
            </li>
            <li>
              <p className="info-label">Bio</p>
              <p>{doctorProfile.description || "N/A"}</p>
            </li>
          </ul>
        </div>

        {/* Schedule */}
        <div className="doctor-section border-top">
          <h3 className="section-title">Schedule & Availability</h3>
          <div className="schedule-grid">
            <div className="schedule-box">
              <p className="schedule-day">Monday - Friday</p>
              <p className="schedule-time">9:00 AM - 5:00 PM</p>
            </div>
            <div className="schedule-box">
              <p className="schedule-day">Saturday</p>
              <p className="schedule-time">10:00 AM - 2:00 PM</p>
            </div>
            <div className="schedule-box">
              <p className="schedule-day">Sunday</p>
              <p className="schedule-time">Closed</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="doctor-section border-top">
          <h3 className="section-title">Account Settings</h3>
          <div className="settings-links">
            <button className="settings-link">Change Password</button>
            <button className="settings-link">Notification Preferences</button>
            <button className="settings-link">Two-Factor Authentication</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="docDashboard-container">
      {/* Toggle Button for Mobile */}
      <button className="docDashboard-toggle-button" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`docDashboard-sidebar ${
          isSidebarOpen ? "docDashboard-sidebar-open" : ""
        }`}
      >
        <div className="docDashboard-sidebar-header">
          <span
            className={
              isSidebarOpen
                ? " docDashboard-sidebar-title"
                : "docDashboard-sidebar-header1 "
            }
          >
            Menu
          </span>
        </div>

        <nav className="docDashboard-menu-li">
          <ul className="docDashboard-menu-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div
                  className={`docDashboard-menu-item ${
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
      <div className="docDashboard-main-content">{renderContent()}</div>
    </div>
  );
};

export default DocDashboard;
