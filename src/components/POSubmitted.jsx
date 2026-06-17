import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 text-rose-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
    </svg>
  );
}

function XIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="p-1 text-gray-400 transition-colors rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        className="relative flex flex-col items-center w-full max-w-md gap-4 px-8 py-10 mx-auto bg-white shadow-2xl rounded-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <XIcon onClick={onClose} />
        </div>

        {/* Icon */}
        <div className="mb-1">
          <CheckCircleIcon />
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          className="text-2xl font-bold tracking-tight text-center text-gray-900"
        >
          Purchase Order Submitted
        </h2>

        {/* Body */}
        <p className="text-sm leading-relaxed text-center text-gray-500">
          <span className="font-semibold text-gray-800">PO-124</span> has been submitted
          successfully and is awaiting approval.
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="px-8 py-2 mt-3 text-sm font-semibold transition-colors border-2 rounded-lg border-rose-500 text-rose-500 hover:bg-rose-50 active:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function POSubmitted() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      {/* Trigger button (shown when modal is closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 font-semibold text-white transition-colors rounded-lg shadow focus:outline-none focus:ring-rose-300"
        >
         
        </button>
      )}

      <Modal  isOpen={open}
  onClose={() => navigate("/app/PurchaseOrders")} />

      {/* Fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out both;
        }
      `}</style>
    </div>
  );
}