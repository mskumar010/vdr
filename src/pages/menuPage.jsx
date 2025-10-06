import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menuPage.css";
import { LoginContext } from "../context/loginContext";

const THEME_KEY = "vhc-theme";
const LANG_KEY = "vhc-lang";
 
const themes = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
];

export default function MenuPage() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "system"
  );
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANG_KEY) || "en"
  );

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const {
    isLoggedIn,
    isUser,
    isDoctor,
    isLabTechnician,
    setUser,
    setDoctor,
    setLabTechnician,
    setLogin,
  } = useContext(LoginContext);

  const docLogged = () => {
    setDoctor(true);
    setLabTechnician(false);
    setUser(false);
    setLogin(true);
    window.alert("Doctor logged in successfully!");
  };
  const LabTechLogged = () => {
    setLabTechnician(true);
    setDoctor(false);
    setUser(false);
    setLogin(true);
    window.alert("LabTechLogged logged in successfully!");
  };
  const userLogged = () => {
    setUser(true);
    setDoctor(false);
    setLabTechnician(false);
    setLogin(true);
    window.alert("User logged in successfully!");
  };
  const loggedOut = () => {
    setLogin(false);
    window.alert("Logged out successfully!");
  };

  return (
    <div className="menu-container">
      <h1 className="menu-heading">Preferences & Settings</h1>
<div className="menu-section">
        <h2>Quick Test Logins</h2>
        <div className="menu-btn-group" style={{ flexWrap: "wrap" }}>
          <button className="menu-btn" onClick={docLogged} type="button">
            Doc login ✅
          </button>
          <button className="menu-btn" onClick={LabTechLogged} type="button">
            LabTech login ✅
          </button>
          <button className="menu-btn" onClick={userLogged} type="button">
            User login ✅
          </button>
          <button className="menu-btn" onClick={loggedOut} type="button">
            Logout ❌
          </button>
        </div>
      </div>
      <div className="menu-section">
        <h2>Theme</h2>
        <div className="menu-btn-group">
          {themes.map((t) => (
            <button
              key={t.value}
              className={`menu-btn${theme === t.value ? " active" : ""}`}
              onClick={() => setTheme(t.value)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <h2>Notifications</h2>
        <label className="menu-toggle">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications((n) => !n)}
            style={{ width: 20, height: 20 }}
          />
          Enable notifications
        </label>
      </div>

      <div className="menu-section">
        <h2>Language</h2>
        <select
          className="menu-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-section">
        <h2>Account</h2>
        <button className="menu-account-btn">Change Password</button>
        <button className="menu-account-btn" style={{ marginRight: 0 }}>
          Delete Account
        </button>
      </div>

      <div className="menu-section">
        <h2>About & Help</h2>
        <p className="menu-about">
          Verified Doctor App v1.0
          <br />
          For support, contact{" "}
          <a href="mailto:support@vhc.com">support@vhc.com</a>
        </p>
      </div>

      
    </div>
  );
}
