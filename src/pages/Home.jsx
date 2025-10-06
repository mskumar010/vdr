import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import VDrLogo from "../assets/Images/commonImg/VDrlogo.png";
import GooglePlayLogo from "../assets/icons/apps/googleplay.png";
import AppStoreLogo from "../assets/icons/apps/applestore.png";
import CardsSlider from "../components/cardsSlider";
import indiaUsaStates from "../data/indiaUsaStates";
import topDoctorSpecialtiesIndia from "../data/topDoctorSpecialtiesIndia";
import tempImg from "../assets/Images/foundersImg/kiran.jpg";
import ScrollingCardsContainer from "../components/ScrollingCardsContainer";
import FindDoctorPage from "./findDoctorPage";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import Headerimage from "../data/headerImages";
import ServicesSection from "../components/ServicesSection";

function Homepage() {
  const [isHomePageRendered, setIsHomePageRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(50);
  const [currentImage, setCurrentImage] = useState(0);
  // Sample header images array - replace with your actual images
  const HeaderImages = [
    { img: "/path-to-image1.jpg" },
    { img: "/path-to-image2.jpg" },
    { img: "/path-to-image3.jpg" }
  ];

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    console.log("Home Page Rendered");  
    setIsHomePageRendered(true);

    // Fix for image change logic
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % Headerimage.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Define state for country, state, and search input
  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Update state dropdown based on selected country
  const updateStates = (e) => {
    setCountry(e.target.value);
    setSelectedState("");
  };

  // Filter doctor types based on search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter doctor types based on query
    if (query) {
      const filtered = topDoctorSpecialtiesIndia.filter((doctor) =>
        doctor.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  };

  // Select doctor type from suggestions
  const selectDoctorType = (doctor) => {
    setSearchQuery(doctor);
    setFilteredDoctors([]); // Hide suggestions after selection
  };

  // FAQ functionality moved to useEffect to avoid DOM direct manipulation
  useEffect(() => {
    const questions = document.querySelectorAll(".faq-question");
    
    if (questions.length > 0) {
      questions.forEach((question) => {
        question.addEventListener("click", () => {
          const answer = question.nextElementSibling;
          const icon = question.querySelector(".open-icon");
          
          if (answer && icon) {
            answer.classList.toggle("open");
            icon.classList.toggle("rotate");
          }
        });
      });
      
      // Cleanup function
      return () => {
        questions.forEach((question) => {
          question.removeEventListener("click", () => {});
        });
      };
    }

    // Fix for rendering images
    const headerBackground = document.querySelector(".header-background");
    if (headerBackground) {
      headerBackground.style.backgroundImage = `url(${Headerimage[currentImage].img})`;
      headerBackground.style.backgroundPosition = `right ${position}% top 0%`;
    }
  }, [isHomePageRendered, currentImage, position]);

  const [activeSlides, setActiveSlides] = useState("doctor");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const doctorSlides = [
    "Detailed medical explanation about health care.",
    "Expert advice on how to maintain a healthy lifestyle.",
    "Tips on managing chronic conditions effectively.",
  ];

  const patientSlides = [
    "Real-life experience with the treatment process.",
    "How the treatment helped improve my quality of life.",
    "Personal journey with the doctors and staff.",
  ];

  const slides = activeSlides === "doctor" ? doctorSlides : patientSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides]);

  const showSlides = (type) => {
    setActiveSlides(type);
    setCurrentSlideIndex(0); // Reset to the first slide when switching
  };

  return (
    <>
      <div className="header-section">
        <div
          className="header-background"
          style={{
            backgroundImage: `url(${Headerimage[currentImage].img})`,
            backgroundPosition: `right ${position}% top 0%`,
          }}
        ></div>
      </div>
      
      <div className="homepage-container flex flex-col justify-center items-center">
        <Link to="/findDoctorPage">
          <div className="searchbar-container">
            <input
              type="text"
              id="home-search-bar"
              placeholder="Search for Doctors near by you"
              className="searchbar-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="searchbar-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="searchbar-icon"
              >
                <path d="M10 2a8 8 0 105.29 14.29l4.31 4.31a1 1 0 001.41-1.41l-4.31-4.31A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
              </svg>
            </button>
          </div>
        </Link>

        {/* Display filtered doctor suggestions */}
        {filteredDoctors.length > 0 && (
          <div className="doctor-suggestions">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="doctor-suggestion-item"
                onClick={() => selectDoctorType(doctor)}
              >
                {doctor}
              </div>
            ))}
          </div>
        )}

        {/* Cards Slider Section */}
        <CardsSlider />
        <h2>More Categories to help you</h2>
