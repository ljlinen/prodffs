/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
<<<<<<< HEAD
=======
import useBeatsContext from "../hooks/useContext/useBeatsContext";
>>>>>>> client

const Visualizer = () => {

  const { beats, playingSongIndex, isPlaying, beatsDispatch } = useBeatsContext();

  const [frames, setFrames] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const ffmpeg = new FFmpeg({ log: true, corePath: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js' });
  const canvasRef = useRef(null);


  const drawVisualizer = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Simple circular visualizer effect
    const radius = Math.random() * 50 + 50;
    ctx.beginPath();
    ctx.arc(320, 180, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 150, 255, 0.6)";
    ctx.fill();

    // Capture frame
    setFrames((prevFrames) => [...prevFrames, canvasRef.current.toDataURL("image/png")]);
  };

  const startVisualizer = () => {
    setFrames([]);
    setIsRecording(true);
    const animate = () => {
      if (isRecording) {
        drawVisualizer();
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const stopVisualizer = () => setIsRecording(false);

  const exportVideo = async () => {
    try {
        if (!ffmpeg.loaded) await ffmpeg.load();
          frames.forEach((frame, i) => {
          const data = frame.split(",")[1];
          ffmpeg.FS("writeFile", `frame${i}.png`, Uint8Array.from(atob(data), c => c.charCodeAt(0)));
        });

        await ffmpeg.run("-framerate", "30", "-i", "frame%d.png", "-c:v", "libx264", "-pix_fmt", "yuv420p", "output.mp4");
        const data = ffmpeg.FS("readFile", "output.mp4");
        const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
        const url = URL.createObjectURL(videoBlob);

        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = "visualizer.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);        
    } catch (error) {
        console.log(error);
    }

  };

  return (
    <div>
      <canvas ref={canvasRef} width="100%" height="35" style={{ border: "1px solid black" }}></canvas>
      <div>
        <button onClick={startVisualizer}>Start Visualizer</button>
        <button onClick={stopVisualizer}>Stop Visualizer</button>
        <button onClick={exportVideo}>Export Video</button>
      </div>
    </div>
  );
};

export default Visualizer;
