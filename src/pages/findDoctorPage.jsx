import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./findDoctorPage.css";
import indianStates from "../data/indianStates";
import doctorDetails from "../data/doctorDetails";
import defaultUser from "../assets/Images/commonImg/VDrlogo.png";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaStarHalfAlt,
  FaLocationArrow,
  FaLanguage,
} from "react-icons/fa";
import { BiFilterAlt, BiSearchAlt } from "react-icons/bi";
import { MdClear, MdOutlineCalendarMonth, MdWorkOutline } from "react-icons/md";

// import { RiMoney2Line } from "react-icons/ri";
// API URL constant
const GET_DOCTOR_API_URL = "http://localhost:8080/doctorverfication/all";

// Constants for filter data
const SPECIALITY_KEYWORDS = {
  Cardiologist: ["cardiologist", "cardiology", "heart"],
  Dentist: ["dentist", "dental", "teeth"],
  Gynaecologist: ["gynaecologist", "gynecology", "obgyn"],
  Dermatologist: ["dermatologist", "skin"],
  Neurologist: ["neurologist", "neuro"],
  Orthopedist: ["orthopedist", "orthopedic", "bones"],
  Pediatrician: ["pediatrician", "child"],
  Pulmonologist: ["pulmonologist", "lungs", "respiratory"],
  Gastroenterologist: ["gastroenterologist", "gastro", "digestive"],
  Physiotherapist: ["physiotherapist", "physio"],
  "General Physician": ["general physician", "physician", "gp"],
  Diagnostics: ["diagnostics", "lab"],
};

const SYMPTOMS = [
  "Headache",
  "Fatigue",
  "Cough",
  "Fever",
  "Nausea or Vomiting",
  "Abdominal Pain",
  "Dizziness",
  "Shortness of Breath",
  "Chest Pain",
  "Back Pain",
  "Joint or Muscle Pain",
  "Skin Rash",
  "Sore Throat",
  "Nasal Congestion",
  "Diarrhea",
  "Constipation",
  "Urinary Issues",
  "Sleep Disturbances",
  "Mood Changes",
  "Weight Changes",
  "Appetite Changes",
  "Menstrual Irregularities",
];

const SPECIALTIES = [
  "Cardiologist",
  "Dentist",
  "Gynaecologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
  "Pulmonologist",
  "Gastroenterologist",
  "Physiotherapist",
  "General Physician",
  "Diagnostics",
];

const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Kerala",
  "Bihar",
  "Rajasthan",
  "Hyderabad",
  "Jaipur",
  "Chennai",
  "Bengaluru",
];

const FEES = [100, 200, 300, 500, 1000, 1500, 2000, 3000, 5000];
const RATINGS = [1, 2, 3, 4, 5];
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Marathi"];
const AVAILABILITY = ["Morning", "Afternoon", "Evening", "Night"];
const EXPERIENCE = ["1-3 years", "3-5 years", "5-10 years", "10+ years"];

// Symptom to specialty mapping for filtering
const SYMPTOM_TO_SPECIALTY_MAP = {
  "Headache": ["Neurologist"],
  "Chest Pain": ["Cardiologist"],
  "Skin Rash": ["Dermatologist"],
  "Joint or Muscle Pain": ["Orthopedist", "Physiotherapist"],
  "Abdominal Pain": ["Gastroenterologist"],
  "Cough": ["Pulmonologist"],
  "Nasal Congestion": ["Pulmonologist"],
  "Menstrual Irregularities": ["Gynaecologist"],
  "Sleep Disturbances": ["Neurologist", "General Physician"],
  "Urinary Issues": ["General Physician"],
  "Sore Throat": ["General Physician", "Pulmonologist"],
};

// Pagination settings
const DOCTORS_PER_PAGE = 10;

// Helper functions
const normalize = (str) => str?.toString().trim().toLowerCase() || "";
const matchSpeciality = (doctorSpeciality, searchQuery) => {
  const normDoctor = normalize(doctorSpeciality);
  const normSearch = normalize(searchQuery);
  const keywords = SPECIALITY_KEYWORDS[normSearch] || [normSearch];
  return keywords.some((keyword) => normDoctor.includes(keyword));
};

