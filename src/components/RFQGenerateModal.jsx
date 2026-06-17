import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import RFQsucessfinal from "./RFQsucessfinal";

export default function RFQGenerateModal() {
 
  //const [visible, setVisible] = useState(false);
 const navigate = useNavigate ();
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal Card */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg gap-5 px-8 py-10 mx-auto text-center bg-white shadow-2xl rounded-2xl animate-fade-in">

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute transition top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heading with info icon */}
        <h1 className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold leading-snug sm:text-2xl text-slate-900">
          <span className="inline-flex items-center justify-center flex-shrink-0 border-2 rounded-full w-7 h-7 border-slate-800">
            <svg className="w-4 h-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </span>
          RFQ Case RFQC-123 Ready for Generation
        </h1>

        {/* Description */}
        <p className="max-w-sm text-sm leading-relaxed sm:text-base text-slate-500">
          The selected materials have been configured with delivery details and vendor assignments.
          Generating the RFQs will create vendor-specific quotation requests under this RFQ case.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <button
          
            onClick={() => navigate("/app/RFQsucessfinal")}
            className="px-8 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-sm transition-all shadow-md hover:shadow-rose-300"
          >
            Continue
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-8 py-2.5 rounded-xl border-2 border-rose-500 text-rose-500 hover:bg-rose-50 active:scale-95 font-semibold text-sm transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out both;
        }
      `}</style>
    </div>
  );
}