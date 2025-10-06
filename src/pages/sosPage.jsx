import { useState, useRef, useEffect } from "react";
import "./sosPage.css";

const EmergencySOS = () => {
  const [mode, setMode] = useState("standby"); // standby, countdown, active, recovery
  const [timer, setTimer] = useState(3);
  const [selectedProfile, setSelectedProfile] = useState("general");
  const [notification, setNotification] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPanel, setCurrentPanel] = useState("main");
  const [breathingGuide, setBreathingGuide] = useState(false);
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const beaconRef = useRef(null);
  
  // Profiles with different emergency settings
  const profiles = {
    general: {
      name: "General Emergency",
      icon: "🆘",
      color: "#E63946",
      message: "I need immediate assistance. This is an emergency."
    },
    medical: {
      name: "Medical",
      icon: "🩺",
      color: "#457B9D",
      message: "I need urgent medical assistance."
    },
    safety: {
      name: "Personal Safety",
      icon: "🛡️",
      color: "#1D3557",
      message: "I feel unsafe and need immediate help."
    },
    travel: {
      name: "Travel",
      icon: "🚗",
      color: "#F4A261",
      message: "I'm stranded and need assistance."
    }
  };
  
  useEffect(() => {
    // Animation for beacon effect
    if (mode === "active" && beaconRef.current) {
      const interval = setInterval(() => {
        if (beaconRef.current) {
          beaconRef.current.classList.remove("sos__beacon-pulse");
          setTimeout(() => {
            if (beaconRef.current) {
              beaconRef.current.classList.add("sos__beacon-pulse");
            }
          }, 10);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [mode]);
  
  // Handle countdown and activation
  useEffect(() => {
    if (mode === "countdown" && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (mode === "countdown" && timer === 0) {
      activateEmergency();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [mode, timer]);

  const triggerCountdown = () => {
    setMode("countdown");
    setTimer(3);
    showNotification("Hold on, SOS activating in 3 seconds", "warning");
  };

  const activateEmergency = () => {
    setMode("active");
    
    // Play alert sound
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
    
    // Send alerts (simulation)
    const activeProfile = profiles[selectedProfile];
    showNotification(`Emergency alert sent: ${activeProfile.message}`, "alert");
    
    // In a real app, API calls would happen here
    console.log("SOS ACTIVATED", {
      profile: selectedProfile,
      message: activeProfile.message,
      timestamp: new Date().toISOString()
    });
  };
  
  const cancelEmergency = () => {
    if (mode === "countdown") {
      setMode("standby");
      showNotification("SOS activation canceled", "info");
    } else if (mode === "active") {
      setMode("recovery");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      showNotification("Emergency mode deactivated", "success");
      
      // Auto-return to standby after recovery
      setTimeout(() => {
        setMode("standby");
      }, 3000);
    }
  };
  
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  
  const toggleBreathingGuide = () => {
    setBreathingGuide(!breathingGuide);
  };
  
  return (
    <div className="sos__container">
      {/* Mobile menu */}
      <div className="sos__mobile-header">
        <h1 className="sos__title">Emergency<span>SOS</span></h1>
        <button 
          className="sos__menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      
      {/* Side menu */}
      <div className={`sos__sidebar ${menuOpen ? "sos__sidebar--open" : ""}`}>
        <div className="sos__logo">
          <span className="sos__logo-icon">🚨</span>
          <h2 className="sos__logo-text">QuickSOS</h2>
        </div>
        
        <nav className="sos__nav">
          <button 
            className={`sos__nav-item ${currentPanel === "main" ? "sos__nav-item--active" : ""}`}
            onClick={() => {setCurrentPanel("main"); setMenuOpen(false);}}
          >
            <span className="sos__nav-icon">🏠</span>
            Emergency Hub
          </button>
          
          <button 
            className={`sos__nav-item ${currentPanel === "profiles" ? "sos__nav-item--active" : ""}`}
            onClick={() => {setCurrentPanel("profiles"); setMenuOpen(false);}}
          >
            <span className="sos__nav-icon">👤</span>
            Emergency Profiles
          </button>
          
          <button 
            className={`sos__nav-item ${currentPanel === "contacts" ? "sos__nav-item--active" : ""}`}
            onClick={() => {setCurrentPanel("contacts"); setMenuOpen(false);}}
          >
            <span className="sos__nav-icon">📞</span>
            Emergency Contacts
          </button>
          
          <button 
            className={`sos__nav-item ${currentPanel === "map" ? "sos__nav-item--active" : ""}`}
            onClick={() => {setCurrentPanel("map"); setMenuOpen(false);}}
          >
            <span className="sos__nav-icon">🗺️</span>
            Location Services
          </button>
          
          <button 
            className={`sos__nav-item ${currentPanel === "settings" ? "sos__nav-item--active" : ""}`}
            onClick={() => {setCurrentPanel("settings"); setMenuOpen(false);}}
          >
            <span className="sos__nav-icon">⚙️</span>
            Settings
          </button>
        </nav>
        
        <div className="sos__help-section">
          <button 
            className="sos__help-button"
            onClick={toggleBreathingGuide}
          >
            <span className="sos__help-icon">🧘</span>
            Breathing Exercise
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <main className="sos__main-content">
        {/* Notification */}
        {notification && (
          <div className={`sos__notification sos__notification--${notification.type}`}>
            <p className="sos__notification-text">{notification.message}</p>
          </div>
        )}
        
        {/* Breathing guide overlay */}
        {breathingGuide && (
          <div className="sos__breathing-overlay">
            <div className="sos__breathing-content">
              <button 
                className="sos__breathing-close"
                onClick={toggleBreathingGuide}
              >
                ✕
              </button>
              <h3 className="sos__breathing-title">Calming Breath</h3>
              <div className="sos__breathing-circle">
                <div className="sos__breathing-animation"></div>
                <div className="sos__breathing-text">Breathe</div>
              </div>
              <p className="sos__breathing-instruction">
                Inhale for 4 seconds, hold for 4 seconds, exhale for 6 seconds
              </p>
            </div>
          </div>
        )}
        
        {/* Main Emergency Panel */}
        {currentPanel === "main" && (
          <div className="sos__emergency-panel">
            <h2 className="sos__panel-title">Emergency Response Center</h2>
            
            <div className="sos__status-indicator">
              <span className={`sos__status-dot sos__status-dot--${mode}`}></span>
              <span className="sos__status-text">
                {mode === "standby" && "Ready to Assist"}
                {mode === "countdown" && "Countdown: Activating SOS"}
                {mode === "active" && "SOS ACTIVE - HELP ON THE WAY"}
                {mode === "recovery" && "Emergency Deactivated"}
              </span>
            </div>
            
            <div className="sos__profile-selector">
              <h3 className="sos__section-title">Selected Emergency Type</h3>
              <div className="sos__profile-cards">
                {Object.keys(profiles).map(key => (
                  <button
                    key={key}
                    className={`sos__profile-card ${selectedProfile === key ? "sos__profile-card--selected" : ""}`}
                    onClick={() => mode === "standby" && setSelectedProfile(key)}
                    disabled={mode !== "standby"}
                    style={{
                      borderColor: profiles[key].color,
                      backgroundColor: selectedProfile === key ? `${profiles[key].color}22` : "transparent"
                    }}
                  >
                    <span className="sos__profile-icon">{profiles[key].icon}</span>
                    <span className="sos__profile-name">{profiles[key].name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="sos__action-zone">
              {mode === "standby" && (
                <button 
                  className="sos__trigger-button"
                  onClick={triggerCountdown}
                  style={{backgroundColor: profiles[selectedProfile].color}}
                >
                  <span className="sos__trigger-icon">{profiles[selectedProfile].icon}</span>
                  <span className="sos__trigger-text">Activate Emergency SOS</span>
                </button>
              )}
              
              {mode === "countdown" && (
                <div className="sos__countdown">
                  <div className="sos__countdown-circle">
                    <span className="sos__countdown-number">{timer}</span>
                  </div>
                  <button 
                    className="sos__cancel-button"
                    onClick={cancelEmergency}
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {mode === "active" && (
                <div className="sos__active-container">
                  <div className="sos__beacon" ref={beaconRef}>
                    <div className="sos__beacon-inner">
                      <span className="sos__beacon-text">SOS</span>
                    </div>
                  </div>
                  <div className="sos__active-message">
                    <p>Emergency services have been notified</p>
                    <p>Help is on the way</p>
                  </div>
                  <button 
                    className="sos__cancel-button sos__cancel-button--large"
                    onClick={cancelEmergency}
                  >
                    Deactivate Emergency
                  </button>
                </div>
              )}
              
              {mode === "recovery" && (
                <div className="sos__recovery">
                  <div className="sos__recovery-icon">✓</div>
                  <p className="sos__recovery-text">Emergency alert deactivated</p>
                  <p className="sos__recovery-subtext">Returning to standby...</p>
                </div>
              )}
            </div>
            
            <div className="sos__info-cards">
              <div className="sos__info-card">
                <h3 className="sos__info-title">Current Location</h3>
                <div className="sos__info-content">
                  <p className="sos__location-status">
                    <span className="sos__location-dot"></span>
                    Location Services Active
                  </p>
                  <p className="sos__location-address">123 Main Street, Springfield</p>
                  <p className="sos__location-coords">37.7749° N, 122.4194° W</p>
                </div>
              </div>
              
              <div className="sos__info-card">
                <h3 className="sos__info-title">Primary Contact</h3>
                <div className="sos__info-content">
                  <p className="sos__contact-name">Emergency Services</p>
                  <p className="sos__contact-number">911</p>
                  <button className="sos__contact-call">Call Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Profiles Panel */}
        {currentPanel === "profiles" && (
          <div className="sos__profiles-panel">
            <h2 className="sos__panel-title">Emergency Profiles</h2>
            <p className="sos__panel-description">
              Customize emergency profiles with specific messages and contacts
            </p>
            
            <div className="sos__profiles-list">
              {Object.keys(profiles).map(key => (
                <div 
                  key={key} 
                  className="sos__profile-edit-card"
                  style={{borderLeftColor: profiles[key].color}}
                >
                  <div className="sos__profile-edit-header">
                    <span className="sos__profile-edit-icon">{profiles[key].icon}</span>
                    <h3 className="sos__profile-edit-name">{profiles[key].name}</h3>
                  </div>
                  <div className="sos__profile-edit-body">
                    <div className="sos__profile-edit-field">
                      <label className="sos__profile-label">Emergency Message</label>
                      <input 
                        type="text" 
                        className="sos__profile-input" 
                        value={profiles[key].message}
                        readOnly
                      />
                    </div>
                    <div className="sos__profile-edit-actions">
                      <button className="sos__profile-edit-button">Edit</button>
                      {selectedProfile !== key && (
                        <button 
                          className="sos__profile-select-button"
                          onClick={() => setSelectedProfile(key)}
                        >
                          Select Profile
                        </button>
                      )}
                      {selectedProfile === key && (
                        <span className="sos__profile-selected-badge">Active</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="sos__add-profile-button">
              + Create New Profile
            </button>
          </div>
        )}
        
        {/* Contacts Panel */}
        {currentPanel === "contacts" && (
          <div className="sos__contacts-panel">
            <h2 className="sos__panel-title">Emergency Contacts</h2>
            <p className="sos__panel-description">
              These contacts will be notified in case of emergency
            </p>
            
            <div className="sos__contacts-list">
              <div className="sos__contact-card sos__contact-card--primary">
                <div className="sos__contact-primary-badge">Primary</div>
                <h3 className="sos__contact-name">Emergency Services</h3>
                <p className="sos__contact-detail">911</p>
                <div className="sos__contact-actions">
                  <button className="sos__contact-action sos__contact-action--call">Call</button>
                </div>
              </div>
              
              <div className="sos__contact-card">
                <h3 className="sos__contact-name">John Doe</h3>
                <p className="sos__contact-detail">Family - (555) 123-4567</p>
                <div className="sos__contact-actions">
                  <button className="sos__contact-action sos__contact-action--call">Call</button>
                  <button className="sos__contact-action sos__contact-action--edit">Edit</button>
                  <button className="sos__contact-action sos__contact-action--delete">Delete</button>
                </div>
              </div>
              
              <div className="sos__contact-card">
                <h3 className="sos__contact-name">Jane Smith</h3>
                <p className="sos__contact-detail">Friend - (555) 987-6543</p>
                <div className="sos__contact-actions">
                  <button className="sos__contact-action sos__contact-action--call">Call</button>
                  <button className="sos__contact-action sos__contact-action--edit">Edit</button>
                  <button className="sos__contact-action sos__contact-action--delete">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="sos__add-contact">
              <h3 className="sos__add-contact-title">Add New Contact</h3>
              <form className="sos__add-contact-form">
                <div className="sos__form-group">
                  <label className="sos__form-label">Name</label>
                  <input type="text" className="sos__form-input" placeholder="Contact name" />
                </div>
                <div className="sos__form-group">
                  <label className="sos__form-label">Relationship</label>
                  <input type="text" className="sos__form-input" placeholder="Family, Friend, etc." />
                </div>
                <div className="sos__form-group">
                  <label className="sos__form-label">Phone Number</label>
                  <input type="tel" className="sos__form-input" placeholder="Phone number" />
                </div>
                <button type="submit" className="sos__form-submit">Add Contact</button>
              </form>
            </div>
          </div>
        )}
        
        {/* Map Panel */}
        {currentPanel === "map" && (
          <div className="sos__map-panel">
            <h2 className="sos__panel-title">Location Services</h2>
            
            <div className="sos__map-container">
              <div className="sos__map-placeholder">
                <div className="sos__map-center-pin"></div>
                <div className="sos__map-zoom-controls">
                  <button className="sos__map-zoom">+</button>
                  <button className="sos__map-zoom">−</button>
                </div>
              </div>
              
              <div className="sos__location-details">
                <h3 className="sos__location-title">Your Current Location</h3>
                <p className="sos__location-text">123 Main Street, Springfield</p>
                <p className="sos__location-coords">Lat: 37.7749° N, Long: 122.4194° W</p>
                <button className="sos__location-refresh">Refresh Location</button>
                <div className="sos__location-accuracy">
                  <span className="sos__accuracy-label">Accuracy:</span>
                  <span className="sos__accuracy-value">High (±5m)</span>
                </div>
              </div>
            </div>
            
            <div className="sos__map-options">
              <h3 className="sos__section-title">Location Settings</h3>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Share Location with Emergency Contacts</h4>
                  <p className="sos__option-description">
                    Automatically share your precise location when SOS is activated
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" defaultChecked />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Track Location History</h4>
                  <p className="sos__option-description">
                    Keep record of your locations for the past 24 hours
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" defaultChecked />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Panel */}
        {currentPanel === "settings" && (
          <div className="sos__settings-panel">
            <h2 className="sos__panel-title">App Settings</h2>
            
            <div className="sos__settings-section">
              <h3 className="sos__section-title">Emergency Settings</h3>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Emergency Sound Alert</h4>
                  <p className="sos__option-description">
                    Play a loud alarm when SOS is activated
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" defaultChecked />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Countdown Duration</h4>
                  <p className="sos__option-description">
                    Time before SOS activates after pressing button
                  </p>
                </div>
                <select className="sos__select">
                  <option value="3">3 seconds</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                </select>
              </div>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Auto-Deactivate</h4>
                  <p className="sos__option-description">
                    Automatically turn off SOS after help arrives
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="sos__settings-section">
              <h3 className="sos__section-title">App Appearance</h3>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">Dark Mode</h4>
                  <p className="sos__option-description">
                    Use dark color theme
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
              
              <div className="sos__option-item">
                <div className="sos__option-text">
                  <h4 className="sos__option-title">High Contrast</h4>
                  <p className="sos__option-description">
                    Increase visibility in difficult lighting
                  </p>
                </div>
                <label className="sos__switch">
                  <input type="checkbox" />
                  <span className="sos__switch-slider"></span>
                </label>
              </div>
            </div>
            
            <div className="sos__settings-section">
              <h3 className="sos__section-title">About</h3>
              <p className="sos__about-text">
                QuickSOS v1.0.0<br />
                A revolutionary emergency response system
              </p>
              <div className="sos__settings-buttons">
                <button className="sos__settings-button">Privacy Policy</button>
                <button className="sos__settings-button">Terms of Service</button>
                <button className="sos__settings-button">Help Center</button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Hidden audio element for alert sound */}
      <audio ref={audioRef} src="/emergency-alert.mp3" />
    </div>
  );
};

export default EmergencySOS;