// Initial filter state
const initialFilterState = {
  searchQuery: "",
  selectedState: "",
  selectedSymptoms: [],
  selectedSpecialties: [],
  selectedLocations: [],
  selectedFees: [],
  selectedRatings: [],
  selectedLanguages: [],
  selectedAvailability: [],
  selectedExperience: [],
  currentPage: 1,
};

// Action types
const ACTIONS = {
  SET_SEARCH_QUERY: "set_search_query",
  SET_SELECTED_STATE: "set_selected_state",
  TOGGLE_FILTER_ITEM: "toggle_filter_item",
  REMOVE_FILTER_ITEM: "remove_filter_item",
  CLEAR_ALL_FILTERS: "clear_all_filters",
  SET_CURRENT_PAGE: "set_current_page",
  LOAD_URL_PARAMS: "load_url_params",
};

// Filter reducer
function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload, currentPage: 1 };

    case ACTIONS.SET_SELECTED_STATE:
      return { ...state, selectedState: action.payload, currentPage: 1 };

    case ACTIONS.TOGGLE_FILTER_ITEM: {
      const { category, value } = action.payload;
      const currentValues = state[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...state, [category]: newValues, currentPage: 1 };
    }

    case ACTIONS.REMOVE_FILTER_ITEM: {
      const { category, value } = action.payload;
      return {
        ...state,
        [category]: state[category].filter((item) => item !== value),
        currentPage: 1,
      };
    }

    case ACTIONS.CLEAR_ALL_FILTERS:
      return {
        ...initialFilterState,
        searchQuery: state.searchQuery,
        selectedState: state.selectedState,
      };

    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case ACTIONS.LOAD_URL_PARAMS:
      return { ...state, ...action.payload, currentPage: 1 };

    default:
      return state;
  }
}

