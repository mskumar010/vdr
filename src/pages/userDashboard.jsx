import { useState, useContext, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  FileText,
  Pill,
  Bell,
  ChevronRight,
  Download,
  Clock,
} from "lucide-react";
import "./userDashboard.css";
import Mohan from "../assets/Images/foundersImg/mohan.jpg";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("consultation");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const {
    isLoggedIn,
    isUser,
    isDoctor,
    setUser,
    setDoctor,
    setLogin,
    loginPersonMail,
  } = useContext(LoginContext);

  useEffect(() => {
    setEmail(loginPersonMail);
  }, [loginPersonMail]);
  const GET_DOCTORDETAILS_API_URL = "http://localhost:8080/user/get/";

  useEffect(() => {
    if (!email) return;
    const fetchUserDetailByMail = async () => {
      try {
        const response = await fetch(`${GET_DOCTORDETAILS_API_URL}${email}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    fetchUserDetailByMail();
  }, [email]);

  const navigateTo = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setShowLogoutPopup(false);

    if (window.confirm("Are you sure you want to logout?")) {
      console.log("user bro, you  logged out from dashboard sussefully ");
      alert("Bro youve Logged out successfully");
      setLogin(false);
      navigateTo("/loginAndRegistrationPage");
    } else {
      console.log("User canceled logout");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "consultation":
        return <ConsultationSection />;
      case "diagnosis":
        return <DiagnosisSection />;
      case "prescription":
        return <PrescriptionSection />;
      case "notification":
        return <NotificationSection />;
      case "profile":
        return <ProfileSection userProfile={userProfile} />;
      case "logout":
        return (
          <LogoutPopup
            show={showLogoutPopup}
            onConfirm={handleLogout}
            onCancel={handleCancelLogout}
          />
        );
      default:
        return <ConsultationSection />;
    }
  };

  return (
    <div className="patientDashboard-container">
      {/* Sidebar */}
      <div
        className={`patientSidebar ${
          isOpen ? "patientSidebar-open" : "patientSidebar-collapsed"
        }`}
      >
        <div className="patientSidebar-header">
          {isOpen && <h2 className="patientSidebar-title">User Portal</h2>}
          <button onClick={toggleSidebar} className="patientSidebar-toggle">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="patientSidebar-nav">
          <NavItem
            icon={<Calendar />}
            title="Consultation"
            isOpen={isOpen}
            isActive={activeTab === "consultation"}
            onClick={() => setActiveTab("consultation")}
          />
          <NavItem
            icon={<FileText />}
            title="Diagnosis Reports"
            isOpen={isOpen}
            isActive={activeTab === "diagnosis"}
            onClick={() => setActiveTab("diagnosis")}
          />
          <NavItem
            icon={<Pill />}
            title="Prescriptions"
            isOpen={isOpen}
            isActive={activeTab === "prescription"}
            onClick={() => setActiveTab("prescription")}
          />
          <NavItem
            icon={<Bell />}
            title="Notifications"
            isOpen={isOpen}
            isActive={activeTab === "notification"}
            onClick={() => setActiveTab("notification")}
          />
          <NavItem
            icon={<User />}
            title="Profile"
            isOpen={isOpen}
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            className="patientNavItem-highlight"
          />
          <NavItem
            icon={<LogOut />}
            title="Logout"
            isOpen={isOpen}
            isActive={activeTab === "logout"}
            onClick={() => {
              setShowLogoutPopup(true);
              handleLogout();
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="patientMain-content">
        <div className="patientMain-inner">
          <h1 className="patientMain-heading">
            {userProfile.username || "Static User"}
            's Dashboard
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;

function NavItem({ icon, title, isOpen, isActive, onClick, className = "" }) {
  return (
    <div
      className={`navItem ${isActive ? "navItem-active" : ""} ${className}`}
      onClick={onClick}
    >
      <div className="navItem-icon">{icon}</div>
      {isOpen && <span className="navItem-title">{title}</span>}
    </div>
  );
}

function ProfileSection({ userProfile }) {
  return (
    <div className="profileCard">
      <div className="profileHeader">
        <img src={Mohan} alt="Patient" className="profileImage" />
        <div>
          <h3 className="profileName">
            {userProfile?.username || "Static Kumar"}
          </h3>
          <p className="profileAge">Age: {userProfile?.age || 30}</p>
        </div>
      </div>
      <div>
        <h4 className="profileSectionTitle">Personal Information</h4>
        <ul className="profileDetails">
          <li>Email: {userProfile?.email || "xuser@static.com"}</li>
          <li>Phone: {userProfile?.phone || "+123 456 7890"}</li>
          <li>
            Address: {userProfile?.address || "123, Main Street, City, Country"}
          </li>
        </ul>
      </div>
      <button className="profileSettingsBtn">Change Settings</button>
    </div>
  );
}

function ConsultationCard({ date, time, patient, status, type }) {
  const statusColors = {
    completed: "consultation-status-completed",
    upcoming: "consultation-status-upcoming",
    scheduled: "consultation-status-scheduled",
  };

  return (
    <div className="consultationCardContainer">
      <div className="consultationCardHeader">
        <div>
          <h3 className="consultationCardPatientName">{patient}</h3>
          <div className="consultationCardTimeInfo">
            <Clock size={14} className="consultationClockIcon" />
            <span>
              {date} at {time}
            </span>
          </div>
        </div>
        <span className={`consultationCardStatus ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="consultationCardTypeText">
        {type === "video" ? "Video Consultation" : "In-person Appointment"}
      </p>
      <button className="consultationCardButton">
        View Details <ChevronRight size={16} />
      </button>
    </div>
  );
}

function ConsultationSection() {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const consultations = {
    past: [
      {
        id: 1,
        patient: "John Doe",
        date: "15 Apr 2025",
        time: "10:30 AM",
        status: "completed",
        type: "video",
      },
      {
        id: 2,
        patient: "Sarah Smith",
        date: "10 Apr 2025",
        time: "2:00 PM",
        status: "completed",
        type: "in-person",
      },
    ],
    upcoming: [
      {
        id: 3,
        patient: "Robert Johnson",
        date: "30 Apr 2025",
        time: "9:15 AM",
        status: "upcoming",
        type: "video",
      },
      {
        id: 4,
        patient: "Emily Wilson",
        date: "2 May 2025",
        time: "11:00 AM",
        status: "upcoming",
        type: "in-person",
      },
    ],
    scheduled: [
      {
        id: 5,
        patient: "Michael Brown",
        date: "10 May 2025",
        time: "3:30 PM",
        status: "scheduled",
        type: "video",
      },
      {
        id: 6,
        patient: "Jessica Taylor",
        date: "15 May 2025",
        time: "1:45 PM",
        status: "scheduled",
        type: "in-person",
      },
    ],
  };

  return (
    <div>
      <div className="consultationFilterButtonGroup">
        <button
          className={`consultationFilterButton ${
            activeFilter === "past" ? "consultationFilterButtonActive" : ""
          }`}
          onClick={() => setActiveFilter("past")}
        >
          Past
        </button>
        <button
          className={`consultationFilterButton ${
            activeFilter === "upcoming" ? "consultationFilterButtonActive" : ""
          }`}
          onClick={() => setActiveFilter("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`consultationFilterButton ${
            activeFilter === "scheduled" ? "consultationFilterButtonActive" : ""
          }`}
          onClick={() => setActiveFilter("scheduled")}
        >
          Scheduled
        </button>
      </div>

      <div className="consultationCardGrid">
        {consultations[activeFilter].map((consultation) => (
          <ConsultationCard key={consultation.id} {...consultation} />
        ))}
      </div>
    </div>
  );
}

function DiagnosisSection() {
  const reports = [
    {
      id: 1,
      name: "Blood Test Report",
      date: "15 Apr 2025",
      type: "PDF",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "X-Ray Results",
      date: "10 Apr 2025",
      type: "DICOM",
      size: "8.7 MB",
    },
    {
      id: 3,
      name: "MRI Scan Report",
      date: "5 Apr 2025",
      type: "PDF",
      size: "4.1 MB",
    },
    {
      id: 4,
      name: "ECG Results",
      date: "1 Apr 2025",
      type: "PDF",
      size: "1.8 MB",
    },
  ];

  return (
    <div className="diagnosisReportContainer">
      <div className="diagnosisReportHeader">
        <h2 className="diagnosisReportTitle">Diagnosis Reports</h2>
      </div>
      <div className="diagnosisReportTableWrapper">
        <table className="diagnosisReportTable">
          <thead className="diagnosisReportTableHead">
            <tr>
              <th className="diagnosisReportTh">Report Name</th>
              <th className="diagnosisReportTh">Date</th>
              <th className="diagnosisReportTh">Type</th>
              <th className="diagnosisReportTh">Size</th>
              <th className="diagnosisReportTh">Action</th>
            </tr>
          </thead>
          <tbody className="diagnosisReportTableBody">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="diagnosisReportTd name">{report.name}</td>
                <td className="diagnosisReportTd">{report.date}</td>
                <td className="diagnosisReportTd">{report.type}</td>
                <td className="diagnosisReportTd">{report.size}</td>
                <td className="diagnosisReportTd action">
                  <button className="diagnosisDownloadBtn">
                    <Download size={16} className="diagnosisDownloadIcon" />{" "}
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PrescriptionSection() {
  const [activeFilter, setActiveFilter] = useState("current");
  const prescriptions = {
    current: [
      {
        id: 1,
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "7 days",
        notes: "Take with food",
      },
      {
        id: 2,
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6 hours as needed",
        duration: "5 days",
        notes: "For pain and inflammation",
      },
    ],
    past: [
      {
        id: 3,
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "14 days",
        notes: "For allergic rhinitis",
      },
      {
        id: 4,
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily before breakfast",
        duration: "30 days",
        notes: "For acid reflux",
      },
    ],
  };

  return (
    <div>
      <div className="prescriptionFilterButtons">
        <button
          className={`prescriptionFilterBtn ${
            activeFilter === "current" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("current")}
        >
          Current
        </button>
        <button
          className={`prescriptionFilterBtn ${
            activeFilter === "past" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("past")}
        >
          Past
        </button>
      </div>

      <div className="prescriptionListContainer">
        {prescriptions[activeFilter].map((prescription) => (
          <div key={prescription.id} className="prescriptionCard">
            <div className="prescriptionCardHeader">
              <div>
                <h3 className="prescriptionName">{prescription.name}</h3>
                <p className="prescriptionDetails">
                  {prescription.dosage} - {prescription.frequency}
                </p>
                <p className="prescriptionDetails">
                  Duration: {prescription.duration}
                </p>
                <p className="prescriptionNotes">{prescription.notes}</p>
              </div>
              <button className="prescriptionViewBtn">
                View Details <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSection() {
  const notifications = [
    {
      id: 1,
      type: "appointment",
      message: "Upcoming appointment with Robert Johnson tomorrow at 9:15 AM",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "report",
      message: "New lab results available for Emily Wilson",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "reminder",
      message: "Don't forget to review Michael Brown's prescription",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "appointment",
      message: "Jessica Taylor rescheduled appointment to May 15th at 1:45 PM",
      time: "2 days ago",
    },
  ];

  return (
    <div className="notificationsContainer">
      <div className="notificationsHeader">
        <h2 className="notificationsTitle">Notifications</h2>
      </div>
      <div>
        {notifications.map((notification) => {
          let icon;
          let bgColor;

          switch (notification.type) {
            case "appointment":
              icon = <Calendar size={20} />;
              bgColor = "appointmentBgColor";
              break;
            case "report":
              icon = <FileText size={20} />;
              bgColor = "reportBgColor";
              break;
            case "reminder":
              icon = <Bell size={20} />;
              bgColor = "reminderBgColor";
              break;
            default:
              icon = <Bell size={20} />;
              bgColor = "defaultBgColor";
          }

          return (
            <div key={notification.id} className="notificationCard">
              <div className="notificationContent">
                <div className={`${bgColor} iconContainer`}>{icon}</div>
                <div>
                  <p className="notificationMessage">{notification.message}</p>
                  <p className="notificationTime">{notification.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogoutPopup({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="logoutPopupOverlay">
      <div className="logoutPopupContent">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="logoutPopupButtons">
          <button className="logoutCancelButton" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="logoutConfirmButton"
            onClick={() => {
              onConfirm();
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
