import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RFQGenerateModal from "../components/RFQGenerateModal";
const Select = ({ placeholder, options = [], value, onChange, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 pr-8 text-sm transition bg-white border rounded-lg appearance-none border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <svg className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-2 top-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const Input = ({ placeholder, value, onChange, type = "text", className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition placeholder-slate-400 ${className}`}
  />
);

const DateInput = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 pr-8 text-sm transition bg-white border rounded-lg border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400"
    />
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="overflow-hidden bg-white border shadow-sm border-slate-100 rounded-2xl">
    <div className="px-6 py-4 border-b border-slate-100">
      <h2 className="text-base font-bold text-slate-800">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const RequiredStar = () => <span className="text-rose-500 ml-0.5">*</span>;

const emptyMaterial = () => ({ id: Date.now(), name: "", category: "", deliveryDate: "2026-06-06", qty: "" });
const emptyVendor = () => ({ id: Date.now(), name: "", deliveryTerm: "", modeOfDelivery: "", paymentTerm: "", methodOfPayment: "", remarks: "" });

export default function RFQForm() {
  const navigate = useNavigate();
  // Case Details
  const [expectedDelivery, setExpectedDelivery] = useState("2026-06-06");
  const [expirationDate, setExpirationDate] = useState("2026-06-16");

  // Delivery Details
  const [deliveryContact, setDeliveryContact] = useState("Hi-Q Main Manufacturing Unit");
  const [deliveryAddress, setDeliveryAddress] = useState("Gate 1 Warehouse, SIPCOT Industrial Park, Chennai");

  // Inventory Details
  const [site, setSite] = useState("Chennai Manufacturing Site");
  const [warehouse, setWarehouse] = useState("Raw Material Warehouse – RM01");

  // Procurement Details
  const [deliveryTerm, setDeliveryTerm] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [methodOfPayment, setMethodOfPayment] = useState("");
  const [remarks, setRemarks] = useState("");

  // Material rows
  const [materials, setMaterials] = useState([emptyMaterial()]);
  const updateMaterial = (id, field, val) =>
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  const addMaterial = () => setMaterials((prev) => [...prev, emptyMaterial()]);
  const removeMaterial = (id) => setMaterials((prev) => prev.filter((m) => m.id !== id));

  // Vendor rows
  const [vendors, setVendors] = useState([emptyVendor()]);
  const updateVendor = (id, field, val) =>
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: val } : v)));
  const addVendor = () => setVendors((prev) => [...prev, emptyVendor()]);
  const removeVendor = (id) => setVendors((prev) => prev.filter((v) => v.id !== id));

  const deliveryTermOptions = ["FOB", "CIF", "EXW", "DDP", "DAP"];
  const modeOptions = ["Road", "Air", "Sea", "Rail", "Courier"];
  const paymentTermOptions = ["Net 30", "Net 60", "Immediate", "Advance"];
  const methodOptions = ["Bank Transfer", "Cheque", "Cash", "LC"];

  return (
    <div className="min-h-screen px-4 py-8 bg-slate-100">
      <div className="max-w-6xl mx-auto overflow-hidden shadow-xl bg-slate-50 rounded-3xl">

        {/* Header */}
        <div className="relative flex items-center justify-between px-8 py-6 bg-white border-b border-slate-100">
          <h1 className="flex-1 text-xl font-bold text-center sm:text-2xl text-slate-900">
            RFQC-123 – Maintenance Spare Parts Procurement
          </h1>
          <button className="absolute transition right-6 top-6 text-slate-400 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-6 space-y-5 sm:px-8">

          {/* Case Details */}
          <SectionCard title="Case Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Created Date</label>
                <div className="px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200 text-slate-600">12/05/26</div>
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Expected Delivery Date <RequiredStar /></label>
                <DateInput value={expectedDelivery} onChange={setExpectedDelivery} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Expiration Date & Time <RequiredStar /></label>
                <DateInput value={expirationDate} onChange={setExpirationDate} />
              </div>
            </div>
          </SectionCard>

          {/* Delivery Details */}
          <SectionCard title="Delivery Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Delivery Contact</label>
                <Select
                  placeholder="Select Contact"
                  options={["Hi-Q Main Manufacturing Unit", "Hi-Q Chennai Unit"]}
                  value={deliveryContact}
                  onChange={setDeliveryContact}
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Delivery Address</label>
                <Select
                  placeholder="Select Address"
                  options={["Gate 1 Warehouse, SIPCOT Industrial Park, Chennai", "Gate 2 Warehouse, Chennai"]}
                  value={deliveryAddress}
                  onChange={setDeliveryAddress}
                />
              </div>
            </div>
          </SectionCard>

          {/* Inventory Details */}
          <SectionCard title="Inventory Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Site</label>
                <Select
                  placeholder="Select Site"
                  options={["Chennai Manufacturing Site", "Pune Manufacturing Site"]}
                  value={site}
                  onChange={setSite}
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Warehouse</label>
                <Select
                  placeholder="Select Warehouse"
                  options={["Raw Material Warehouse – RM01", "Finished Goods – FG01"]}
                  value={warehouse}
                  onChange={setWarehouse}
                />
              </div>
            </div>
          </SectionCard>

          {/* Procurement Details */}
          <SectionCard title="Procurement Details">
            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Delivery Term</label>
                <Select placeholder="Select Delivery Term" options={deliveryTermOptions} value={deliveryTerm} onChange={setDeliveryTerm} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Mode of Delivery</label>
                <Select placeholder="Select Mode" options={modeOptions} value={modeOfDelivery} onChange={setModeOfDelivery} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Payment Term</label>
                <Select placeholder="Select Payment Term" options={paymentTermOptions} value={paymentTerm} onChange={setPaymentTerm} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Method of Payment</label>
                <Select placeholder="Select Method" options={methodOptions} value={methodOfPayment} onChange={setMethodOfPayment} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Attachments</label>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition cursor-pointer hover:text-blue-800">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Upload File
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-500">Remarks</label>
                <Input
                  placeholder="Enter any material-specific instructions, sourcing notes, or vendor requirements."
                  value={remarks}
                  onChange={setRemarks}
                />
              </div>
            </div>
          </SectionCard>

          {/* Material Details */}
          <SectionCard title="Material Details">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="text-xs font-semibold bg-slate-50 text-slate-500">
                    <th className="px-3 py-2 text-left rounded-l-lg">Material Name</th>
                    <th className="px-3 py-2 text-left">Material Category <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Expected Delivery Date</th>
                    <th className="px-3 py-2 text-left">Available Stock</th>
                    <th className="px-3 py-2 text-left">Quantity <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Unit Price</th>
                    <th className="px-3 py-2 text-left">Est. Net Amount</th>
                    <th className="px-3 py-2 text-left rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.id} className="border-t border-slate-100">
                      <td className="px-3 py-2">
                        <Select placeholder="Enter Material Name" options={["Bearing – SKF 6205", "Gasket Set A", "Filter – HF2001"]} value={m.name} onChange={(v) => updateMaterial(m.id, "name", v)} />
                      </td>
                      <td className="px-3 py-2">
                        <Select placeholder="Enter Category" options={["Mechanical", "Electrical", "Hydraulic", "Consumable"]} value={m.category} onChange={(v) => updateMaterial(m.id, "category", v)} />
                      </td>
                      <td className="px-3 py-2">
                        <DateInput value={m.deliveryDate} onChange={(v) => updateMaterial(m.id, "deliveryDate", v)} />
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400">–</td>
                      <td className="px-3 py-2">
                        <Input placeholder="Qty" value={m.qty} onChange={(v) => updateMaterial(m.id, "qty", v)} />
                      </td>
                      <td className="px-3 py-2 text-center text-slate-400">–</td>
                      <td className="px-3 py-2 text-center text-slate-400">–</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button className="transition text-slate-400 hover:text-slate-600" title="Reset">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          <button onClick={() => removeMaterial(m.id)} className="transition text-slate-400 hover:text-rose-500" title="Remove">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={addMaterial} className="flex items-center gap-1 mt-4 text-sm font-semibold text-blue-600 transition hover:text-blue-800">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Material
            </button>
          </SectionCard>

          {/* Vendor Assignment */}
          <SectionCard title="Vendor Assignment">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="text-xs font-semibold bg-slate-50 text-slate-500">
                    <th className="px-3 py-2 text-left rounded-l-lg">Vendor Name <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Delivery Term <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Mode of Delivery <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Payment Term <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Method of Payment <span className="text-rose-500">*</span></th>
                    <th className="px-3 py-2 text-left">Attachments</th>
                    <th className="px-3 py-2 text-left">Remarks</th>
                    <th className="px-3 py-2 text-left rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v.id} className="border-t border-slate-100">
                      <td className="px-3 py-2">
                        <Select placeholder="Enter Vendor Name" options={["Vendor A", "Vendor B", "Vendor C"]} value={v.name} onChange={(val) => updateVendor(v.id, "name", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <Select placeholder="Select" options={deliveryTermOptions} value={v.deliveryTerm} onChange={(val) => updateVendor(v.id, "deliveryTerm", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <Select placeholder="Select" options={modeOptions} value={v.modeOfDelivery} onChange={(val) => updateVendor(v.id, "modeOfDelivery", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <Select placeholder="Select" options={paymentTermOptions} value={v.paymentTerm} onChange={(val) => updateVendor(v.id, "paymentTerm", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <Select placeholder="Select" options={methodOptions} value={v.methodOfPayment} onChange={(val) => updateVendor(v.id, "methodOfPayment", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <label className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-800 whitespace-nowrap">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          Upload File
                          <input type="file" className="hidden" />
                        </label>
                      </td>
                      <td className="px-3 py-2">
                        <Input placeholder="Remarks" value={v.remarks} onChange={(val) => updateVendor(v.id, "remarks", val)} />
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <button className="transition text-slate-400 hover:text-slate-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          <button onClick={() => removeVendor(v.id)} className="transition text-slate-400 hover:text-rose-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={addVendor} className="flex items-center gap-1 mt-4 text-sm font-semibold text-blue-600 transition hover:text-blue-800">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Vendor
            </button>
          </SectionCard>

          {/* Action Buttons */}
          <div 
             onClick={() => navigate("/app/RFQGenerateModal")}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 pb-4">
            <button className="px-7 py-2.5 rounded-xl bg-rose-400 hover:bg-rose-500 active:scale-95 text-white font-semibold text-sm transition-all shadow-sm">
              Generate RFQs
              
            </button>
            <button className="px-7 py-2.5 rounded-xl border-2 border-rose-400 text-rose-500 hover:bg-rose-50 active:scale-95 font-semibold text-sm transition-all">
              Save Draft
            </button>
            <button className="px-7 py-2.5 rounded-xl border-2 border-rose-400 text-rose-500 hover:bg-rose-50 active:scale-95 font-semibold text-sm transition-all">
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}