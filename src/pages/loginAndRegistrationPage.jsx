import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import googleLogo from "../assets/icons/google.png";
import doctorImage from "../assets/Images/docRegister.png";
import "./loginAndRegistrationPage.css";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  FlaskConical,
  Pill,
  UserCheck,
  ArrowLeft,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("");
  const [healthcareType, setHealthcareType] = useState("");
  const [showHealthcareTypes, setShowHealthcareTypes] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formAnimationClass, setFormAnimationClass] = useState("");
  const {
    isLoggedIn,
    login,
    logout,
    isUser,
    isDoctor,
    setUser,
    setDoctor,
    loginPersonMail,
    setLoginPersonEmail,
  } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Reset animation class to trigger animation on tab or role change
    setFormAnimationClass("form-fade-in");
    const timer = setTimeout(() => {
      setFormAnimationClass("");
    }, 500);

    return () => clearTimeout(timer);
  }, [activeTab, role, healthcareType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Username validation
    if (activeTab === "register" && !formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (activeTab === "register" && formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol.";
      isValid = false;
    }

    // Confirm password validation (only for registration)
    if (
      activeTab === "register" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    //here it takes default role as user
    let LOGIN_API_URL = "http://localhost:8080/user/login";

    if (role === "healthcare") {
      if (healthcareType === "doctor") {
        LOGIN_API_URL = "http://localhost:8080/doctor/login";
      } else if (healthcareType === "pharmacist") {
        LOGIN_API_URL = "http://localhost:8080/pharmacist/login";
      } else if (healthcareType === "diagnostics") {
        LOGIN_API_URL = "http://localhost:8080/diagnostics/login";
      } else {
        LOGIN_API_URL = "http://localhost:8080/healthcare/login";
      }
    }

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        try {
          setLoginPersonEmail(formData.email);
        } catch (error) {
          console.error(
            "Error while setting loginPersonMail to login context",
            error
          );
          window.alert("Error while setting loginPersonMail to login context");
        }
        // Set login state and role in context
        setUser({
          email: formData.email,
          role: role === "healthcare" ? healthcareType : "user",
        });

        setDoctor(role === "healthcare" && healthcareType === "doctor");
        // Success notification
        if (role === "user") {
          navigate("/userDashboard");
        } else if (role === "healthcare") {
          if (healthcareType === "doctor") {
            setDoctor(true);
            navigate("/docDashboard");
          } 
        }
        showNotification(`Login successful! Welcome back : ${role}`, "success");
      } else {
        const errorMessage = await response.text();
        showNotification(`Login failed: ${errorMessage}`, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showNotification(
        "An error occurred during login. Please try again.",
        "error"
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: role === "healthcare" ? healthcareType || "other" : "user",
    };

    let REGISTER_API_URL = "http://localhost:8080/user/register";

    if (role === "healthcare") {
      if (healthcareType === "doctor") {
        REGISTER_API_URL = "http://localhost:8080/doctor/register";
      } else if (healthcareType === "pharmacist") {
        REGISTER_API_URL = "http://localhost:8080/pharmacist/register";
      } else if (healthcareType === "diagnostics") {
        REGISTER_API_URL = "http://localhost:8080/diagnostics/register";
      } else {
        REGISTER_API_URL = "http://localhost:8080/healthcare/register";
      }
    }

    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setUser({
          email: formData.email,
          role: role === "healthcare" ? healthcareType : "user",
        });
        setDoctor(role === "healthcare" && healthcareType === "doctor");

        showNotification(
          "Registration successful! You can now log in.",
          "success"
        );

        if (role === "healthcare" && healthcareType === "doctor") {
          navigate("/doctorVerificationpage", {
            state: { email: formData.email },
          });
        } else {
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setRole("");
          setHealthcareType("");
          setActiveTab("login");
        }
      } else {
        let errorMessage = "Registration failed. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          console.error("Error parsing backend error message:", e);
        }
        showNotification(`Registration failed: ${errorMessage}`, "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showNotification("An error occurred during registration.", "error");
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const showLogin = () => {
    setActiveTab("login");
    setRole("");
    setHealthcareType("");
    setShowHealthcareTypes(false);
  };

  const showRegister = () => {
    setActiveTab("register");
    setRole("");
    setHealthcareType("");
    setShowHealthcareTypes(false);
  };

  const showDoctorForm = () => {
    setRole("healthcare");
    setShowHealthcareTypes(true);
  };

  const showUserForm = () => {
    setRole("user");
    setShowHealthcareTypes(false);
  };

  const selectHealthcareType = (type) => {
    setHealthcareType(type);
    setShowHealthcareTypes(false);
  };

  const goBack = () => {
    if (showHealthcareTypes) {
      setShowHealthcareTypes(false);
      setRole("");
    } else if (healthcareType) {
      setHealthcareType("");
      setShowHealthcareTypes(true);
    } else {
      setRole("");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="brand-area">
            <h1 className="brand-name">Verified Health Care</h1>
            <p className="brand-tagline">Your Health, Our Priority</p>
          </div>
          <div className="illustration">
            <img src={doctorImage} alt="Healthcare professionals" />
          </div>
          <div className="testimonial">
            <p>
              "Verified Health Care transformed how I connect with my patients.
              Highly recommended for all healthcare professionals!"
            </p>
            <div className="testimonial-author">
              Dr. SeethaRam , Cardiologist
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={showLogin}
            >
              Login
            </button>
            <button
              className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
              onClick={showRegister}
            >
              Register
            </button>
          </div>

          <div className={`auth-form-container ${formAnimationClass}`}>
            <h2 className="auth-title">
              {activeTab === "login" ? "Welcome Back" : "Create Your Account"}
              {role &&
                activeTab === "login" &&
                ` | ${
                  role === "healthcare" ? "Healthcare Professional" : "User"
                }`}
              {role &&
                activeTab === "register" &&
                ` | ${
                  role === "healthcare" ? "Healthcare Professional" : "User"
                }`}
              {healthcareType &&
                ` | ${
                  healthcareType.charAt(0).toUpperCase() +
                  healthcareType.slice(1)
                }`}
            </h2>

            {/* Role Selection */}
            {!role && (
              <div className="role-selection">
                <p className="selection-prompt">
                  {activeTab === "login"
                    ? "Select your role to continue:"
                    : "I would like to register as:"}
                </p>
                <div className="role-buttons">
                  <button
                    className="role-btn healthcare"
                    onClick={showDoctorForm}
                  >
                    <Stethoscope className="role-icon" size={20} />
                    <span className="role-text">Healthcare Professional</span>
                  </button>
                  <button className="role-btn user" onClick={showUserForm}>
                    <User className="role-icon" size={20} />
                    <span className="role-text">User</span>
                  </button>
                </div>
              </div>
            )}

            {/* Healthcare Type Selection */}
            {role === "healthcare" && showHealthcareTypes && (
              <div className="healthcare-type-selection">
                <p className="selection-prompt">
                  What type of healthcare professional are you?
                </p>
                <div className="healthcare-type-buttons">
                  <button
                    className="healthcare-type-btn"
                    onClick={() => selectHealthcareType("doctor")}
                  >
                    <Stethoscope className="type-icon" size={20} />
                    <span className="type-text">Doctor</span>
                  </button>
                  <button
                    className="healthcare-type-btn"
                    onClick={() => selectHealthcareType("diagnostics")}
                  >
                    <FlaskConical className="type-icon" size={20} />
                    <span className="type-text">LabT echnician</span>
                  </button>
                  <button
                    className="healthcare-type-btn"
                    onClick={() => selectHealthcareType("pharmacist")}
                  >
                    <Pill className="type-icon" size={20} />
                    <span className="type-text">Pharmacist</span>
                  </button>
                  <button
                    className="healthcare-type-btn"
                    onClick={() => selectHealthcareType("other")}
                  >
                    <UserCheck className="type-icon" size={20} />
                    <span className="type-text">Other Healthcare</span>
                  </button>
                </div>
                <button className="back-button" onClick={goBack}>
                  <ArrowLeft className="back-icon" size={18} /> Back
                </button>
              </div>
            )}

            {/* Login Form */}
            {activeTab === "login" && role && !showHealthcareTypes && (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "error" : ""}
                      required
                    />
                    <span
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <Eye className="eye-icon" size={18} />
                      ) : (
                        <EyeOff className="eye-icon" size={18} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#forgot-password" className="forgot-password">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="submit-btn">
                  Login
                </button>

                <div className="social-login">
                  <p>Or continue with</p>
                  <div className="social-buttons">
                    <button type="button" className="social-btn google">
                      <img
                        src={googleLogo}
                        alt="Google"
                        className="social-icon"
                      />
                      <span>Google</span>
                    </button>
                  </div>
                </div>

                <button type="button" onClick={goBack} className="back-button">
                  <ArrowLeft className="back-icon" size={18} /> Back
                </button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && role && !showHealthcareTypes && (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label htmlFor="username">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your full name"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={errors.username ? "error" : ""}
                      required
                    />
                  </div>
                  {errors.username && (
                    <div className="error-message">{errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email">Email</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="reg-password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "error" : ""}
                      required
                    />
                    <span
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <Eye className="eye-icon" size={18} />
                      ) : (
                        <EyeOff className="eye-icon" size={18} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={18} />
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "error" : ""}
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" name="terms" required />
                  <label htmlFor="terms">
                    I agree to the <a href="#terms">Terms of Service</a> and{" "}
                    <a href="#privacy">Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  Create Account
                </button>

                <button type="button" onClick={goBack} className="back-button">
                  <ArrowLeft className="back-icon" size={18} /> Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
