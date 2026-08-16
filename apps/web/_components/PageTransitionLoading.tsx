import { FiLoader } from "react-icons/fi";

export default function PageTransitionLoading() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-150 flex flex-col items-center justify-center gap-3 bg-white/40 opacity-0 backdrop-blur-sm [animation:page-transition-loading_600ms_ease-out_both]"
      role="status"
      aria-live="polite"
    >
      <span className="animate-spin" aria-hidden="true">
        <FiLoader size={32} />
      </span>
      <span className="text-sm text-black/60">Loading page...</span>
    </div>
  );
}
