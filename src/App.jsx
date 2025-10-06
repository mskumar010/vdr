import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Homepage from "./pages/Home.jsx";
import DoctorVerification from "./pages/doctorVerificationpage.jsx";
import FindDoctorPage from "./pages/findDoctorPage";
import LoginAndRegistration from "./pages/loginAndRegistrationPage";
import IndividualRegisterPage from "./pages/individualRegisterPage";
import SosPage from "./pages/sosPage";
import DoctorRegisterPage from "./pages/doctorRegisterPage";
import HomeDeliveryMedicine from "./pages/demoPage";
import Insurance from "./pages/insurancePage";
import DoctorProfilePage from "./pages/doctorProfilePage";
import MainInsurance from "./pages/mainInsurancePage";
import MainHeader from "./components/header";
import Footer from "./components/footer";
import VerifyDoc from "./pages/verifyDoc";
import DoctorID from "./pages/doctorID";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import DocDashboard from "./pages/docDashboard";
// import ScrollToTop from "./components/scrollToTop";
import PrivateRoute from "./context/privateRoute.jsx";
import WhyVhc from "./pages/whyVhc.jsx";
import InstallPromptToast from "./hooks/InstallPromptToast.jsx";
import UserDashboard from "./pages/userDashboard";
import LoginContextProvider, { LoginContext } from "./context/loginContext.jsx";
import DoctorAppointment from "./components/doctorAppointment";
// import CookieConsent from "./hooks/CookieConsent.jsx";
import LabTechnicianDashboard from "./pages/labTechnicianDashboard.jsx";
import MobileNavigationBar from "./components/mobileNavigationBar.jsx";
import MenuPage from "./pages/menuPage.jsx";

const App = () => {
  const [location, setLocation] = useState();
  const currentUrl = window.location.href;
  useEffect(() => {
    setLocation(currentUrl);
  }, [currentUrl]);
  useEffect(() => {
    console.log(`url:${currentUrl}`);
  }, []);
  // const { isLoggedIn, isUser, isDoctor, setUser, setDoctor, setLogin } =
  //   useContext(LoginContext);
  return (
    <>
      <Router>
        <LoginContextProvider>
          {/* <ScrollToTop /> */}
          <MainHeader />
          <div className="content-wrapper ">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/verifyDoc" element={<VerifyDoc />} />
              <Route
                path="/doctorVerificationpage"
                element={<DoctorVerification />}
              />
              <Route path="/findDoctorPage" element={<FindDoctorPage />} />
              <Route
                path="/loginAndRegistrationPage"
                element={<LoginAndRegistration />}
              />
              <Route
                path="/individualRegisterPage"
                element={<IndividualRegisterPage />}
              />
              <Route path="/sosPage" element={<SosPage />} />
              <Route
                path="/doctorRegisterPage"
                element={<DoctorRegisterPage />}
              />
              <Route path="/insurancePage" element={<Insurance />} />
             
              <Route path="/mainInsurancePage" element={<MainInsurance />} />
              <Route path="/doctorID/:id" element={<DoctorID />} />
              <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
              <Route path="/whyVhc" element={<WhyVhc />} />
              <Route path="/menuPage" element={<MenuPage />} />
              <Route
                path="/labTechnicianDashboard"
                element={<LabTechnicianDashboard />}
              />
              <Route
                path="/docDashboard"
                element={
                  // <PrivateRoute>
                    <DocDashboard />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/userDashboard"
                element={
                  // <PrivateRoute>
                    <UserDashboard />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/doctorAppointment"
                element={<DoctorAppointment />}
              />
            </Routes>
          </div>
          {window.innerWidth <= 777 ? <MobileNavigationBar /> : <Footer />}
        </LoginContextProvider>
      </Router>
      {/* <CookieConsent /> */}
      <InstallPromptToast />
    </>
  );
};

export default App;
