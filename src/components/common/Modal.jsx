import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ isOpen, title, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Backdrop with simple fade animation */}
      <div className="absolute inset-0 bg-black/60 animate-[fadeIn_150ms_ease-out]" />
      {/* Panel with scale animation */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 dark:text-slate-100 animate-[scaleIn_150ms_ease-out]">
        <div className="mb-3 flex items-start justify-between gap-3">
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : <span />}
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {children}
      </div>

      {/* Keyframes (Tailwind arbitrary animations) */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes scaleIn { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: scale(1) } }
        `}
      </style>
    </div>,
    document.body
  );
}
