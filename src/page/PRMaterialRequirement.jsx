import { useState } from "react";

import { useNavigate } from "react-router-dom";
const materialOptions = ["Steel Rod", "Copper Wire", "Aluminium Sheet", "PVC Pipe", "Rubber Seal"];
const categoryOptions = ["Raw Material", "Consumable", "Spare Part", "Packaging", "Chemical"];
const uomOptions = ["KG", "PCS", "MTR", "LTR", "BOX"];
const siteOptions = ["Site A", "Site B", "Site C"];
const warehouseOptions = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];
const locationOptions = ["Zone A", "Zone B", "Zone C", "Zone D"];

const stockMap = {
  "Steel Rod": 120,
  "Copper Wire": 45,
  "Aluminium Sheet": 80,
  "PVC Pipe": 200,
  "Rubber Seal": 15,
};
const priceMap = {
  "Steel Rod": 250,
  "Copper Wire": 180,
  "Aluminium Sheet": 320,
  "PVC Pipe": 90,
  "Rubber Seal": 60,
};

function Select({ placeholder, options, value, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`h-9 px-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition appearance-none cursor-pointer ${className}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Input({ placeholder, value, onChange, type = "text", className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`h-9 px-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition ${className}`}
    />
  );
}

function FormSection({ title, children }) {
  return (
    <div className="p-4 border border-blue-100 bg-blue-50/60 rounded-2xl sm:p-6">
      <h2 className="mb-4 text-sm font-bold text-slate-800">{title}</h2>
      {children}
    </div>
  );
}

const emptyRow = () => ({ id: Date.now(), material: "", category: "", uom: "", qty: "" });

export default function PRMaterialRequirement({}) {
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState([emptyRow()]);
  const [site, setSite] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
   const [showModal, setShowModal] = useState(false);
  //const [showPopup, setShowPopup] = useState(false);
  //const [showMaterialPage, setShowMaterialPage] = useState(false);

  const today = "08/05/26";

  const updateRow = (id, field, value) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));
  const resetRow = (id) => setRows((prev) => prev.map((r) => r.id === id ? { ...r, material: "", category: "", uom: "", qty: "" } : r));

  const getStock = (mat) => (stockMap[mat] !== undefined ? stockMap[mat] : "–");
  const getNetAmt = (mat, qty) => {
    if (!mat || !qty || !priceMap[mat]) return "–";
    return `₹${(priceMap[mat] * Number(qty)).toLocaleString()}`;
  };

  const handleSubmit = () => {
    const valid = rows.every((r) => r.material && r.category && r.qty);
    if (!valid) { alert("Please fill all required material fields."); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
        <div className="w-full max-w-sm p-8 space-y-4 text-center bg-white shadow rounded-2xl">
          <div className="flex items-center justify-center mx-auto bg-green-100 rounded-full w-14 h-14">
            <svg className="text-green-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800">PR Submitted!</h2>
          <p className="text-sm text-slate-500">PR-123 material details have been saved successfully.</p>
          <button onClick={() => setSubmitted(false)} className="px-6 py-2 text-sm font-medium text-white transition rounded-lg bg-rose-500 hover:bg-rose-600">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center min-h-screen p-4 bg-slate-100 sm:p-8">
      <div className="w-full max-w-6xl bg-white border shadow-sm rounded-2xl border-slate-200">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-5 border-b sm:px-8 border-slate-100">
          <h1 className="text-base font-bold leading-tight text-center sm:text-xl text-slate-800">
            PR-123 – Production Material Requirement–May 26
          </h1>
          <button
            onClick={() => {}}
            className="p-1 transition rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-5 sm:p-8">

          {/* Requirement Details */}
          <FormSection title="Requirement Details">
            <div className="flex flex-wrap mb-4 text-xs gap-x-8 gap-y-2 text-slate-600">
              <span><span className="font-medium text-slate-700">Requested Date</span> &nbsp;{today}</span>
              <span><span className="font-medium text-slate-700">Accounting Date</span> &nbsp;{today}</span>
              <span><span className="font-medium text-slate-700">Requisition Purpose</span> &nbsp;–</span>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              <span className="text-xs font-medium text-slate-600 shrink-0">Description</span>
              <Input
                placeholder="Enter the Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
            </div>
          </FormSection>

          {/* Material Details */}
          <FormSection title="Material Details">
            {/* Table — scrollable on mobile */}
            <div className="overflow-x-auto border rounded-xl border-slate-200">
              <table className="min-w-[700px] w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600">
                    {["Material Name", "Material Category *", "UOM", "Available Stock", "Quantity *", "Est. Net Amount", "Action"].map((h) => (
                      <th key={h} className="px-3 py-2.5 text-left font-medium whitespace-nowrap border-b border-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="transition bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-3 py-2">
                        <Select
                          placeholder="Enter Material Name"
                          options={materialOptions}
                          value={row.material}
                          onChange={(e) => updateRow(row.id, "material", e.target.value)}
                          className="w-40"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Select
                          placeholder="Enter Material Category"
                          options={categoryOptions}
                          value={row.category}
                          onChange={(e) => updateRow(row.id, "category", e.target.value)}
                          className="w-36"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Select
                          placeholder="UOM"
                          options={uomOptions}
                          value={row.uom}
                          onChange={(e) => updateRow(row.id, "uom", e.target.value)}
                          className="w-20"
                        />
                      </td>
                      <td className="px-3 py-2 text-center text-slate-500">
                        {row.material ? getStock(row.material) : "–"}
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={row.qty}
                          onChange={(e) => updateRow(row.id, "qty", e.target.value)}
                          className="w-20"
                        />
                      </td>
                      <td className="px-3 py-2 text-center text-slate-500 whitespace-nowrap">
                        {getNetAmt(row.material, row.qty)}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => resetRow(row.id)}
                            title="Reset"
                            className="transition text-slate-400 hover:text-blue-500"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg> 
                            </svg>
                          </button>
                          <button
                            onClick={() => removeRow(row.id)}
                            title="Remove"
                            className="transition text-slate-400 hover:text-rose-500"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={addRow}
              className="flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600 transition hover:text-blue-700"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Material
            </button>
          </FormSection>

          {/* Inventory Details */}
          <FormSection title="Inventory Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Site</label>
                <Select placeholder="Select the Site (Dropdown)" options={siteOptions} value={site} onChange={(e) => setSite(e.target.value)} className="w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Warehouse</label>
                <Select placeholder="Select the Warehouse (D)" options={warehouseOptions} value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Location</label>
                <Select placeholder="Select the Location (D)" options={locationOptions} value={location} onChange={(e) => setLocation(e.target.value)} className="w-full" />
              </div>
            </div>
          </FormSection>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse items-center justify-center gap-3 px-5 py-5 border-t sm:px-8 border-slate-100 sm:flex-row">
          <button
             onClick={() => navigate("/app/PRRequestApproved")}
            
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-rose-400 hover:bg-rose-500 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            Submit PR
            
          </button>
          <button
            onClick={() => {onclose}}
            className="w-full sm:w-auto px-8 py-2.5 rounded-lg border border-rose-400 text-rose-500 text-sm font-medium hover:bg-rose-50 transition"
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
}