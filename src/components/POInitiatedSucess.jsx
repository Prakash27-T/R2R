import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function POInitiatedSucess({ poNumber = "PO-124", onContinue, onClose }) {
const navigate = useNavigate ();
  //const [showPopup, setShowPopup] = useState(false);
//const [page, setPage] = useState(1);
 
    
  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40">
      {/* Modal */}
      <div className="relative w-full max-w-lg px-6 py-10 bg-white shadow-xl rounded-2xl sm:px-10">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-800 h-7 w-7 shrink-0"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
          </svg>
          <h1 className="text-lg font-bold text-center text-gray-900 sm:text-xl">
            Purchase Order Initiated Successfully
          </h1>
        </div>

        {/* Body text */}
        <div className="mt-4 space-y-2 text-center">
          <p className="text-sm text-gray-500">
            PO Number:{" "}
            <span className="font-semibold text-gray-800">{poNumber}</span>{" "}
            has been generated.
          </p>
          <p className="text-sm text-gray-500">
            Complete the remaining details and submit the purchase order for approval.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-7">
          <button
            onClick={() => navigate("/app/POdetailform")}
            // onClick={() => setShowPopup(true)}
            className="rounded-xl bg-pink-500 px-12 py-2.5 text-sm font-medium text-white hover:bg-pink-600 active:scale-95 transition-all"
          >
            Continue
            
          </button>
          
        </div>

      </div>
       
    </div>
  );
}