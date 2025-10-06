import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export const LoginContext = createContext();

const safeLocalStorageGet = (key, fallback = false) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch (e) {
    return fallback;
  }
};

const safeLocalStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // fail silently
  }
};
const safeLocalStorageClear = () => {
  try {
    localStorage.clear();
  } catch (e) {
    // fail silently
  }
};

const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    safeLocalStorageGet("isLoggedIn", false)
  );
  const [isLabTechnician, setIsLabTechnician] = useState(() =>
    safeLocalStorageGet("isLabTechnician", false)
  );
  const [isDoctor, setIsDoctor] = useState(() =>
    safeLocalStorageGet("isDoctor", false)
  );
  const [isUser, setIsUser] = useState(() =>
    safeLocalStorageGet("isUser", false)
  );
  const [loginPersonMail, setLoginPersonMail] = useState(() =>
    safeLocalStorageGet("loginPersonMail", false)
  );
  

  // 🔐 Secure login state updates
  const setLogin = (value) => {
    setIsLoggedIn(value);
    if (!value) {
      // 🚫 Clear everything on logout
      safeLocalStorageClear();

      // 🚫 Block back button navigation
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        navigate("/loginAndRegistrationPage", { replace: true });
      };

      // ✅ Redirect to login
      navigate("/loginAndRegistrationPage", { replace: true });
    }
  };

  const setUser = (value) => setIsUser(value);
  const setDoctor = (value) => setIsDoctor(value);
  const setLabTechnician = (value) => setIsLabTechnician(value);
  const setLoginPersonEmail=(value)=>setLoginPersonMail(value);
  // 🔁 Sync to localStorage
  useEffect(() => {
    safeLocalStorageSet("isLoggedIn", isLoggedIn);
    safeLocalStorageSet("isUser", isUser);
    safeLocalStorageSet("isDoctor", isDoctor);
    safeLocalStorageSet("isLabTechnician", isLabTechnician);
    safeLocalStorageSet("loginPersonMail", loginPersonMail);

  }, [isLoggedIn, isUser, isDoctor, isLabTechnician,loginPersonMail]);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        isUser,
        isDoctor,
        isLabTechnician,
        loginPersonMail,
        setUser,
        setDoctor,
        setLabTechnician,
        setLogin,
        setLoginPersonEmail
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
