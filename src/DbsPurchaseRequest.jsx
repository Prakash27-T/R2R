import { useState, useEffect } from "react";
import NewPurchaseReqst from "./NewPurchaseReqst";
import PrRequstInitSuccess from "./PrRequstInitSuccess";
import PRMaterialRequirement from "./PRMaterialRequirement";
import PRRequestApproved from "./components/PRRequestApproved";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PRLineReport from "./components/PRLineReport";
const stats = [];
export default function DbsPurchaseRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [prdetails, setPrdetails] = useState({
    totalPR: 0,
    draftPR: 0,
    approvedPR: 0,
    closedPR: 0,
  });
  const navigate = useNavigate();
  const statusStyles = {
      Draft:
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-md",

      InReview:
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md",

      Approved:
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md",

      Rejected:
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md",

      Closed:
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-md",
    Cancelled:
          "inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-md"
    };
  const loadProjects = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/PRList"
      );

      console.log(response.data);
      setProjects(response.data);
      setLoading(false);
      console.log("Projects loaded successfully");
      setPrdetails({
        totalPR: response.data.length,
        draftPR: response.data.filter(
          (pr) => pr.LineStatus === "Draft"
        ).length,
        approvedPR: response.data.filter(
          (pr) => pr.LineStatus === "Approved"
        ).length,
        closedPR: response.data.filter(
          (pr) => pr.LineStatus === "Closed"
        ).length,
      });
      console.log("PR Details:", prdetails);
    }
    catch (error) {
      console.log("Error loading projects", error);
    }

  };
  const [materials, setMaterials] = useState([]);

  const handleRowClick = async (row) => {
    const response = await axios.get(
      `http://localhost:5000/api/PR_lines/${row.RequisitionNumber}`
    );
    console.log("Materials for selected PR:", response.data);
    setMaterials(response.data.value);
    //await getMaterials(row.RequisitionNumber);
    console.log("Clicked:", row.RequisitionNumber);
    console.log("Clicked:", row.RequisitionName);
    navigate(`/app/PRLineReport/${row.RequisitionNumber}`, {
      state: {
        RequisitionName: row.RequisitionName,
      },
    });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.ProjectId?.toLowerCase().includes(search.toLowerCase()) ||
      project.RequisitionNumber?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" ||
      project.LineStatus === filter;

    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ number, label, description, color, icon }) => (
    <div className={`rounded-2xl p-5 flex flex-col gap-2 flex-wrap min-w-[150px] ${color}`}>
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
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentProjects = filteredProjects.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const statusOptions = [
    "All",
    "Draft",
    "Approved",
    "Closed",
    "Cancelled"
  ];
  return (



    <div className="min-h-screen font-sans bg-gray-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex flex-col leading-none ml-8 sm:ml-0">
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

      <main className="max-w-screen-xl px-8 py-6 mx-auto  space-y-6">
        {/* Stats + Illustration */}
        <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-sm rounded-3xl lg:flex-row">
          <div className="grid grid-cols-1 min-[425px]:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              number={prdetails.totalPR}
              label="Total Purchase Requisitions"
              description="Active purchase requisition cases in progress."
              color="text-indigo-500 bg-indigo-50"
              icon="🗂️"
            />

            <StatCard
              number={prdetails.approvedPR}
              label="Approved Purchase Requisitions"
              description="Purchase requisition cases approved for processing."
              color="text-green-500 bg-green-50"
              icon="✅"
            />

            <StatCard
              number={prdetails.closedPR}
              label="Purchase Requisition Cases Closed"
              description="Purchase requisition cases converted into POs."
              color="text-cyan-500 bg-cyan-50"
              icon="📋"
            />

            <StatCard
              number={prdetails.draftPR}
              label="Draft Cases"
              description="Draft cases without PO creation."
              color="text-amber-500 bg-amber-50"
              icon="🕐"
            />
          </div>
          {/* Illustration placeholder */}
          <div className="items-center justify-center hidden w-56 h-40 lg:flex shrink-0">
            <svg viewBox="0 0 200 140" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="80" y="10" width="110" height="80" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="93" cy="23" r="3" fill="#f87171" />
              <circle cx="103" cy="23" r="3" fill="#fbbf24" />
              <circle cx="113" cy="23" r="3" fill="#34d399" />
              <rect x="90" y="35" width="85" height="8" rx="3" fill="#67e8f9" />
              <rect x="90" y="49" width="70" height="8" rx="3" fill="#67e8f9" />
              <rect x="90" y="63" width="55" height="8" rx="3" fill="#f87171" opacity="0.6" />
              <rect x="140" y="63" width="25" height="8" rx="3" fill="#fbbf24" opacity="0.8" />
              <circle cx="55" cy="100" width="60" height="60" r="30" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <rect x="30" y="78" width="55" height="45" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              <rect x="38" y="86" width="12" height="12" rx="2" fill="#818cf8" />
              <rect x="38" y="102" width="30" height="5" rx="2" fill="#e2e8f0" />
              <rect x="38" y="110" width="20" height="5" rx="2" fill="#e2e8f0" />
              <rect x="90" y="78" width="40" height="12" rx="3" fill="#f87171" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
          {/* Table Header */}
          <div className="flex flex-col gap-4 mb-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Title */}
            <h2 className="text-xl font-semibold text-slate-800">
              Purchase Requisitions
            </h2>

            {/* Right Section */}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">

              {/* Tabs */}
              <div className="flex w-full p-1 bg-gray-100 rounded-lg sm:w-auto">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "active"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Active PR
                </button>

                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "history"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  PR History
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center w-full gap-2 sm:w-auto">

                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  {showSearch ? (
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onBlur={() => !search && setShowSearch(false)}
                      placeholder="Search..."
                      className="w-full sm:w-44 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  ) : (
                    <button
                      onClick={() => setShowSearch(true)}
                      className="p-2 border rounded-lg border-slate-200 hover:bg-gray-50 text-slate-500"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}

                  className="flex items-center gap-1 p-2 border rounded-lg border-slate-200 hover:bg-gray-50 text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>

                </button>
                {showFilter && (
                    <div className="absolute z-50 w-40 mt-2 bg-white border rounded-lg shadow-lg right-3">

                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setFilter(status);
                          setShowFilter(false);
                        }}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Create New PR Button*/}
              <button

                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800">
                <span className="text-lg leading-none">+</span>
                New
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
                <tr className="text-xs font-semibold tracking-wide normal-case bg-gray-50 text-slate-500">
                  <th className="px-4 py-3">PR ID</th>
                  <th className="w-1/4 px-4 py-3">Name</th>
                  <th className="px-4 py-3 text-center">Project ID</th>
                  <th className="px-4 py-3 text-center">Prepare</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Requested date</th>
                  <th className="px-4 py-3 text-center">Purpose</th>
                  <th className="px-4 py-3 text-center">Accounting date</th>
                </tr>
              </thead>
              {loading ? (
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td colSpan={8} className="h-[300px]">
                      <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-100">


                  {currentProjects.map((row, index) => (
                    <tr key={index}
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => handleRowClick(row)}

                    >
                      <td className="px-4 py-3">{row.RequisitionNumber}</td>
                      <td className="px-4 py-3">{row.RequisitionName}</td>
                      <td className="px-4 py-3 text-center">{row.ProjectId}</td>
                      <td className="px-4 py-3 text-center">{row.PreparerPersonnelNumber}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={statusStyles[row.LineStatus]}>
                          {row.LineStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {new Date(row.RequestedDate)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")}
                      </td>
                      <td className="px-4 py-3 text-center">{row.RequisitionPurpose}</td>
                      <td className="px-4 py-3 text-center">
                        {row.DefaultAccountingDate
                          ? new Date(row.DefaultAccountingDate)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstRow + 1} -
                {Math.min(indexOfLastRow, filteredProjects.length)} of{" "}
                {filteredProjects.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                {(() => {
                  const pages = [];

                  const addPage = (page) => {
                    if (!pages.includes(page)) {
                      pages.push(page);
                    }
                  };

                  // First page
                  addPage(1);

                  // Left dots
                  if (currentPage > 4) {
                    pages.push("left");
                  }

                  // Current window
                  for (
                    let i = Math.max(2, currentPage - 1);
                    i <= Math.min(totalPages - 1, currentPage + 1);
                    i++
                  ) {
                    addPage(i);
                  }

                  // Right dots
                  if (currentPage < totalPages - 3) {
                    pages.push("right");
                  }

                  // Last page
                  if (totalPages > 1) {
                    addPage(totalPages);
                  }

                  return pages.map((page, index) =>
                    page === "left" || page === "right" ? (
                      <span key={`${page}-${index}`} className="px-2 text-slate-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>

  );
}
