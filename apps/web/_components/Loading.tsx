import { FiLoader } from "react-icons/fi";

interface LoadingProps {
  label?: string;
  className?: string;
  delayMs?: number;
}

export default function Loading({
  label = "Loading...",
  className = "",
  delayMs = 300,
}: LoadingProps) {
  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/40 opacity-0 backdrop-blur-sm [animation:loading-fade-in_150ms_ease-out_forwards] ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
      role="status"
      aria-live="polite"
    >
      <span className="animate-spin" aria-hidden="true">
        <FiLoader size={32} />
      </span>
      <span className="text-sm text-black/60">{label}</span>
    </div>
  );
}
