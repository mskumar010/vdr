import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import "./verifyDoc.css";
import {
  FiUpload,
  FiCamera,
  FiClock,
  FiInfo,
  FiArrowRight,
} from "react-icons/fi";

const safeLocalStorageGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};
const safeLocalStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // fail silently
  }
};
const safeLocalStorageRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // fail silently
  }
};

const VerifyDoc = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [stream, setStream] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [recentScans, setRecentScans] = useState([]);
  const [activeTab, setActiveTab] = useState("scan");

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    // Load recent scans from localStorage
    const savedScans = safeLocalStorageGet("recentScans");
    if (savedScans) {
      setRecentScans(JSON.parse(savedScans));
    }
  }, []);

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handles the result of a successful QR scan
  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // Add to recent scans
      const newScan = {
        data: data,
        timestamp: new Date().toLocaleString(),
        isUrl: isValidURL(data),
      };
      const updatedScans = [newScan, ...recentScans.slice(0, 4)];
      setRecentScans(updatedScans);
      safeLocalStorageSet("recentScans", updatedScans);
      // If the scanned data is a URL, start redirect countdown
      if (isValidURL(data)) {
        setRedirecting(true);
        let timeLeft = 5;
        const timer = setInterval(() => {
          setCountdown(timeLeft);
          if (timeLeft === 0) {
            clearInterval(timer);
            window.location.href = data;
          }
          timeLeft--;
        }, 1000);
      }
    }
  };

  // Continuously grabs frames from the video, scans for QR codes, and calls handleScan on success
  const onScanSuccess = (stream, canvas, video) => {
    const context = canvas.getContext("2d");
    const interval = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          clearInterval(interval);
          handleScan(code.data);
          setScanning(false);
          // Stop the camera stream
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
        }
      }
    }, 200);
  };

  // Starts the camera, sets up the video and canvas, and begins scanning
  const startScanner = async () => {
    if (!videoRef.current) {
      console.error("Video element not found");
      alert("Error: Video element not found. Please retry.");
      return;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      video.srcObject = mediaStream;
      video.setAttribute("playsinline", true);
      video.play();
      setScanning(true);
      onScanSuccess(mediaStream, canvas, video);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera access error: " + err.message);
    }
  };

  const stopScanner = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          handleNewScan(code.data);
        } else {
          alert("No QR code detected");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="vdoc-page-container">
      {/* Sidebar */}
      <aside className="vdoc-sidebar">
        <nav className="vdoc-side-nav">
          <ul>
            <li className={activeTab === "scan" ? "vdoc-active" : ""}>
              <button onClick={() => setActiveTab("scan")}>
                <FiCamera className="vdoc-nav-icon" />
                <span>Scan</span>
              </button>
            </li>
            <li className={activeTab === "history" ? "vdoc-active" : ""}>
              <button onClick={() => setActiveTab("history")}>
                <FiClock className="vdoc-nav-icon" />
                <span>History</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="vdoc-main-content">
        {activeTab === "scan" && (
          <>
            <div className="vdoc-scanner-section">
              <h2 className="vdoc-section-title">
                Scan our Qr Know Your Doctor
              </h2>
              <p className="vdoc-instructions">
                Scan a QR code using your camera or upload an image. If it's a
                URL, you'll be redirected in 5 seconds.
              </p>

              <div className="vdoc-scanner-box-container">
                <div
                  className="vdoc-scanner-box"
                  onClick={() =>
                    document.getElementById("vdoc-fileInput").click()
                  }
                >
                  {!scanning && (
                    <>
                      <span className="vdoc-upload-icon">
                        <FiUpload size={40} />
                      </span>
                      <span className="vdoc-upload-text">
                        Click here to upload
                      </span>
                    </>
                  )}
                  <canvas className="vdoc-scanner-canvas" ref={canvasRef} />

                  {/* Scanner guide overlay */}
                  {scanning && <div className="vdoc-scanner-guide"></div>}
                </div>

                <input
                  id="vdoc-fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>

              <div className="vdoc-scanner-actions">
                <button
                  className={`vdoc-scan-button ${
                    scanning ? "vdoc-scanning" : ""
                  }`}
                  onClick={scanning ? stopScanner : startScanner}
                >
                  {scanning ? "Stop Scanning" : "Start Camera Scan"}
                  <FiCamera className="vdoc-button-icon" />
                </button>
              </div>

              {/* Hidden Video Element for Camera Stream */}
              <video
                className="vdoc-scanning-video"
                ref={videoRef}
                style={{ display: "none" }}
                playsInline
                autoPlay
              />

              {redirecting && (
                <div className="vdoc-redirect-box">
                  <p>
                    Redirecting in{" "}
                    <span className="vdoc-countdown">{countdown}</span>{" "}
                    seconds...
                  </p>
                  <p className="vdoc-redirect-url">{result}</p>
                  <button
                    className="vdoc-go-now-button"
                    onClick={() => (window.location.href = result)}
                  >
                    Go Now <FiArrowRight />
                  </button>
                </div>
              )}

              {result && !isValidURL(result) && (
                <div className="vdoc-result-box">
                  <p className="vdoc-result-label">QR Code Data:</p>
                  <p className="vdoc-result-text">{result}</p>
                </div>
              )}
            </div>

            <div className="vdoc-how-it-works">
              <h3>
                <FiInfo /> How It Works
              </h3>
              <div className="vdoc-steps">
                <div className="vdoc-step">
                  <div className="vdoc-step-number">1</div>
                  <p>
                    Position the QR code within the scanner frame or upload an
                    image
                  </p>
                </div>
                <div className="vdoc-step">
                  <div className="vdoc-step-number">2</div>
                  <p>
                    Our scanner will automatically detect and read the QR code
                  </p>
                </div>
                <div className="vdoc-step">
                  <div className="vdoc-step-number">3</div>
                  <p>
                    View the decoded information or follow the URL if it's a
                    link
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "history" && (
          <div className="vdoc-history-section">
            <h2 className="vdoc-section-title">
              <FiClock /> Recent Scans
            </h2>
            {recentScans.length > 0 ? (
              <div className="vdoc-scan-history">
                {recentScans.map((scan, index) => (
                  <div className="vdoc-history-item" key={index}>
                    <div className="vdoc-history-data">
                      <p className="vdoc-data-preview">
                        {scan.data.substring(0, 50)}
                        {scan.data.length > 50 ? "..." : ""}
                      </p>
                      <span className="vdoc-scan-time">{scan.timestamp}</span>
                    </div>
                    {scan.isUrl && (
                      <a
                        href={scan.data}
                        className="vdoc-history-action"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit <FiArrowRight />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="vdoc-no-history">
                No recent scans. Start scanning QR codes to build your history.
              </p>
            )}
            {recentScans.length > 0 && (
              <button
                className="vdoc-clear-history"
                onClick={() => {
                  setRecentScans([]);
                  safeLocalStorageRemove("recentScans");
                }}
              >
                Clear History
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default VerifyDoc;
