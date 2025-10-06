import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesSection.css";
import {
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Package,
  FileText,
} from "lucide-react";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const navigateTo = useNavigate();
  const services = [
    {
      id: 1,
      title: "Find Verified Doctor",
      description:
        "Easily locate trusted and verified doctors in your area. This service ensures you connect with qualified professionals for your healthcare needs. Save time and gain peace of mind with reliable doctor recommendations.",
      icon: <UserCheck />,
      locate: "/findDoctorPage",
    },
    {
      id: 2,
      title: "Verify A Doctor",
      description:
        "Quickly verify the credentials of any doctor to ensure their authenticity. This service helps you make informed decisions about your healthcare providers. Stay confident about the quality of care you receive.",
      icon: <ShieldCheck />,
      locate: "/verifyDoc",
    },
    {
      id: 3,
      title: "SOS Emergency",
      description:
        "Access immediate assistance during medical emergencies. This service connects you to emergency responders and nearby facilities. Ensure timely help when it matters the most.",
      icon: <AlertTriangle />,
      locate: "/sosPage",
    },
    {
      id: 4,
      title: "Doorstep Medicine Delivery",
      description:
        "Get your medicines delivered right to your doorstep. This service saves you time and effort by providing a convenient way to access essential medications. Stay healthy without leaving your home.",
      icon: <Package />,
      locate: "https://vdr-door-delivery-medicines.netlify.app/",
    },
    {
      id: 5,
      title: "Insurance",
      description:
        "Explore and manage health insurance plans tailored to your needs. This service helps you secure financial protection for medical expenses. Gain peace of mind with comprehensive coverage options.",
      icon: <ShieldCheck />,
      locate: "https://vdr-insurance.netlify.app/",
    },
    {
      id: 6,
      title: "Diagnosis",
      description:
        "Get accurate and timely medical diagnoses for your health concerns. This service provides access to diagnostic tools and expert consultations to ensure you receive the right care.",
      icon: <FileText />,
      locate: "https://vdr-diagnosis.netlify.app/",
    },
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <header className="services-header">
          <h2>Our services prioritize your needs</h2>
          <div className="services-underline"></div>
          <p>Our service works together to create a better life for you</p>
        </header>

        <div className="services-content">
          <div className="services-tabs">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-tab ${
                  index === activeService ? "active" : ""
                }`}
                onClick={() => setActiveService(index)}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
              </div>
            ))}
          </div>

          <div className="service-details">
            <div className="service-details-content">
              <h3>{services[activeService].title}</h3>
              <div className="details-underline"></div>
              <p>{services[activeService].description}</p>
              <button
                className="learn-more-btn"
                onClick={() => navigateTo(services[activeService].locate)}
              >
                Learn How
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
