import { useState } from "react";
import RFQInitsucess from  "./components/RFQInitsucess";

const currencies = ["USD", "EUR", "GBP", "INR", "AED", "JPY", "SGD"];
const deliveryLocations = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad"];
const deliveryAddresses = [
  "123 MG Road, Bengaluru",
  "456 Connaught Place, Delhi",
  "789 Marine Drive, Mumbai",
];
const sites = ["Site A", "Site B", "Site C"];
const warehouses = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];

function FormSection({ title, children }) {
  return (
    <div className="p-5 border border-blue-100 bg-blue-50/60 rounded-2xl sm:p-6">
      <h2 className="mb-5 text-base font-semibold text-slate-700">{title}</h2>
      {children}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-600 mb-1.5">
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({ placeholder, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-10 px-3 text-sm transition bg-white border rounded-lg border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
    />
  );
}

function Select({ placeholder, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full h-10 px-3 text-sm transition bg-white border rounded-lg appearance-none cursor-pointer border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function DateInput({ placeholder, value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-10 px-3 text-sm transition bg-white border rounded-lg border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
    />
  );
}

function DateTimeInput({ value, onChange }) {
  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      className="w-full h-10 px-3 text-sm transition bg-white border rounded-lg border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
    />
  );
}

export default function CreateRFQNewCase() {
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    caseTitle: "",
    currency: "",
    deliveryDate: "",
    expirationDateTime: "",
    deliveryContact: "",
    deliveryAddress: "",
    site: "",
    warehouse: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleContinue = () => {
    if (!form.caseTitle || !form.deliveryDate || !form.expirationDateTime) {
      alert("Please fill all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleCancel = () => {
    setForm({
      caseTitle: "",
      currency: "",
      deliveryDate: "",
      expirationDateTime: "",
      deliveryContact: "",
      deliveryAddress: "",
      site: "",
      warehouse: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
        <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-center mx-auto mb-4 bg-green-100 rounded-full w-14 h-14">
            <svg className="text-green-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-slate-800">RFQ Case Created</h2>
          <p className="mb-6 text-sm text-slate-500">Your RFQ case <span className="font-medium text-slate-700">"{form.caseTitle}"</span> has been submitted successfully.</p>
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-sm font-medium text-white transition rounded-lg bg-rose-500 hover:bg-rose-600"
          >
            Create another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center min-h-screen p-4 bg-slate-100 sm:p-8">
      <div className="w-full max-w-4xl bg-white border shadow-sm rounded-2xl border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h1 className="text-xl font-semibold tracking-tight text-center sm:text-2xl ">
            Create New RFQ Case
          </h1>
         
          <button
            onClick={handleCancel}
            className="p-1 transition rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
      
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 sm:p-8">
          {/* Case Details */}
          <FormSection title="Case Details">
            <div className="space-y-4">
              <div>
                <Label required>Case Title</Label>
                <Input
                  placeholder="Enter case title (manual entry)"
                  value={form.caseTitle}
                  onChange={set("caseTitle")}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label>Currency</Label>
                  <Select
                    placeholder="Select Currency"
                    options={currencies}
                    value={form.currency}
                    onChange={set("currency")}
                  />
                </div>
                <div>
                  <Label required>Expected Delivery Date</Label>
                  <DateInput
                    placeholder="Select Delivery Date"
                    value={form.deliveryDate}
                    onChange={set("deliveryDate")}
                  />
                </div>
                <div>
                  <Label required>Expiration Date & Time</Label>
                  <DateTimeInput
                    value={form.expirationDateTime}
                    onChange={set("expirationDateTime")}
                  />
                </div>
              </div>
            </div>
          </FormSection>

          {/* Delivery Details */}
          <FormSection title="Delivery Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Delivery Contact</Label>
                <Select
                  placeholder="Select Delivery Location"
                  options={deliveryLocations}
                  value={form.deliveryContact}
                  onChange={set("deliveryContact")}
                />
              </div>
              <div>
                <Label>Delivery Address</Label>
                <Select
                  placeholder="Select Delivery Address"
                  options={deliveryAddresses}
                  value={form.deliveryAddress}
                  onChange={set("deliveryAddress")}
                />
              </div>
            </div>
          </FormSection>

          {/* Inventory Details */}
          <FormSection title="Inventory Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Site</Label>
                <Select
                  placeholder="Select Site"
                  options={sites}
                  value={form.site}
                  onChange={set("site")}
                />
              </div>
              <div>
                <Label>Warehouse</Label>
                <Select
                  placeholder="Select Warehouse"
                  options={warehouses}
                  value={form.warehouse}
                  onChange={set("warehouse")}
                />
              </div>
            </div>
          </FormSection>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse items-center justify-center gap-3 px-5 py-5 border-t sm:px-8 border-slate-100 sm:flex-row">
          <button
            onClick={onclose}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg border border-rose-400 text-rose-500 text-sm font-medium hover:bg-rose-50 transition"
          >
            Cancel
          </button>
          <button
           onClick={() => setShowPopup(true)}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 transition flex items-center justify-center gap-2 text-center"
          >
            Continue
            
          </button>
          {showPopup && (
              <RFQInitsucess onClose={() => setShowPopup(false)} /> 
          )}
        </div>
      </div>
    </div>
  );
}