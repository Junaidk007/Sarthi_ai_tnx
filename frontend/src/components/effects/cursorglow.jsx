
import { useEffect, useState } from "react";

function CursorGlow() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-14 w-14 rounded-full border border-[#081F62]/30 bg-[#081F62]/10 shadow-[0_0_25px_rgba(8,31,98,0.15)] backdrop-blur-[2px] lg:block"
      style={{
        transform: `translate3d(${position.x - 28}px, ${
          position.y - 28
        }px, 0)`,
      }}
    />
  );
}

export default CursorGlow;


