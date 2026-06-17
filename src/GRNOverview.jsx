import { useState } from "react";

const statCards = [
  {
    num: "128",
    label: "Total GRNs",
    desc: "Total goods receipts created",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-violet-300">
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <line x1="8" y1="8" x2="13" y2="8" />
        <line x1="8" y1="12" x2="13" y2="12" />
        <line x1="8" y1="16" x2="11" y2="16" />
      </svg>
    ),
  },
  {
    num: "84",
    label: "Fully Received",
    desc: "Purchase orders completely received",
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-teal-300 w-7 h-7">
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <polyline points="8 12 11 15 16 9" />
      </svg>
    ),
  },
  {
    num: "29",
    label: "Partial Receipts",
    desc: "Receipts pending remaining quantities",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-amber-300">
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <line x1="8" y1="8" x2="13" y2="8" />
        <line x1="8" y1="12" x2="11" y2="12" />
        <circle cx="15" cy="17" r="3" />
        <line x1="15" y1="15.5" x2="15" y2="17" />
        <circle cx="15" cy="17.8" r="0.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "00",
    label: "Pending Receipts",
    desc: "GRNs saved as draft or awaiting receipt",
    color: "text-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-blue-300 w-7 h-7">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg>
    ),
  },
];

const grnData = [
  { grn: "GRN-4571", po: "PO-115", vendor: "Sharp Circuits India",    date: "24/05/26", status: "Partially Received" },
  { grn: "GRN-4570", po: "PO-116", vendor: "Nexa Industrial Tools",   date: "22/05/26", status: "Fully Received" },
  { grn: "GRN-4569", po: "PO-189", vendor: "Global Packaging Ltd",    date: "20/05/26", status: "Fully Received" },
  { grn: "GRN-4568", po: "PO-178", vendor: "Vertex Components",       date: "20/05/26", status: "Partially Received" },
  { grn: "GRN-4567", po: "PO-124", vendor: "Vertex Components",       date: "19/05/26", status: "Partially Received" },
  { grn: "GRN-4566", po: "PO-132", vendor: "Delta Electronics",       date: "18/05/26", status: "Fully Received" },
  { grn: "GRN-4565", po: "PO-101", vendor: "Acme Office Supplies",    date: "17/05/26", status: "Partially Received" },
  { grn: "GRN-4564", po: "PO-98",  vendor: "Texas Industrial Supply", date: "15/05/26", status: "Fully Received" },
];

const statusStyle = {
  "Fully Received":    "bg-teal-100 text-teal-600 border border-teal-200",
  "Partially Received":"bg-amber-100 text-amber-600 border border-amber-200",
  "Pending":           "bg-blue-100 text-blue-500 border border-blue-200",
};

const ITEMS_PER_PAGE = 5;

export default function GRNOverview() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = grnData.filter(
    (r) =>
      r.vendor.toLowerCase().includes(search.toLowerCase()) ||
      r.grn.toLowerCase().includes(search.toLowerCase()) ||
      r.po.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen font-sans bg-gray-50">
    
      {/* ── Top Nav ── */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow md:px-6">
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            <span className="text-blue-400">R</span>
            <span className="text-gray-300">2</span>
            <span className="text-teal-400">R</span>
          </span>
          <span className="text-gray-500 text-[9px] tracking-widest uppercase">Request to Receipt</span>
        </div>

      

        <div className="flex items-center gap-2 md:gap-3">
          
           
          
          <div className="flex items-center gap-2 text-gray-300">
            <button className="text-lg transition hover:text-white">🔍</button>
            <div className="relative">
              <button className="text-lg transition hover:text-white">🔔</button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
            </div>
            <div className="flex items-center justify-center text-xs font-bold text-white bg-blue-500 rounded-full w-7 h-7">A</div>
          </div>
        </div>
      </nav>
   
      <div className="px-4 py-6 mx-auto max-w-7xl md:px-6 md:py-8">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 gap-3 mb-10 lg:grid-cols-4 md:gap-4">
          {statCards.map((card, i) => (
            <div
              key={i}
              className={`${card.bg} border ${card.border} rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group`}
            >
              <div className="absolute transition-opacity top-3 right-3 opacity-40 group-hover:opacity-60">
                {card.icon}
              </div>
              <div
                className={`text-4xl md:text-5xl font-black mb-2 ${card.color}`}
                style={{ fontFamily: "Georgia, serif" }}
              >
                {card.num}
              </div>
              <div className="mb-1 text-sm font-bold leading-snug text-gray-800">{card.label}</div>
              <div className="text-xs leading-relaxed text-gray-400">{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ── GRN Table ── */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 border-b border-gray-100 md:px-6 md:py-5">
            <h2 className="text-lg font-bold text-gray-800 md:text-xl">GRN Overview</h2>
            <div className="flex items-center gap-2">
              {showSearch ? (
                <input
                  autoFocus
                  type="text"
                  placeholder="Search GRN, PO, Vendor..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  onBlur={() => { if (!search) setShowSearch(false); }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg w-44 md:w-56 focus:outline-none focus:ring-2 focus:ring-teal-200 bg-gray-50"
                />
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-500 transition border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16.5" y1="16.5" x2="21" y2="21" />
                  </svg>
                </button>
              )}
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                <span className="text-xs">▾</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["GRN No.", "PO No.", "Vendor Name", "Receipt Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap ${
                        h === "Status" ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, i) => (
                  <tr
                    key={row.grn}
                    className={`border-b border-gray-50 hover:bg-teal-50/30 transition-colors cursor-pointer ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                    }`}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">{row.grn}</td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-500 whitespace-nowrap">{row.po}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{row.vendor}</td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.date}</td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${statusStyle[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 text-center text-gray-400 py-14">
                      No GRN records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100 bg-gray-50/40">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center text-base font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-900 disabled:bg-gray-300"
            >
              ‹
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-700">{page}</span> of{" "}
              <span className="font-semibold text-gray-700">{totalPages}</span>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center justify-center text-base font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-900 disabled:bg-gray-300"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
