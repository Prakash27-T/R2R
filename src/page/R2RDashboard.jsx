import { useState } from "react";

const statusStyles = {
  Sent: "bg-amber-100 text-amber-700 border border-amber-200",
  Created: "bg-violet-100 text-violet-700 border border-violet-200",
  Received: "bg-teal-100 text-teal-700 border border-teal-200",
  Accepted: "bg-sky-100 text-sky-700 border border-sky-200",
  Cancelled: "bg-red-100 text-red-600 border border-red-200",
};

const rfqData = [
  { id: "RFQC-120", title: "PCB Raw Material Sourcing", pr: "PR-109", materials: 2, created: "12/05/26", expiring: "16/05/26", lowestStatus: "Sent", highestStatus: "Sent", updated: "12/05/26" },
  { id: "RFQC-104", title: "SMT Line Tooling Requirements", pr: "-", materials: 7, created: "04/04/26", expiring: "08/05/26", lowestStatus: "Created", highestStatus: "Created", updated: "08/05/26" },
  { id: "RFQC-103", title: "Factory Consumables Procurement", pr: "-", materials: 4, created: "06/04/26", expiring: "10/05/26", lowestStatus: "Sent", highestStatus: "Sent", updated: "10/05/26" },
  { id: "RFQC-101", title: "Factory Consumables Procurement", pr: "-", materials: 4, created: "14/03/26", expiring: "18/03/26", lowestStatus: "Received", highestStatus: "Received", updated: "18/03/26" },
  { id: "RFQC-100", title: "Factory Consumables Procurement", pr: "PR-121", materials: 4, created: "11/03/26", expiring: "14/03/26", lowestStatus: "Accepted", highestStatus: "Received", updated: "14/03/26" },
];

const statCards = [
  { num: "01", label: "Open RFQ Cases", desc: "Active RFQ cases in progress.", color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-100", icon: "🕐" },
  { num: "02", label: "Cases Under Review", desc: "Vendor quotations under evaluation.", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", icon: "📋" },
  { num: "07", label: "RFQ Cases Closed", desc: "RFQ cases converted into POs.", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100", icon: "📄" },
  { num: "02", label: "RFQ Cases Cancelled", desc: "RFQ cases closed without PO creation.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", icon: "🚫" },
];

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-500"}`}>
    {status}
  </span>
);

export default function R2RDashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = rfqData.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              <span className="text-blue-400">R</span>
              <span className="text-gray-300">2</span>
              <span className="text-blue-400">R</span>
            </span>
            <span className="text-gray-400 text-[10px] tracking-widest uppercase">Request to Receipt</span>
          </div>
        </div>

        <span className="text-sm font-medium tracking-wide text-gray-300">Untitled</span>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white">
            <span className="flex items-center justify-center text-xs bg-gray-500 rounded-full w-7 h-7">👤</span>
            Log in or create account
          </button>
          <button className="flex items-center gap-2 bg-white text-gray-700 text-sm px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition shadow">
            <span className="font-bold text-blue-500">G</span> Continue with Google
          </button>
          <div className="flex items-center gap-2 text-gray-300">
            <button className="text-lg transition hover:text-white">🔍</button>
            <div className="relative">
              <button className="text-lg transition hover:text-white">🔔</button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">4</span>
            </div>
            <div className="flex items-center justify-center text-xs font-bold text-white bg-blue-500 rounded-full w-7 h-7">A</div>
          </div>
        </div>
      </nav>

      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {statCards.map((card, i) => (
            <div
              key={i}
              className={`${card.bg} border ${card.border} rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="absolute text-2xl top-4 right-4 opacity-40">{card.icon}</div>
              <div className={`text-5xl font-black mb-2 ${card.color}`} style={{ fontFamily: "Georgia, serif" }}>
                {card.num}
              </div>
              <div className="mb-1 text-sm font-bold text-gray-800">{card.label}</div>
              <div className="text-xs leading-relaxed text-gray-500">{card.desc}</div>
            </div>
          ))}

          {/* Illustration card */}
          <div className="flex justify-end col-span-4 pr-2 -mt-32 pointer-events-none select-none">
            <svg width="180" height="120" viewBox="0 0 180 120" className="opacity-80">
              <rect x="80" y="10" width="90" height="60" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
              <circle cx="90" cy="20" r="3" fill="#ef4444"/>
              <circle cx="100" cy="20" r="3" fill="#f59e0b"/>
              <circle cx="110" cy="20" r="3" fill="#22c55e"/>
              <rect x="88" y="30" width="70" height="6" rx="3" fill="#67e8f9"/>
              <rect x="88" y="40" width="55" height="6" rx="3" fill="#67e8f9"/>
              <rect x="88" y="50" width="60" height="6" rx="3" fill="#67e8f9"/>
              <rect x="88" y="60" width="35" height="6" rx="3" fill="#f43f5e"/>
              <rect x="20" y="40" width="55" height="40" rx="4" fill="#c4b5fd" opacity="0.7"/>
              <rect x="30" y="50" width="55" height="40" rx="4" fill="#93c5fd" opacity="0.7"/>
              <rect x="10" y="80" width="20" height="20" rx="10" fill="none" stroke="#cbd5e1" strokeWidth="1.5"/>
              <rect x="50" y="80" width="20" height="20" rx="10" fill="none" stroke="#cbd5e1" strokeWidth="1.5"/>
              <line x1="0" y1="72" x2="85" y2="42" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Track Your RFQ Cases</h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <span className="absolute text-sm text-gray-400 -translate-y-1/2 left-3 top-1/2">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="py-2 pl-8 pr-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 w-44 bg-gray-50"
                />
              </div>
              {/* Filter */}
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                ⚙️ <span className="text-xs">▾</span>
              </button>
              {/* New RFQ */}
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-blue-700 rounded-lg shadow hover:bg-blue-800">
                + New Request for Quotation
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["RFQ Case ID", "Case Title", "PR Reference", "Materials", "Created Date", "Expiring Date", "Lowest Status", "Highest Status", "Last Updated"].map((h) => (
                    <th key={h} className="px-5 py-3 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{row.id}</td>
                    <td className="px-5 py-4 text-gray-800 font-medium max-w-[200px] truncate">{row.title}</td>
                    <td className="px-5 py-4 text-gray-500">{row.pr}</td>
                    <td className="px-5 py-4 font-semibold text-center text-gray-700">{row.materials}</td>
                    <td className="px-5 py-4 text-gray-500">{row.created}</td>
                    <td className="px-5 py-4 text-gray-500">{row.expiring}</td>
                    <td className="px-5 py-4"><StatusBadge status={row.lowestStatus} /></td>
                    <td className="px-5 py-4"><StatusBadge status={row.highestStatus} /></td>
                    <td className="px-5 py-4 text-gray-500">{row.updated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-gray-400">No RFQ cases found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 py-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center justify-center text-sm font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-800"
            >
              ‹
            </button>
            <span className="text-sm text-gray-500">Page <span className="font-semibold text-gray-700">{page}</span></span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center justify-center text-sm font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-800"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
