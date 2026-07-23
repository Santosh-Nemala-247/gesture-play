import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

export async function createHandDetector() {
  console.log("Loading MediaPipe...");

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const detector = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });

  console.log("✅ Hand detector loaded!");

  return detector;
}