import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PRLineReport() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [materials, setMaterials] = useState([]);
  const prDetails = materials?.[0] || {};
  const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 8;
  const { RequisitionNumber } = useParams();
  useEffect(() => {
    getMaterials(RequisitionNumber);
  }, [RequisitionNumber]);
  const getMaterials = async (RequisitionNumber) => {
    try {
      console.log("Selected PR:", RequisitionNumber);
      const response = await axios.get(
        `http://localhost:5000/api/PR_lines/${RequisitionNumber}`
      );
      console.log("materials:", response.data);
      setMaterials(response?.data || []);
      const prDetails = materials?.[0] || {};

    } catch (error) {
      console.error(error);
    }
  };
  console.log("PR Details:", prDetails);

  const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;

const currentMaterials = materials.slice(
  indexOfFirstRow,
  indexOfLastRow
);

const totalPages = Math.ceil(materials.length / rowsPerPage);
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm"
        onClick={() => navigate(-1)}
      />

      {/* Modal */}
      <div className="relative z-20 bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-10 px-6 pt-6 pb-4 bg-white border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-bold leading-tight sm:text-2xl text-slate-800">
              PR-109 Maintenance Spare Parts Request
            </h1>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 text-xs font-semibold border rounded-full text-cyan-600 bg-cyan-50 border-cyan-200">
                Approved
              </span>

              <button
                onClick={() => navigate(-1)}
                className="ml-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* Requirement Details */}
          <section className="p-5 bg-slate-50 rounded-xl">
            <h1 className="mb-4 text-base font-bold text-slate-700 ">Requirement Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">RequestedDate</p>
                <p className="text-sm font-semibold text-slate-700">
                  {prDetails?.RequestedDate
                    ? new Date(prDetails.RequestedDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">AccountingDate</p>
                <p className="text-sm font-semibold text-slate-700">
                  {
                  prDetails.AccountingDate
                    ? new Date(prDetails.AccountingDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                    : "—"}
                </p>              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Requisition Purpose</p>
                <p className="text-sm text-slate-400">—</p>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Description</p>

                <p className="text-sm text-slate-400"> {prDetails.LineDescription || "—"}</p>
              </div>
            </div>
          </section>
          {/* Material Details */}
          <section className="p-5 bg-slate-50 rounded-xl">
            <h2 className="mb-4 text-base font-semibold text-slate-700">
              Material Details
            </h2>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto border rounded-lg md:block border-slate-200">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-xs tracking-wide uppercase bg-slate-100 text-slate-500">
                    <th className="px-4 py-3 font-medium text-left">Product Name</th>
                    <th className="px-4 py-3 font-medium text-left">Category</th>
                    <th className="px-4 py-3 font-medium text-left">Description</th>
                    <th className="px-4 py-3 font-medium text-center">UOM</th>
                    <th className="px-4 py-3 font-medium text-center">Quantity</th>
                    <th className="px-4 py-3 font-medium text-center">Price</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-slate-100">
                  {currentMaterials?.map((m, i) => (
                    <tr key={i} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {m.ProductName}
                      </td>

                      <td className="px-4 py-3 text-slate-500">
                        {m.ProcurementProductCategoryName}
                      </td>

                      <td className="px-4 py-3 text-slate-500">
                        {m.LineDescription}
                      </td>

                      <td className="px-4 py-3 text-center text-slate-500">
                        {m.PurchaseUnitSymbol}
                      </td>

                      <td className="px-4 py-3 text-center text-slate-700">
                        {m.PurchasePriceQuantity}
                      </td>

                      <td className="px-4 py-3 text-right text-slate-700">
                        {(m.RequestedPrice ?? 0).toLocaleString("en-IN")}
                        <span className="text-xs text-slate-400"> Rs</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
  <div className="text-sm text-slate-500">
    Showing {indexOfFirstRow + 1} -
    {Math.min(indexOfLastRow, materials.length)} of{" "}
    {materials.length}
  </div>

  <div className="flex gap-2">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span className="px-3 py-1 text-sm">
      Page {currentPage} of {totalPages}
    </span>

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

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {materials?.map((m, i) => (
                <div
                  key={i}
                  className="p-4 space-y-2 bg-white border rounded-lg border-slate-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-700">
                      {m.ProductName}
                    </p>

                    <p className="text-sm font-bold text-slate-800 whitespace-nowrap">
                      {(m.RequestedPrice ?? 0).toLocaleString("en-IN")}
                      <span className="text-xs font-normal text-slate-400">
                        {" "}
                        Rs
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap text-xs gap-x-4 gap-y-1 text-slate-500">
                    <span>
                      <span className="text-slate-400">Category:</span>{" "}
                      {m.ProcurementProductCategoryName}
                    </span>

                    <span>
                      <span className="text-slate-400">UOM:</span>{" "}
                      {m.PurchaseUnitSymbol}
                    </span>

                    <span>
                      <span className="text-slate-400">Qty:</span>{" "}
                      {m.RequestedQuantity}
                    </span>
                  </div>

                  {m.LineDescription && (
                    <div className="text-xs text-slate-500">
                      <span className="text-slate-400">Description:</span>{" "}
                      {m.LineDescription? m.LineDescription : "—"}
                    </div>
                  )}

                  {m.RequestedDate && (
                    <div className="text-xs text-slate-500">
                      <span className="text-slate-400">Requested Date:</span>{" "}
                      {new Date(m.RequestedDate)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Inventory Details */}
          <section className="p-5 bg-slate-50 rounded-xl">
            <h2 className="mb-4 text-base font-semibold text-slate-700">
              Inventory Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                  Site
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {prDetails.ReceivingSiteId || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                  Warehouse
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {prDetails.ReceivingWarehouseId || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                  Location
                </p>
                <p className="text-sm text-slate-700">
                  {prDetails.DeliveryAddressName || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-1 pb-2 sm:flex-row ">
            <button className="flex-1 px-8 py-3 text-sm font-semibold text-white transition shadow-sm sm:flex-none bg-rose-500 hover:bg-rose-600 active:bg-rose-700 rounded-xl shadow-rose-200">
              Create RFQ Case
            </button>
            <button className="flex-1 px-8 py-3 text-sm font-semibold transition border-2 sm:flex-none border-rose-500 text-rose-500 hover:bg-rose-50 active:bg-rose-100 rounded-xl">
              Create PO
            </button>
          </div>

          {/* Activity Timeline */}
          <section>
            <button className="flex items-center gap-2 text-sm font-semibold text-slate-700 group">
              Activity Timeline
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition text-slate-400 group-hover:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className="pt-4 mt-3 text-sm italic border-t border-slate-100 text-slate-400">
              No activity recorded yet.
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}