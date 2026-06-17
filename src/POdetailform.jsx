import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const initialMaterials = [
  { id: 1, name: "", category: "", deliveryDate: "06/06/2026", quantity: "", unitPrice: "-", taxPercent: "-", taxCode: "-", taxAmount: "-", netAmount: "-" },
];

const categoryOptions = ["Raw Materials", "Chemicals", "Packaging", "Consumables", "Spare Parts"];
const materialOptions = ["Steel Sheets", "Aluminum Rods", "Copper Wire", "Plastic Granules", "Rubber Gaskets"];

export default function POdetailform() {
  const [importOrder, setImportOrder] = useState(false);
  const [materials, setMaterials] = useState(initialMaterials);
  const navigate = useNavigate ();
  const addMaterial = () => {
    setMaterials([
      ...materials,
      { id: Date.now(), name: "", category: "", deliveryDate: "06/06/2026", quantity: "", unitPrice: "-", taxPercent: "-", taxCode: "-", taxAmount: "-", netAmount: "-" },
    ]);
  };

  const removeMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const updateMaterial = (id, field, value) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  return (
    <div className="min-h-screen px-4 py-6 font-sans bg-slate-100">
      <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
        {/* Header */}
        <div className="relative flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
          <div className="flex-1" />
          <h1 className="text-xl font-semibold tracking-wide text-slate-800">PO-124 – PVS LTD.</h1>
          <div className="flex justify-end flex-1">
            <button className="text-2xl leading-none text-slate-400 hover:text-slate-600">&times;</button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 md:px-10">

          {/* PO Details */}
          <Section title="PO Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
              <Field label="Created Date" value="21/05/26" />
              <Field label="Currency" value="INR" />
              <Field label="Vendor Account" value="V0789" />
              <Field label="Contact Person" value="Veena" />
              <Field label="Phone" value="+91 98765 43210" />
              <Field label="Email" value="procure@pvsltd.com" />
              <Field label="Delivery Address" value="No. 14, SIDCO Industrial Estate, Guindy, Chennai – 600032" className="sm:col-span-2" />
            </div>
          </Section>

          {/* Inventory Details */}
          <Section title="Inventory Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField label="Site" value="Chennai Manufacturing Site" options={["Chennai Manufacturing Site", "Pune Plant", "Delhi Warehouse"]} />
              <SelectField label="Warehouse" value="Raw Material Warehouse – RM01" options={["Raw Material Warehouse – RM01", "Finished Goods – FG01", "Spare Parts – SP01"]} />
            </div>
          </Section>

          {/* Commercial Details */}
          <Section title="Commercial Details">
            <div className="grid items-end grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">
                  Expected Delivery Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue="2026-06-06"
                    className="w-full px-3 py-2 text-sm border rounded-lg border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Field label="Tax Type" value="GST" />
              <Field label="Total Amount" value="–" />
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Import Order</label>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => setImportOrder(!importOrder)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${importOrder ? "bg-blue-600" : "bg-blue-600"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${importOrder ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                  <span className="text-sm text-slate-600">{importOrder ? "On" : "Off"}</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Procurement Details */}
          <Section title="Procurement Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SelectField label="Delivery Term" value="C&F" options={["C&F", "FOB", "CIF", "EXW", "DDP"]} />
              <SelectField label="Mode of Delivery" value="By Road" options={["By Road", "By Air", "By Sea", "By Rail"]} />
              <SelectField label="Payment Term" value="Net 30 Days" options={["Net 30 Days", "Net 15 Days", "Net 60 Days", "Advance", "COD"]} />
              <SelectField label="Method of Payment" value="Bank Transfer" options={["Bank Transfer", "Cheque", "Cash", "UPI", "Letter of Credit"]} />
            </div>
          </Section>

          {/* Material Details */}
          <Section title="Material Details">
            <div className="-mx-2 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    {["Material Name", "Material Category *", "Expected Delivery Date", "Quantity *", "Unit Price", "Tax %", "Tax Code", "Tax Amount", "Est. Net Amount", "Action"].map((h) => (
                      <th key={h} className="px-3 py-2 text-xs font-semibold text-left border-b text-slate-500 whitespace-nowrap border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {materials.map((mat) => (
                    <tr key={mat.id} className="transition-colors border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2">
                        <select
                          value={mat.name}
                          onChange={(e) => updateMaterial(mat.id, "name", e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[140px]"
                        >
                          <option value="">Enter Material Name</option>
                          {materialOptions.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <select
                          value={mat.category}
                          onChange={(e) => updateMaterial(mat.id, "category", e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[130px]"
                        >
                          <option value="">Enter Category</option>
                          {categoryOptions.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="date"
                          defaultValue="2026-06-06"
                          className="border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[130px]"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          value={mat.quantity}
                          onChange={(e) => updateMaterial(mat.id, "quantity", e.target.value)}
                          className="w-full border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-[80px]"
                        />
                      </td>
                      {["unitPrice", "taxPercent", "taxCode", "taxAmount", "netAmount"].map((f) => (
                        <td key={f} className="px-3 py-2 text-xs text-center text-slate-400">–</td>
                      ))}
                      <td className="px-3 py-2">
                        <div className="flex items-center justify-center gap-2">
                          <button className="transition-colors text-slate-400 hover:text-blue-500" title="Refresh">↻</button>
                          <button onClick={() => removeMaterial(mat.id)} className="transition-colors text-slate-400 hover:text-red-500" title="Remove">&times;</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={addMaterial}
              className="mt-3 text-sm font-medium text-blue-600 underline transition-colors hover:text-blue-800 underline-offset-2"
            >
              + Add Material
            </button>
          </Section>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 pb-4">
            <button 
             onClick={() => navigate("/app/POSubmitted")}
             className="px-8 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg text-sm transition-colors shadow-sm">
              Submit PO
            </button>
            <button className="px-8 py-2.5 border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-lg text-sm transition-colors">
              Save Draft
            </button>
            <button className="px-8 py-2.5 border-2 border-slate-300 text-slate-600 hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors">
              Cancel
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-5 border bg-slate-50 rounded-xl border-slate-200">
      <h2 className="mb-4 text-sm font-semibold text-slate-700">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-xs font-medium text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}

function SelectField({ label, value, options }) {
  const [val, setVal] = useState(value);
  return (
    <div>
      <label className="block mb-1 text-xs font-medium text-slate-500">{label}</label>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3 py-2 text-sm bg-white border rounded-lg border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}