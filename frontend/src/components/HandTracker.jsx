import Webcam from "react-webcam";

function HandTracker() {
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

      <Webcam
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