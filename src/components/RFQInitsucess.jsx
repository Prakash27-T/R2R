import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import RFQForm from "../RFQForm";
export default function RFQInitsucess() {
    const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-200/50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal Card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md gap-5 px-8 py-10 mx-auto text-center bg-white shadow-2xl rounded-2xl animate-fade-in">
        
        {/* Icon */}
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 border-2 rounded-full border-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-800"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl text-slate-900">
          RFQ Case Initiated Successfully
        </h1>

        {/* Case ID line */}
        <p className="text-sm sm:text-base text-slate-600">
          RFQ Case ID:{" "}
          <span className="font-bold text-slate-900">RFQC-123</span> has been
          generated.
        </p>

        {/* Description */}
        <p className="max-w-xs text-sm leading-relaxed sm:text-base text-slate-500">
          You can now proceed with adding material lines, vendor assignments,
          and RFQ configuration details.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/app/RFQForm")}
          className="w-40 py-3 mt-2 text-base font-semibold text-white transition-all duration-150 shadow-md rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 hover:shadow-rose-300"
        >
          Continue
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out both;
        }
      `}</style>
    </div>
  );
}