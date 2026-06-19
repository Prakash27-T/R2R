import { useState, useEffect } from "react";
import NewPurchaseReqst from "./NewPurchaseReqst";
import PrRequstInitSuccess from "./PrRequstInitSuccess";
import PRMaterialRequirement from "./PRMaterialRequirement";
import PRRequestApproved from "./components/PRRequestApproved";
import axios from "axios";
const stats = [];


const statusStyles = {
  "In Review": "bg-amber-100 text-amber-600",
  Approved: "bg-teal-100 text-teal-600",
  Closed: "bg-slate-200 text-slate-500",
};

const stageColor = {
  "Awaiting Approval": "text-amber-500",
  "Awaiting Procurement Action": "text-blue-500",
  "RFQ in Progress": "text-indigo-500",
  "PO in Progress": "text-teal-500",
  "PO Released": "text-green-600",
};

const allData = [

];

export default function DbsPurchaseRequest() {
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("All");
  const[projects,setProjects]=useState([]);
  const loadProjects = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/PRList"
      );

      console.log(response.data);
      setProjects(response.data);



    }
    catch (error) {
      console.log("Error loading projects", error);
    }
  };

  const filteredProjects = response.filter((project) => {

    const matchStatus =
      filter === "All"
        ? true
        : project.status === filter;

    const matchSearch =
      project.ProjectId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      project.ProductName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (



    <div className="min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
            R2R
          </span>
          <span className="text-gray-500 text-[9px] tracking-widest uppercase">Request to Receipt</span>
        </div>

        <div className="flex items-center gap-5">
          <button className="transition-colors text-slate-500 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="relative transition-colors text-slate-500 hover:text-slate-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-teal-400 rounded-full">A</div>
        </div>
      </header>

      <main className="max-w-screen-xl px-8 py-6 mx-auto">
        {/* Stats + Illustration */}
        <div className="flex items-start gap-5 mb-10">
          <div className="grid flex-1 grid-cols-5 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border ${s.border} ${s.bg} p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-5xl font-extrabold leading-none ${s.color}`}>{s.count}</span>
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug text-slate-700">{s.label}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration placeholder */}

        </div>

        {/* Table Section */}
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          {/* Table Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800">Purchase Requisitions</h2>
            <div className="flex items-center gap-3">
              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "active"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Active PR
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "history"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  PR History
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                {showSearch ? (
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => !search && setShowSearch(false)}
                    placeholder="Search..."
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-44"
                  />
                ) : (
                  <button
                    //onClick={() => setStep(2)}
                    onClick={() => setShowSearch(true)}
                    className="p-2 border rounded-lg border-slate-200 hover:bg-gray-50 text-slate-500"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter */}
              <button className="flex items-center gap-1 p-2 border rounded-lg border-slate-200 hover:bg-gray-50 text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* New PR Button */}
              <button

                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800">
                <span className="text-lg leading-none">+</span>
                New Purchase Requisition
              </button>
              {showPopup && (
                <NewPurchaseReqst onClose={() => setShowPopup(false)} />
              )}



            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs font-semibold tracking-wide uppercase bg-gray-50 text-slate-500">
                  <th className="px-4 py-3">PR ID</th>
                  <th className="px-4 py-3">PR Name</th>
                  <th className="px-4 py-3">Requested Date</th>
                  <th className="px-4 py-3 text-center">Total Materials</th>
                  <th className="px-4 py-3 text-right">Estimated Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3">Current Stage</th>
                  <th className="px-4 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-medium text-slate-700">{row.id}</td>
                    <td className="px-4 py-3.5 text-slate-600">{row.name}</td>
                    <td className="px-4 py-3.5 text-slate-500">{row.date}</td>
                    <td className="px-4 py-3.5 text-center text-slate-600">{row.materials}</td>
                    <td className="px-4 py-3.5 text-right text-slate-600 font-medium">{row.amount}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full inline-block ${stageColor[row.stage].replace("text-", "bg-")}`}></span>
                        <span className={`text-xs font-medium ${stageColor[row.stage]}`}>{row.stage}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">{row.updated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>

  );
}
