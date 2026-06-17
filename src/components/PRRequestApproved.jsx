import { X, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PRRequestApproved(
   
  {

  prId = "PR-123",
  onClose,
}) {
   const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      {/* Modal */}
      <div className="relative w-full max-w-4xl px-6 py-8 bg-white shadow-xl rounded-3xl sm:px-10 sm:py-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 right-5 top-5 hover:text-gray-600"
        >
          <X size={32} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Info
              size={36}
              className="text-gray-700"
              strokeWidth={1.8}
            />

            <h3 className="text-center gray-800 text-font-semibold sm:text-3xl md:text-2xl">
              Purchase Requisition Submitted Successfully
            </h3>
          </div>

          {/* PR ID */}
          <p className="mt-6 text-base text-gray-700 sm:text-lg">
            PR ID:{" "}
            <span className="font-bold">
              {prId}
            </span>{" "}
            has been submitted.
          </p>

          {/* Description */}
          <p className="max-w-2xl mt-4 text-sm text-gray-600 sm:text-base">
            Your request has been sent for approval and is currently
            awaiting review.
          </p>

          {/* Button */}
          <button
             onClick={() => navigate("/app/DbsPurchaseRequest")}         
              className="px-10 py-3 mt-10 text-lg font-semibold transition border-2 rounded-xl border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}