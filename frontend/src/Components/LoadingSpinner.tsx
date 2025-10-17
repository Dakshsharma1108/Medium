import { useEffect, useState } from "react";

export const LoadingSpinner = () => {
  const text = "Medium";
  const typingSpeed = 200; // ms per letter
  const pauseTime = 1000;  // pause before restart
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      if (!deleting && index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
      } else if (!deleting && index === text.length) {
        setTimeout(() => setDeleting(true), pauseTime);
      } else if (deleting && index > 0) {
        setDisplayed(text.slice(0, index - 1));
        setIndex(index - 1);
      } else if (deleting && index === 0) {
        setDeleting(false);
      }
    };

    const interval = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(interval);
  }, [index, deleting]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/30 z-50">
      <h1
        className="text-6xl font-extrabold text-black tracking-tight"
        style={{
          letterSpacing: "0px",
          textShadow: "0 0 25px rgba(255,255,255,0.8)",
          transition: "all 0.15s ease-in-out",
        }}
      >
        {displayed}
        <span className="animate-pulse text-black">|</span>
      </h1>
    </div>
  );
};