<section className="categorySection">
  <ul className="categoryList">
    {['Dentist', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'General Physician', 'ENT Specialist', 'Gynecologist', 'Urologist', 'Neurologist', 'Psychiatrist', 'Oncologist', 'Gastroenterologist'].map((category) => (
      <li className="categoryItem" key={category}>
        <Link to={`/findDoctorPage?category=${category}`}>{category}</Link>
      </li>
    ))}
  </ul>
</section>

        {/* { our services} */}
        <ServicesSection/>
        {/* Testimonials (reviews) Section */}
        <section className="content-section testimonials-section">
          <div className="section-header">
            <h2 className="testimonials-section-heading">
              Trusted By Users, Assured By Verified Doctors
            </h2>
            <div className="section-underline"></div>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  Very helpful and easy to use. I booked an appointment within
                  minutes and got proper consultation from home. Saved time and
                  stress. Highly recommend!
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="P. Praveen Sindhu" />
                </div>
                <div className="author-info">
                  <h4>P. Praveen Sindhu</h4>
                  <p>Patient since 2023</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Best experience with online healthcare. The app is smooth,
                  doctors are professional, and reports were easy to access.
                  Felt taken care of."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="Dr. L.V.S Vishnuvardhan Reddy" />
                </div>
                <div className="author-info">
                  <h4>Dr. L.V.S Vishnuvardhan Reddy</h4>
                  <p>Cardiologist, Verified Provider</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "Game changer for health issues. Especially during busy weeks,
                  having a doctor a tap away really helped. Prescriptions were
                  clear and timely."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={tempImg} alt="K. Anjaneyulu" />
                </div>
                <div className="author-info">
                  <h4>K. Anjaneyulu</h4>
                  <p>Parent of patient</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        {/* <div className="download-section">
          <div className="download-container m-8 w-3/4 flex justify-evenly items-center p-2 rounded-2xl">
            <div className="app-preview">
              <img
                src={VDrLogo}
                alt="App Preview"
                className="h-40 w-40"
              />
            </div>
            <div className="app-info">
              <h2 className="app-title">Download VDr App</h2>
              <p className="app-description">
                Consult with India's top doctors via video on VDr app. Get 24/7
                access to healthcare.
              </p>
              <div className="store-buttons">
                <div className="store-button">
                  <Link to="#">
                    <img src={GooglePlayLogo} alt="Google Play Store" />
                  </Link>
                </div>
                <div className="store-button">
                  <Link to="#">
                    <img src={AppStoreLogo} alt="Apple App Store" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div className="faq-container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq1" />
            <label htmlFor="faq1" className="faq-question">
              Can I search for doctors by specialty, location, or availability?
              <span className="icon open-icon">+</span>
            </label>
            <div className="faq-content">
              Yes, you can search for doctors by specialty, location, and
              availability using our advanced search filters. Just enter your
              criteria in the search bar, and we'll show you the best matches.
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq2" />
            <label htmlFor="faq2" className="faq-question">
              How does the video consultation work, and is it secure?
              <span className="icon open-icon">+</span>
            </label>
            <div className="faq-content">
              Our video consultations are conducted through a secure platform
              that ensures your privacy. After booking, you'll receive a link to
              join the consultation at the scheduled time. Just click the link,
              and you're in!
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq3" />
            <label htmlFor="faq3" className="faq-question">
              Is there an option to choose between in-clinic and online
              consultation?
              <span className="icon open-icon">+</span>
            </label>
            <div className="faq-content">
              Yes, you can choose between in-clinic and online consultations
              based on your preference. Just select your choice when booking an
              appointment.
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq4" />
            <label htmlFor="faq4" className="faq-question">
              How does the video consultation work, and is it secure?
              <span className="icon open-icon">+</span>
            </label>
            <div className="faq-content">
              Our video consultations are conducted through a secure platform
              that ensures your privacy. After booking, you'll receive a link to
              join the consultation at the scheduled time. Just click the link,
              and you're in!
            </div>
          </div>

          <div className="faq-item">
            <input type="checkbox" id="faq5" />
            <label htmlFor="faq5" className="faq-question">
              Does the app send reminders for upcoming appointments?
              <span className="icon open-icon">+</span>
            </label>
            <div className="faq-content">
              Yes, the app sends reminders for upcoming appointments to ensure
              you never miss a consultation. You can also set custom reminders
              based on your preferences.
            </div>
          </div>          
        </div>
      </div>
    </>
  );
}

export default Homepage;