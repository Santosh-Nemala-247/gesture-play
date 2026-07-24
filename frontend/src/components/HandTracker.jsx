import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Stage, Layer, Circle, Line } from "react-konva";
import { createHandDetector } from "../services/handDetector";

// Connections between the 21 hand landmarks
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],

  [0, 5], [5, 6], [6, 7], [7, 8],

  [5, 9], [9, 10], [10, 11], [11, 12],

  [9, 13], [13, 14], [14, 15], [15, 16],

  [13, 17], [17, 18], [18, 19], [19, 20],

  [0, 17]
];

function HandTracker() {
  const webcamRef = useRef(null);
  const detectorRef = useRef(null);

  const [handDetected, setHandDetected] = useState(false);
  const [landmarks, setLandmarks] = useState([]);

  // Load MediaPipe detector
  useEffect(() => {
    async function loadDetector() {
      detectorRef.current = await createHandDetector();
      console.log("✅ Detector Ready");
    }

    loadDetector();
  }, []);

  // Detect hands continuously
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        detectorRef.current &&
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;

        const result = detectorRef.current.detectForVideo(
          video,
          performance.now()
        );

        if (result.landmarks.length > 0) {
          setLandmarks(result.landmarks[0]);
          setHandDetected(true);
        } else {
          setLandmarks([]);
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
        alignItems: "center",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <h2>🤚 Hand Tracker</h2>

      <p>
        {handDetected ? "🟢 Hand Detected" : "🔴 No Hand Detected"}
      </p>

      <div
        style={{
          position: "relative",
          width: "900px",
        }}
      >
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
            width: "900px",
            borderRadius: "15px",
            border: "3px solid white",
          }}
        />

        <Stage
          width={900}
          height={506}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          <Layer>
            {/* Draw hand connections */}
            {landmarks.length > 0 &&
              HAND_CONNECTIONS.map(([start, end], index) => (
                <Line
                  key={index}
                  points={[
                    (1 - landmarks[start].x) * 900,
                    landmarks[start].y * 506,
                    (1 - landmarks[end].x) * 900,
                    landmarks[end].y * 506,
                  ]}
                  stroke="lime"
                  strokeWidth={3}
                />
              ))}

            {/* Draw landmark points */}
            {landmarks.map((point, index) => (
              <Circle
                key={index}
                x={(1 - point.x) * 900}
                y={point.y * 506}
                radius={6}
                fill="lime"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default HandTracker;