import { useState, useEffect } from "react";
import PurchaseOrders from "./PurchaseOrders";
import PrRequstInitSuccess from "./PrRequstInitSuccess";
import axios from "axios";

export default function NewPurchaseReqst({ onClose }) {
  const [prName, setPrName] = useState("");
  const [reqDate, setReqDate] = useState("");
  const [accDate, setAccDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [dateError, setDateError] = useState("");
  const [site, setSite] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sites, setSites] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setReqDate(today);
    setAccDate(today);
    getSites();
    
  }, []);
  const validateDate = (selectedDate) => {
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate < today) {
      setDateError("Old dates are not allowed.");
      return false;
    }
    setDateError("");
    return true;

  };
  const getSites = async () => {

    const response = await axios.get(
      "http://localhost:5000/api/Sites_Id"
    );
      console.log("API Response:", response.data);
    console.log("API Response Value:", response.data.value);
    setSites(response.data);
  };
   // console.log(sites)

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="relative w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl sm:p-10">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-400 top-5 right-5 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-medium text-center text-gray-800 sm:text-2xl mb-7">
          Create New Purchase Requisition
        </h2>

        {/* Form card */}
        <div className="flex flex-col max-w-5xl gap-2 p-2 bg-slate-50 rounded-xl ">

          {/* PR Name */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-1">
            <label className="text-sm font-medium text-gray-700 sm:w-40 shrink-0">
              PR Name <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              value={prName}
              onChange={(e) => setPrName(e.target.value)}
              placeholder="Enter PR Name (Manual Entry)"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Dates row */}
          <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-center sm:gap-4">

            <div className="flex flex-1 gap-2 py-3 flex-rowrap flex- sm:flex-row">
              <label className="py-2 text-sm font-medium text-gray-700 sm:w-40 shrink-0">
                Requested Date <span className="text-pink-500">*</span>
              </label>
              <div className="relative flex-1 min-w-[138px]">
                <input
                  type="date"
                  value={reqDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setReqDate(value);
                    validateDate(value);
                  }}
                  className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />

              </div>
              <label className="self-center text-sm font-medium text-gray-700 whitespace-nowrap">
                Accounting Date <span className="text-pink-500">*</span>
              </label>

              <input
                type="date"
                value={accDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setAccDate(value);
                  validateDate(value);
                }}
                className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

            </div>
          </div>
          {/*Site wareHouse*/}
          <div className="flex flex-1 gap-2 py-3 flex-rowrap flex- sm:flex-row">
            <label className="py-2 text-sm font-medium text-gray-700 sm:w-40 shrink-0">
              Site Id
            </label>
            <div className="relative flex-1 min-w-[138px]">
              <select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option>Select Site</option>
                {
                  Array.isArray(sites) &&
                  sites.map((site) => (
                  <option
                    key={site.Sites_Id}
                    value={site.Sites_Id}
                  >
                    {site.Sites_Id}
                  </option>
                ))}
              </select>
            </div>
            <label className="self-center text-sm font-medium text-gray-700 whitespace-nowrap">
              WarehouseId
            </label>

            <select

              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full px-2 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select Warehouse </option>
            </select>

          </div>

          {/* Requisition Purpose */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-40 shrink-0">
              Requisition Purpose
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter the Purpose of Requisition (Manual Entry)"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>


        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-7">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Create PR
          </button>

          <button
            onClick={onClose}
            className="border border-pink-400 text-pink-500 hover:bg-pink-50 px-8 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
      {showPopup && (
        <PrRequstInitSuccess onClose={() => setShowPopup(false)} />
      )}
    </div>
  )
}

