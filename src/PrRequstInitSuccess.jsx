import { useState } from "react";
import PRMaterialRequirement from "./PRMaterialRequirement"
import { useNavigate } from "react-router-dom";
 function Modal({ prId = "PR-123", onContinue, onClose }) {
   const [showPopup, setShowPopup] = useState(false);
  //const [showMaterialPage, setShowMaterialPage] = useState(false);
    const navigate = useNavigate();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="relative w-full max-w-lg px-8 py-10 bg-white shadow-lg rounded-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute p-1 transition rounded-lg top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <svg
            className="w-7 h-7 text-slate-700 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          <h2 className="text-xl font-bold leading-tight text-center sm:text-2xl">
            Purchase Requisition Initiated Successfully
          </h2>
        </div>

        {/* Body */}
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm text-slate-600 sm:text-base">
            PR ID: <span className="font-bold text-slate-800">{prId}</span> has been generated.
          </p>
          <p className="text-sm text-slate-600 sm:text-base">
            You can now proceed to add material details.
          </p>
        </div>
        
        {/* CTA */}
        <div className="flex justify-center">
          <button
             onClick={() => navigate("/app/PRMaterialRequirement")}
              
                  // onClick={() => setShowPopup(true)}
                  className="px-10 py-3 text-sm font-semibold text-white transition-all rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 sm:text-base"
          >
            Continue
          </button>
           {showPopup && (
                <PRMaterialRequirement onClose={false} /> 
              )}
              </div>
           
       </div>
     
    </div>
     
  );
}


export default function PrRequstInitSuccess({onContinue, onClose}) {
  const [open, setOpen] = useState(true);
  //const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState("popup");
 return(
 
       <div className="min-h-screen bg-slate-100">
        {page ==="popup" && (
        <Modal
          prId="PR-123"
          onClose={() => setPage("close")}
          onContinue={() => setPage("PRMaterialRequirement")}
        />
      )}
        
    </div>
     
    );
}
          
      
 