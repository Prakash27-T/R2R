import { useState } from "react";
import CreateRFQNewCase from "./CreateRFQNewCase";
import { useNavigate } from "react-router-dom";

const rfqData = [
  {
    id: "RFQC-120",
    title: "PCB Raw Material Sourcing",
    pr: "PR-109",
    materials: 2,
    created: "12/05/26",
    expiring: "16/05/26",
    lowestStatus: "Sent",
    highestStatus: "Sent",
    lastUpdated: "12/05/26",
  },
  {
    id: "RFQC-104",
    title: "SMT Line Tooling Requirements",
    pr: "-",
    materials: 7,
    created: "04/04/26",
    expiring: "08/05/26",
    lowestStatus: "Created",
    highestStatus: "Created",
    lastUpdated: "08/05/26",
  },
  {
    id: "RFQC-103",
    title: "Factory Consumables Procurement",
    pr: "-",
    materials: 4,
    created: "06/04/26",
    expiring: "10/05/26",
    lowestStatus: "Sent",
    highestStatus: "Sent",
    lastUpdated: "10/05/26",
  },
  {
    id: "RFQC-101",
    title: "Factory Consumables Procurement",
    pr: "-",
    materials: 4,
    created: "14/03/26",
    expiring: "18/03/26",
    lowestStatus: "Received",
    highestStatus: "Received",
    lastUpdated: "18/03/26",
  },
  {
    id: "RFQC-100",
    title: "Factory Consumables Procurement",
    pr: "PR-121",
    materials: 4,
    created: "11/03/26",
    expiring: "14/03/26",
    lowestStatus: "Accepted",
    highestStatus: "Received",
    lastUpdated: "14/03/26",
  },
];

const statusColors = {
  Sent: "bg-amber-100 text-amber-600 border border-amber-200",
  Created: "bg-indigo-100 text-indigo-500 border border-indigo-200",
  Received: "bg-sky-100 text-sky-600 border border-sky-200",
  Accepted: "bg-teal-100 text-teal-600 border border-teal-200",
};

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || "bg-gray-100 text-gray-500"}`}>
    {status}
  </span>
);

const StatCard = ({ number, label, description, color, icon }) => (
  <div className={`rounded-2xl p-5 flex flex-col gap-2 flex-1 min-w-[150px] ${color}`}>
    <div className="flex items-start justify-between">
      <span className="text-4xl font-extrabold leading-none tracking-tight" style={{ color: "inherit" }}>
        {String(number).padStart(2, "0")}
      </span>
      <span className="text-2xl opacity-60">{icon}</span>
    </div>
    <p className="text-sm font-bold leading-tight">{label}</p>
    <p className="text-xs leading-snug opacity-70">{description}</p>
  </div>
);

export default function RFQPage() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const filtered = rfqData.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      {/* Navbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
              R2R
            </span>
            <span className="text-gray-500 text-[9px] tracking-widest uppercase">Request to Receipt</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 transition hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
          </button>
          <button className="relative text-gray-500 transition hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 0 0-5-5.917V4a1 1 0 0 0-2 0v1.083A6 6 0 0 0 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 0 1-6 0v-1m6 0H9" /></svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full shadow bg-gradient-to-br from-cyan-400 to-blue-500">A</div>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto space-y-8 max-w-7xl sm:px-6">
        {/* Stat Cards + Illustration */}
        <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-sm rounded-3xl lg:flex-row">
          <div className="flex flex-wrap flex-1 gap-4">
            <StatCard number={1} label="Open RFQ Cases" description="Active RFQ cases in progress." color="text-indigo-500 bg-indigo-50" icon="🕐" />
            <StatCard number={2} label="Cases Under Review" description="Vendor quotations under evaluation." color="text-blue-500 bg-blue-50" icon="📥" />
            <StatCard number={7} label="RFQ Cases Closed" description="RFQ cases converted into POs." color="text-cyan-500 bg-cyan-50" icon="📋" />
            <StatCard number={2} label="RFQ Cases Cancelled" description="RFQ cases closed without PO creation." color="text-amber-500 bg-amber-50" icon="🗂️" />
          </div>
          {/* Illustration placeholder */}
          <div className="items-center justify-center hidden w-56 h-40 lg:flex shrink-0">
            <svg viewBox="0 0 200 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="80" y="10" width="110" height="80" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              <circle cx="93" cy="23" r="3" fill="#f87171"/>
              <circle cx="103" cy="23" r="3" fill="#fbbf24"/>
              <circle cx="113" cy="23" r="3" fill="#34d399"/>
              <rect x="90" y="35" width="85" height="8" rx="3" fill="#67e8f9"/>
              <rect x="90" y="49" width="70" height="8" rx="3" fill="#67e8f9"/>
              <rect x="90" y="63" width="55" height="8" rx="3" fill="#f87171" opacity="0.6"/>
              <rect x="140" y="63" width="25" height="8" rx="3" fill="#fbbf24" opacity="0.8"/>
              <circle cx="55" cy="100" width="60" height="60" r="30" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
              <rect x="30" y="78" width="55" height="45" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              <rect x="38" y="86" width="12" height="12" rx="2" fill="#818cf8"/>
              <rect x="38" y="102" width="30" height="5" rx="2" fill="#e2e8f0"/>
              <rect x="38" y="110" width="20" height="5" rx="2" fill="#e2e8f0"/>
              <rect x="90" y="78" width="40" height="12" rx="3" fill="#f87171" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Table section */}
        <div className="overflow-hidden bg-white shadow-sm rounded-3xl">
          {/* Table Header */}
          <div className="flex flex-col items-start justify-between gap-3 px-6 py-4 border-b border-gray-100 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold tracking-tight text-gray-800">Track Your RFQ Cases</h2>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <svg className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                <input
                  className="py-2 pr-3 text-sm border border-gray-200 pl-9 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-gray-50"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {/* Filter */}
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 transition border border-gray-200 rounded-xl hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2"/></svg>
                Filter
              </button>
              {/* New RFQ */}
              <button 
                 onClick={() => navigate("/app/CreateRFQNewcase")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800">
                <span className="text-lg leading-none">+</span> New Request for Quotation
              </button>
            
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs tracking-wider text-gray-500 uppercase bg-gray-50">
                  <th className="px-5 py-3 font-semibold text-left">RFQ Case ID</th>
                  <th className="px-5 py-3 font-semibold text-left">Case Title</th>
                  <th className="px-5 py-3 font-semibold text-left">PR Reference</th>
                  <th className="px-5 py-3 font-semibold text-center">Materials</th>
                  <th className="px-5 py-3 font-semibold text-left">Created Date</th>
                  <th className="px-5 py-3 font-semibold text-left">Expiring Date</th>
                  <th className="px-5 py-3 font-semibold text-center">Lowest Status</th>
                  <th className="px-5 py-3 font-semibold text-center">Highest Status</th>
                  <th className="px-5 py-3 font-semibold text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-100 hover:bg-cyan-50/40 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500 whitespace-nowrap">{row.id}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{row.title}</td>
                    <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">{row.pr}</td>
                    <td className="px-5 py-3.5 text-center text-gray-700 font-semibold">{row.materials}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{row.created}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{row.expiring}</td>
                    <td className="px-5 py-3.5 text-center"><StatusBadge status={row.lowestStatus} /></td>
                    <td className="px-5 py-3.5 text-center"><StatusBadge status={row.highestStatus} /></td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{row.lastUpdated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-gray-400">No matching RFQ cases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {showPopup && (
          <CreateRFQNewCase onClose={() => setShowPopup(false)} />
          )}
        </div>
         
      </main>
      
    </div>
  );
}