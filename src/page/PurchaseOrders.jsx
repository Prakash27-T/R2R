import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import CreatePurchaseOrder from "../components/CreatePurchaseOrder";
import POInitiatedSucess from "../components/POInitiatedSucess";

//import POdetailform from "./POdetailform";
//import POInitiatedSucess from "../components/POInitiatedSucess";



const statusStyle = {
  Draft: "bg-gray-100 text-gray-500 border border-gray-200",
  Open: "bg-amber-100 text-amber-700 border border-amber-200",
  Received: "bg-teal-100 text-teal-600 border border-teal-200",
  Invoiced: "bg-violet-100 text-violet-600 border border-violet-200",
  Cancelled: "bg-red-100 text-red-500 border border-red-200",
};

const approvalStyle = {
  Draft: "text-gray-500",
  "In Review": "text-amber-600",
  Approved: "text-teal-600",
  Rejected: "text-red-500",
};

const rowsPerPage = 10;


export default function PurchaseOrders() {
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [podata, setPodata] = useState([]);
  const [page, setPage] = useState(1);
  const loadProjects = async () => {
    try {
      console.log("Loading poheader...");
      const response = await axios.get(
        "http://localhost:5000/api/POList"
      );


      setPage(1);
      setLoading(false);
      console.log("PO Details:", response.data);
      setPodata(response.data);
      setLoading(false);

    }
    catch (error) {
      console.log("Error loading projects", error);
      setLoading(false);
    }

  };
  useEffect(() => {
    loadProjects();
  }, []);

  // statcards
  const statCards = [
    {
      num: "121",
      label: "Total Purchase Orders",
      desc: "All purchase orders",
      color: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-violet-300">
          <rect x="4" y="3" width="13" height="17" rx="2" /><line x1="8" y1="8" x2="13" y2="8" /><line x1="8" y1="12" x2="13" y2="12" /><line x1="8" y1="16" x2="11" y2="16" />
        </svg>
      ),
    },
    {
      num: "01",
      label: "Pending Approval",
      desc: "Purchase orders awaiting approval review.",
      color: "text-blue-400",
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-blue-300 w-7 h-7">
          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
        </svg>
      ),
    },
    {
      num: "01",
      label: "Sent Purchase Orders",
      desc: "Orders sent to vendors",
      color: "text-teal-500",
      bg: "bg-teal-50",
      border: "border-teal-100",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-teal-300 w-7 h-7">
          <rect x="4" y="3" width="13" height="17" rx="2" /><polyline points="9 11 12 14 17 9" />
        </svg>
      ),
    },
    {
      num: "03",
      label: "Open Purchase Orders",
      desc: "Active purchase orders",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-amber-300">
          <rect x="4" y="3" width="13" height="17" rx="2" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="12" y2="12" />
        </svg>
      ),
    },
  ];








  const filtered = podata.filter(
    (r) =>
      r.PurchaseOrderNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.PurchaseOrderNumber.toLowerCase().includes(search.toLowerCase())
  );



  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentProjects = filtered.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       Loading Purchase Orders...
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen font-sans bg-gray-50">

      {/* ── Top Nav ── */}
      <nav className="flex items-center justify-between px-3 py-3 bg-gray-800 shadow md:px-6">        <div className="flex flex-col leading-none ">
        <span
          className="ml-2 text-xl font-black tracking-tight md:ml-3 md:text-2xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
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
        <div className="grid grid-cols-2 gap-3 mb-8 lg:grid-cols-4 md:gap-4">
          {statCards.map((card, i) => (
            <div key={i} className={`${card.bg} border ${card.border} rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
              <div className="absolute opacity-50 top-3 right-3">{card.icon}</div>
              <div className={`text-4xl md:text-5xl font-black mb-2 ${card.color}`} style={{ fontFamily: "Georgia, serif" }}>
                {card.num}
              </div>
              <div className="mb-1 text-sm font-bold leading-snug text-gray-800">{card.label}</div>
              <div className="text-xs leading-relaxed text-gray-400">{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Table Section ── */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">

          {/* Table toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 border-b border-gray-100 md:px-6">
            <h2 className="text-lg font-bold text-gray-800 md:text-xl">Purchase Orders</h2>
            <div className="flex items-center gap-2">
              {/* Search toggle (mobile-friendly) */}
              {showSearch ? (
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  onBlur={() => { if (!search) setShowSearch(false); }}
                  className="w-40 px-3 py-2 text-sm border border-gray-200 rounded-lg md:w-52 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
                />
              ) : (
                <button onClick={() => setShowSearch(true)} className="p-2 text-gray-500 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
                  </svg>
                </button>
              )}
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                <span className="hidden text-xs sm:inline">▾</span>
              </button>
              <button

                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white transition bg-blue-700 rounded-lg shadow hover:bg-blue-800 md:px-4 md:text-sm">
                + <span className="hidden sm:inline">New Purchase Order</span><span className="sm:hidden">New PO</span>
              </button>

              {showPopup && (
                <CreatePurchaseOrder onClose={() => setShowPopup(false)} />
              )}


            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["PO No.", "Vendor Name", "Source", "Reference No.", "Materials", "Total Amount", "Delivery Date", "Approval Status", "Status", "Last Updated"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((row, i) => (
                  <tr
                    key={row.PurchaseOrderNumber}
                    className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}
                  >
                    <td className="px-4 py-3.5 text-gray-500 font-mono text-xs whitespace-nowrap">{row.PurchaseOrderNumber}</td>
                    <td className="px-4 py-3.5 text-gray-800 font-medium whitespace-nowrap">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 text-gray-700 font-semibold text-center">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 text-gray-700 font-medium whitespace-nowrap">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{row.PurchaseOrderName}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${approvalStyle[row.approval]}`}>
                        <span className={`w-2 h-2 rounded-full ${row.PurchaseOrderName} flex-shrink-0`} />
                        {row.approval}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[row.status]}`}>
                        {row.PurchaseOrderName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs whitespace-nowrap">{row.PurchaseOrderName}</td>
                  </tr>
                ))}
                {currentProjects.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-gray-400">No purchase orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100 bg-gray-50/40">
            <button
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1);
                }
              }}
              disabled={page === 1}
              className="flex items-center justify-center text-base font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-800 disabled:bg-gray-300"
            >‹
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-700">{page}</span> of <span className="font-semibold text-gray-700">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex items-center justify-center text-base font-bold text-white transition bg-gray-700 rounded-full w-9 h-9 hover:bg-gray-800 disabled:bg-gray-300"
            >›</button>
          </div>
        </div>
      </div>

    </div>
  );
}
