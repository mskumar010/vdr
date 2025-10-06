import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./doctorID.css";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import DoctorAppointment from "../components/doctorAppointment";
const DoctorID = () => {
  const location = useLocation();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // Try to get doctor from location.state
    if (location.state && location.state.doctor) {
      setDoctor(location.state.doctor);
      setLoading(false);
    } else if (id) {
      // Fetch from API if not in state
      setLoading(true);
      fetch(`http://localhost:8080/doctorverfication/get/${encodeURIComponent(id)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Doctor not found");
          return res.json();
        })
        .then((data) => {
          if (isMounted) {
            setDoctor(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message);
            setLoading(false);
          }
        });
    } else {
      setError("No doctor ID provided");
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [location.state, id]);

  const handleBookClick = () => {
    setShowAppointment(true);
  };

  if (loading)
    return (
      <div className="viewDocSec">
        <p>Loading doctor details...</p>
      </div>
    );
  if (error)
    return (
      <div className="viewDocSec">
        <p>Error: {error}</p>
      </div>
    );
  if (!doctor)
    return (
      <div className="viewDocSec">
        <p>Doctor not found.</p>
      </div>
    );

  // Prepare doctor display object
  const displayDoctor = {
    name: doctor.fullName || "not mentioned",
    license: doctor.medicalLicenseNumber || "not mentioned",
    expiry: doctor.medicalLicenseNumberExpiryDate || "not mentioned",
    specialization: doctor.medicalSpeciality || "not mentioned",
    clinics: doctor.hospitalCurrentWorking || "not mentioned",
    experience:
      doctor.experience && doctor.experience !== "not mentioned"
        ? `A dedicated specialist with ${doctor.experience}+ years of experience.`
        : "A dedicated specialist with experience not mentioned.",
    image: doctor.doctorPhoto
      ? `data:image/jpeg;base64,${doctor.doctorPhoto}`
      : VDrLogo,
    phone: doctor.mobileNumber || "not mentioned",
    email: doctor.email || "not mentioned",
    address: doctor.hospitalAddress || "not mentioned",
  };

  return (
    <>
      <div className="viewDocSec">
        <div
          className="viewDocSec-doctorDetails"
          style={showAppointment ? { margin: 0, minWidth: "unset" } : {}}
        >
          <img src={VDrLogo} alt="Logo" className="docId-logo" />
          <img
            src={displayDoctor.image}
            alt={displayDoctor.name}
            className="docId-doctor-img"
          />
          <h2>Dr. {displayDoctor.name.toUpperCase()}</h2>

          <div className="details">
            <p>
              <strong>License :</strong> {displayDoctor.license}
            </p>
            <p>
              <strong>Expiry :</strong> {displayDoctor.expiry}
            </p>
            <p>
              <strong>Specialization :</strong> {displayDoctor.specialization}
            </p>
            <p>
              <strong>Clinics/Hospitals:</strong> {displayDoctor.clinics}
            </p>
            <p>
              <strong>Phone :</strong> {displayDoctor.phone}
            </p>
            <p>
              <strong>Email :</strong> {displayDoctor.email}
            </p>
            <p>
              <strong>Address :</strong> {displayDoctor.address}
            </p>
          </div>

          <p className="experience">{displayDoctor.experience}</p>

          <div
            className="button-group"
            style={showAppointment ? { width: "10" } : {}}
          >
            <button className="rate-btn1">Rate</button>
            <button className="book-btn1" onClick={handleBookClick}>
              Continue Booking
            </button>
          </div>
        </div>
        <div className="appointmentBookingSec">
          {showAppointment ? <DoctorAppointment /> : ""}{" "}
        </div>
      </div>
    </>
  );
};

export default DoctorID;
