import { useState } from "react";
import POInitiatedSucess from "./POInitiatedSucess";
export default function CreatePurchaseOrder({ onClose }) {
   const [showPopup, setShowPopup] = useState(false);
   const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    vendor: "PVS LTD.",
    contactPerson: "Veena",
    phone: "+91 98765 43210",
    email: "procurement@pvsltd.com",
    deliveryAddress: "No. 14, SIDCO Industrial Estate, Guindy, Chennai - 600032",
    site: "Chennai Manufacturing Site",
    warehouse: "Raw Material Warehouse – RM01",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40">
      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white shadow-xl rounded-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex-1" />
          <h1 className="flex-[2] text-center text-xl font-medium text-gray-900">
            Create New Purchase Order
          </h1>
          <div className="flex justify-end flex-1">
            <button
              onClick={onClose}
              className="p-1 text-gray-400 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 mt-4 space-y-4">

          {/* Vendor Details */}
          <section className="px-5 py-4 rounded-xl bg-blue-50/60">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">Vendor Details</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">

              <div>
                <label className="block mb-1 text-xs text-gray-500">
                  Vendor <span className="text-red-500">*</span>
                </label>
                <select
                  name="vendor"
                  value={form.vendor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                >
                  <option>PVS LTD.</option>
                  <option>ABC Corp</option>
                  <option>XYZ Pvt Ltd</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs text-gray-500">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={form.contactPerson}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block mb-1 text-xs text-gray-500">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div>
                <label className="block mb-1 text-xs text-gray-500">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 text-xs text-gray-500">Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

            </div>
          </section>

          {/* Inventory Details */}
          <section className="px-5 py-4 rounded-xl bg-blue-50/60">
            <h2 className="mb-4 text-sm font-semibold text-gray-700">Inventory Details</h2>

            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

              <div>
                <label className="block mb-1 text-xs text-gray-500">Site</label>
                <select
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                >
                  <option>Chennai Manufacturing Site</option>
                  <option>Mumbai Plant</option>
                  <option>Bangalore Unit</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-xs text-gray-500">Warehouse</label>
                <select
                  name="warehouse"
                  value={form.warehouse}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                >
                  <option>Raw Material Warehouse – RM01</option>
                  <option>Finished Goods – FG02</option>
                  <option>Spare Parts – SP03</option>
                </select>
              </div>

            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
             <button
              onClick={onClose}
              className="min-w-[120px] rounded-lg border border-pink-500 px-8 py-2.5 text-sm font-medium text-pink-500 hover:bg-pink-50 active:scale-95 transition-all"
            >
              Cancel
            </button>
            
            <button
             onClick={() => setShowPopup(true)}
              className="min-w-[120px] rounded-lg bg-pink-500 px-8 py-2.5 text-sm font-medium text-white hover:bg-pink-600 active:scale-95 transition-all"
            >
              Continue
            </button>
           {showPopup && (
                <POInitiatedSucess onClose={() => setShowPopup(false)} /> 
                )}
          </div>

        </div>
      </div>
    </div>
  );
}