// Component for filter section to reduce repetition
const FilterSection = ({
  title,
  items,
  selectedItems,
  onToggle,
  showDropdown,
  onToggleDropdown,
  renderItem,
}) => {
  return (
    <div className="filter-section">
      <div
        className="filter-section-header"
        onClick={() => onToggleDropdown(title)}
        data-testid={`toggle-${title.toLowerCase()}`}
      >
        <h3 className="filter-section-title">{title}</h3>
        {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {showDropdown && (
        <ul className="filter-dropdown-content">
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>
              <label className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => onToggle(item)}
                  className="filter-checkbox"
                />
                {renderItem ? renderItem(item) : item}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  onToggleDropdown: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
};

// Star rating component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`star-${i}`} className="star-filled" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="star-half" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <FaStar key={`star-empty-${i}`} className="star-empty" />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

// Doctor card component
const DoctorCard = ({ doctor, onClick }) => {
  const getDoctorImage = (doctorPhoto) => {
    if (!doctorPhoto) return defaultUser;
    return doctorPhoto.startsWith("http")
      ? doctorPhoto
      : `data:image/jpeg;base64,${doctorPhoto}`;
  };

  return (
    <div
      className="doctor-card"
      //  onClick={() => onClick(doctor)}
    >
      <div className="doctor-card-left">
        <div className="doctor-image-container">
          <img
            src={getDoctorImage(doctor.doctorPhoto)}
            alt={`Dr. ${doctor.fullName}`}
            className="doctor-image"
          />
        </div>
        <button
          className="book-appointment-btn"
          onClick={() => onClick(doctor)}
        >
          See More
        </button>
      </div>

      <div className="findDoc-doctor-info">
        <h3 className="findDoc-doctor-name">
          Dr. {doctor.fullName?.toUpperCase() || "Not Mentioned"}
        </h3>

        <div className="doctor-specialty">
          <span className="doctor-specialty-info-label">Specialty:</span>
          <span className="doctor-specialty-info-value">
            {doctor.medicalSpeciality || "Not Mentioned"}
          </span>
        </div>

        <div className="doctor-meta-info">
          <div className="doctor-meta-item">
            <MdWorkOutline className="meta-icon" />
            <span>
              {doctor.experience}{" "}
              {parseInt(doctor.experience) > 1 ? "years" : "year"}
            </span>
          </div>

          <div className="doctor-meta-item">
            <FaLocationArrow className="meta-icon" />
            <span>
              {doctor.city},{" "}
              {doctor.state !== "Not Mentioned" ? doctor.state : ""}
            </span>
          </div>

          <div className="doctor-meta-item">
            <FaLanguage className="meta-icon" />
            <span>{(doctor.languages || ["English"]).join(", ")}</span>
          </div>
        </div>

        <div className="doctor-bottom-info">
          <div className="fee-info">
            {/* <RiMoney2Line className="meta-icon" /> */}
            <span>₹{doctor.consultationFee}</span>
          </div>

          <div className="rating-info">
            <StarRating rating={doctor.rating || 0} />
            <span className="rating-value">({doctor.rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Main component
const FindDoctorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract URL params
  const queryParams = new URLSearchParams(location.search);
  const specialityFromURL = queryParams.get("speciality") || "";

  // Use reducer for filter state management
  const [filterState, dispatch] = useReducer(filterReducer, {
    ...initialFilterState,
    searchQuery: specialityFromURL,
  });

  // Destructure state for easier access
  const {
    searchQuery,
    selectedState,
    selectedSymptoms,
    selectedSpecialties,
    selectedLocations,
    selectedFees,
    selectedRatings,
    selectedLanguages,
    selectedAvailability,
    selectedExperience,
    currentPage,
  } = filterState;

  // Component state
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dropdown visibility states
  const [dropdownStates, setDropdownStates] = useState({
    Symptoms: false,
    Specialty: false,
    Location: false,
    "Consultation Fee": false,
    Rating: false,
    Language: false,
    Availability: false,
    Experience: false,
  });

  // Toggle mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(GET_DOCTOR_API_URL);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Update search query from URL
  useEffect(() => {
    if (specialityFromURL) {
      dispatch({
        type: ACTIONS.LOAD_URL_PARAMS,
        payload: { searchQuery: specialityFromURL },
      });
    }
  }, [specialityFromURL]);

  // Toggle dropdown visibility
  const toggleFilterDropdown = useCallback((section) => {
    setDropdownStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }, []);

  // Handle filter changes
  const handleToggleFilter = useCallback((category, value) => {
    dispatch({
      type: ACTIONS.TOGGLE_FILTER_ITEM,
      payload: { category, value },
    });
  }, []);

  // Remove selected filter
  const removeFilter = useCallback((category, value) => {
    dispatch({
      type: ACTIONS.REMOVE_FILTER_ITEM,
      payload: { category, value },
    });
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ALL_FILTERS });
  }, []);

  // Filter doctors based on criteria
  const filteredDoctors = useMemo(() => {
    const normalizedSearch = normalize(searchQuery);

    // Helper functions to check if a doctor matches each filter
    const matchesSymptomFilter = (doctor) => {
      if (selectedSymptoms.length === 0) return true;

      return selectedSymptoms.some((symptom) => {
        const specialtiesForSymptom = SYMPTOM_TO_SPECIALTY_MAP[symptom] || [];
        return specialtiesForSymptom.includes(doctor.medicalSpeciality);
      });
    };

    const matchesSpecialtyFilter = (doctor) => {
      if (selectedSpecialties.length === 0) return true;
      return selectedSpecialties.some((specialty) =>
        normalize(doctor.medicalSpeciality).includes(normalize(specialty))
      );
    };

    const matchesLocationFilter = (doctor) => {
      if (selectedLocations.length === 0) return true;
      return selectedLocations.some(
        (location) =>
          normalize(doctor.city).includes(normalize(location)) ||
          normalize(doctor.state).includes(normalize(location))
      );
    };

    const matchesFeeFilter = (doctor) => {
      if (selectedFees.length === 0) return true;
      const doctorFee =
        doctor.consultationFee || Math.floor(Math.random() * 5000) + 100;
      return selectedFees.some((fee) => doctorFee <= fee);
    };

    const matchesRatingFilter = (doctor) => {
      if (selectedRatings.length === 0) return true;
      const doctorRating = doctor.rating || Math.floor(Math.random() * 5) + 1;
      return selectedRatings.includes(doctorRating);
    };

    const matchesLanguageFilter = (doctor) => {
      if (selectedLanguages.length === 0) return true;
      const doctorLanguages = doctor.languages || ["English"];
      return selectedLanguages.some((language) =>
        doctorLanguages.includes(language)
      );
    };

    const matchesAvailabilityFilter = (doctor) => {
      if (selectedAvailability.length === 0) return true;
      const doctorAvailability = doctor.availability || ["Morning", "Evening"];
      return selectedAvailability.some((time) =>
        doctorAvailability.includes(time)
      );
    };

    const matchesExperienceFilter = (doctor) => {
      if (selectedExperience.length === 0) return true;

      const getExperienceCategory = (years) => {
        if (years <= 3) return "1-3 years";
        if (years <= 5) return "3-5 years";
        if (years <= 10) return "5-10 years";
        return "10+ years";
      };

      const doctorExperienceYears = parseInt(doctor.experience) || 5;
      const doctorExperienceCategory = getExperienceCategory(
        doctorExperienceYears
      );

      return selectedExperience.includes(doctorExperienceCategory);
    };

    // Always show API data first, then static data (optionally comment out static data)
    let filterAllDoctors = (doctorList) =>
      doctorList
        .filter(
          (doctor) =>
            (normalizedSearch === "" ||
              matchSpeciality(doctor.medicalSpeciality, normalizedSearch)) &&
            (selectedState === "" ||
              normalize(doctor.state) === normalize(selectedState))
        )
        .filter(
          (doctor) =>
            matchesSymptomFilter(doctor) &&
            matchesSpecialtyFilter(doctor) &&
            matchesLocationFilter(doctor) &&
            matchesFeeFilter(doctor) &&
            matchesRatingFilter(doctor) &&
            matchesLanguageFilter(doctor) &&
            matchesAvailabilityFilter(doctor) &&
            matchesExperienceFilter(doctor)
        );

    if (doctors.length > 0) {
      return filterAllDoctors(doctors);
    }
    if (error) {
      // Show error banner as the first item, then static data
      return [
        {
          isErrorBanner: true,
          errorMessage:
            "Unable to fetch doctors from the server. Showing limited static data below.",
        },
        ...filterAllDoctors(
          doctorDetails.map((doc, index) => ({
            id: `dummy-${index}`,
            fullName: doc.name || "Not Mentioned",
            medicalSpeciality: doc.speciality || "Not Mentioned",
            experience: "5",
            city: doc.locality || "Not Mentioned",
            state: "Not Mentioned",
            country: "India",
            hospitalCurrentWorking: doc.Address || "Not Mentioned",
            medicalLicenseNumber: "Not Mentioned",
            doctorPhoto: null,
            phone: isNaN(doc.phone) ? "Not Mentioned" : doc.phone,
            email: doc.email || "Not Mentioned",
            consultationFee: Math.floor(Math.random() * 5000) + 100,
            rating: Math.floor(Math.random() * 5) + 1,
            languages: ["English", Math.random() > 0.5 ? "Hindi" : "Tamil"],
            availability: [
              Math.random() > 0.5 ? "Morning" : "Afternoon",
              Math.random() > 0.5 ? "Evening" : "Night",
            ],
          }))
        ),
      ];
    }
    // If no API data and no error, show static data with info banner
    return [
      {
        isErrorBanner: true,
        errorMessage:
          "No doctors found from server, showing static data. (No error from server.)",
      },
      ...filterAllDoctors(
        doctorDetails.map((doc, index) => ({
          id: `dummy-${index}`,
          fullName: doc.name || "Not Mentioned",
          medicalSpeciality: doc.speciality || "Not Mentioned",
          experience: "5",
          city: doc.locality || "Not Mentioned",
          state: "Not Mentioned",
          country: "India",
          hospitalCurrentWorking: doc.Address || "Not Mentioned",
          medicalLicenseNumber: "Not Mentioned",
          doctorPhoto: null,
          phone: isNaN(doc.phone) ? "Not Mentioned" : doc.phone,
          email: doc.email || "Not Mentioned",
          consultationFee: Math.floor(Math.random() * 5000) + 100,
          rating: Math.floor(Math.random() * 5) + 1,
          languages: ["English", Math.random() > 0.5 ? "Hindi" : "Tamil"],
          availability: [
            Math.random() > 0.5 ? "Morning" : "Afternoon",
            Math.random() > 0.5 ? "Evening" : "Night",
          ],
        }))
      ),
    ];
  }, [
    doctors,
    searchQuery,
    selectedState,
    selectedSymptoms,
    selectedSpecialties,
    selectedLocations,
    selectedFees,
    selectedRatings,
    selectedLanguages,
    selectedAvailability,
    selectedExperience,
  ]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE,
    currentPage * DOCTORS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: newPage });
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to doctor profile
  const navigateToDoctorProfile = (doctor) => {
    navigate(`/doctorID/${doctor.email}`, { state: { doctor } }); //can change the page url
  };

  // Check if any filters are applied
  const hasActiveFilters =
    selectedSymptoms.length > 0 ||
    selectedSpecialties.length > 0 ||
    selectedLocations.length > 0 ||
    selectedFees.length > 0 ||
    selectedRatings.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedAvailability.length > 0 ||
    selectedExperience.length > 0;

  return (
    <div className="find-doctor-page">
      <div className="findDoc-search-container">
        <div className="findDoc-search-bar-wrapper">
          <div className="findDoc-search-input-group">
            <BiSearchAlt className="findDoc-search-icon" />
            <input
            
              type="text"
              placeholder="Search by specialization"
              className="findDoc-search-input1"
              value={searchQuery}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.SET_SEARCH_QUERY,
                  payload: e.target.value,
                })
              }
            />
          </div>

          <div className="findDoc-search-input-group">
            <FaLocationArrow className="findDoc-search-icon-2" />
            <select
              className="state-dropdown"
              value={selectedState}
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.SET_SELECTED_STATE,
                  payload: e.target.value,
                })
              }
            >
              <option value="">All States</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="find-doctor-content">
        {/* Mobile filter toggle button */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <BiFilterAlt /> {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filter sidebar - with mobile responsive class */}
        <aside
          className={`filter-sidebar ${showMobileFilters ? "show-mobile" : ""}`}
        >
          <div className="filter-header">
            <h2>Filter Doctors</h2>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                <MdClear /> Clear All
              </button>
            )}
          </div>

          {/* Selected filters display */}
          {hasActiveFilters && (
            <div className="selected-filters">
              <h3>Applied Filters</h3>
              <div className="filter-tags">
                {selectedSymptoms.map((symptom) => (
                  <span key={symptom} className="filter-tag">
                    {symptom}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeFilter("selectedSymptoms", symptom)}
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedSpecialties.map((specialty) => (
                  <span key={specialty} className="filter-tag">
                    {specialty}
                    <button
                      className="filter-tag-remove"
                      onClick={() =>
                        removeFilter("selectedSpecialties", specialty)
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedLocations.map((location) => (
                  <span key={location} className="filter-tag">
                    {location}
                    <button
                      className="filter-tag-remove"
                      onClick={() =>
                        removeFilter("selectedLocations", location)
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedFees.map((fee) => (
                  <span key={fee} className="filter-tag">
                    ₹{fee}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeFilter("selectedFees", fee)}
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedRatings.map((rating) => (
                  <span key={rating} className="filter-tag">
                    {rating} ★
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeFilter("selectedRatings", rating)}
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedLanguages.map((language) => (
                  <span key={language} className="filter-tag">
                    {language}
                    <button
                      className="filter-tag-remove"
                      onClick={() =>
                        removeFilter("selectedLanguages", language)
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedAvailability.map((time) => (
                  <span key={time} className="filter-tag">
                    {time}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeFilter("selectedAvailability", time)}
                    >
                      ×
                    </button>
                  </span>
                ))}

                {selectedExperience.map((exp) => (
                  <span key={exp} className="filter-tag">
                    {exp}
                    <button
                      className="filter-tag-remove"
                      onClick={() => removeFilter("selectedExperience", exp)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Filter sections */}
          <FilterSection
            title="Symptoms"
            items={SYMPTOMS}
            selectedItems={selectedSymptoms}
            onToggle={(item) => handleToggleFilter("selectedSymptoms", item)}
            showDropdown={dropdownStates.Symptoms}
            onToggleDropdown={toggleFilterDropdown}
          />

          <FilterSection
            title="Specialty"
            items={SPECIALTIES}
            selectedItems={selectedSpecialties}
            onToggle={(item) => handleToggleFilter("selectedSpecialties", item)}
            showDropdown={dropdownStates.Specialty}
            onToggleDropdown={toggleFilterDropdown}
          />

          <FilterSection
            title="Location"
            items={LOCATIONS}
            selectedItems={selectedLocations}
            onToggle={(item) => handleToggleFilter("selectedLocations", item)}
            showDropdown={dropdownStates.Location}
            onToggleDropdown={toggleFilterDropdown}
          />

          <FilterSection
            title="Consultation Fee"
            items={FEES}
            selectedItems={selectedFees}
            onToggle={(item) => handleToggleFilter("selectedFees", item)}
            showDropdown={dropdownStates["Consultation Fee"]}
            onToggleDropdown={toggleFilterDropdown}
            renderItem={(fee) => `₹${fee} or less`}
          />

          <FilterSection
            title="Rating"
            items={RATINGS}
            selectedItems={selectedRatings}
            onToggle={(item) => handleToggleFilter("selectedRatings", item)}
            showDropdown={dropdownStates.Rating}
            onToggleDropdown={toggleFilterDropdown}
            renderItem={(rating) => (
              <div className="rating-option">
                {rating} {rating === 1 ? "Star" : "Stars"}
              </div>
            )}
          />

          <FilterSection
            title="Language"
            items={LANGUAGES}
            selectedItems={selectedLanguages}
            onToggle={(item) => handleToggleFilter("selectedLanguages", item)}
            showDropdown={dropdownStates.Language}
            onToggleDropdown={toggleFilterDropdown}
          />

          <FilterSection
            title="Availability"
            items={AVAILABILITY}
            selectedItems={selectedAvailability}
            onToggle={(item) =>
              handleToggleFilter("selectedAvailability", item)
            }
            showDropdown={dropdownStates.Availability}
            onToggleDropdown={toggleFilterDropdown}
            renderItem={(time) => (
              <div className="availability-option">
                <MdOutlineCalendarMonth className="option-icon" /> {time}
              </div>
            )}
          />

          <FilterSection
            title="Experience"
            items={EXPERIENCE}
            selectedItems={selectedExperience}
            onToggle={(item) => handleToggleFilter("selectedExperience", item)}
            showDropdown={dropdownStates.Experience}
            onToggleDropdown={toggleFilterDropdown}
            renderItem={(exp) => (
              <div className="experience-option">
                <MdWorkOutline className="option-icon" /> {exp}
              </div>
            )}
          />
        </aside>
        {/* Main content area */}

        <main className="doctor-results">
          <div className="results-header">
            <h2 className="results-title">
              {loading
                ? "Loading doctors..."
                : `Found ${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  }`}
            </h2>

            {filteredDoctors.length > 0 && !loading && (
              <div className="pagination-info">
                Showing {(currentPage - 1) * DOCTORS_PER_PAGE + 1} -{" "}
                {Math.min(
                  currentPage * DOCTORS_PER_PAGE,
                  filteredDoctors.length
                )}{" "}
                of {filteredDoctors.length} doctors
              </div>
            )}
          </div>

          {/* Doctor cards section */}
          <div className="doctor-list">
            {/* Show error/info banner if present as first item in paginatedDoctors */}
            {paginatedDoctors.length > 0 &&
              paginatedDoctors[0].isErrorBanner && (
                <div className="doctor-error-banner">
                  {paginatedDoctors[0].errorMessage}
                </div>
              )}
            {/* Render doctor cards, skipping the error banner object if present */}
            {paginatedDoctors
              .filter((doc) => !doc.isErrorBanner)
              .map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onClick={navigateToDoctorProfile}
                />
              ))}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt; Previous
                </button>

                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Only show a window of pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`page-number ${
                            pageNumber === currentPage ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    }

                    // Add ellipsis for skipped pages
                    if (pageNumber === 2 || pageNumber === totalPages - 1) {
                      return (
                        <span key={pageNumber} className="page-ellipsis">
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>

                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next &gt;
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindDoctorPage;
