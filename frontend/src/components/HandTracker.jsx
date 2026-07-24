import { useEffect, useRef, useState } from "react";
import { createHandDetector } from "../services/handDetector";
import Webcam from "react-webcam";

function HandTracker() {

  // 1️⃣ Refs and state
  const webcamRef = useRef(null);
  const detectorRef = useRef(null);
  const [handDetected, setHandDetected] = useState(false);

  // 2️⃣ useEffect to load detector
  useEffect(() => {
    async function load() {
      detectorRef.current = await createHandDetector();
      console.log("Detector Ready");
    }
    
     load();
  }, []);
  
  // 3️⃣ useEffect to detect hands
  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        detectorRef.current &&
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        
        const result = detectorRef.current.detectForVideo(
          video,
          performance.now()
        );

        if (result.landmarks.length > 0) {
          setHandDetected(true);

          console.log(result.landmarks);
        } else {
          setHandDetected(false);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h2>🤚 Hand Tracker</h2>
      <p>
        {handDetected ? "🟢 Hand Detected" : "🔴 No Hand"}
      </p>

      <Webcam
      ref={webcamRef}
  audio={false}
  mirrored={true}
  screenshotFormat="image/jpeg"
  videoConstraints={{
    width: 1280,
    height: 720,
    facingMode: "user",
  }}
  style={{
    width: "70%",
    maxWidth: "900px",
    borderRadius: "15px",
    border: "3px solid white",
  }}
/>
    </div>
  );
}

export default HandTracker;