import { useEffect } from "react";

export default function Loader({
  duration = 700,
  onFinish,
  fullscreen = true,
  className = "",
}) {
  useEffect(() => {
    if (!onFinish) return;
    const id = setTimeout(() => onFinish(), duration);
    return () => clearTimeout(id);
  }, [duration, onFinish]);

  const containerClass = fullscreen
    ? `fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm ${className}`
    : `flex justify-center items-center p-4 ${className}`;

  return (
    <div className={containerClass}>
      <div className="w-12 h-12 border-[6px] border-dashed border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
