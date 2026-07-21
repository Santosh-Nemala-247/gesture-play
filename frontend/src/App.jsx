import Webcam from "react-webcam";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#111",
      }}
    >
      <Webcam
        audio={false}
        mirrored={true}
        screenshotFormat="image/jpeg"
        style={{
          width: "700px",
          borderRadius: "12px",
          border: "4px solid white",
        }}
      />
    </div>
  );
}

export default App;