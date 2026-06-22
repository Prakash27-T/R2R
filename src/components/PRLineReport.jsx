import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PRLineReport() {
    const { RequisitionNumber } = useParams();
    const [materials, setMaterials] = useState([]);
    useEffect(() => {
    getMaterials();
  }, []);
           const getMaterials = async (RequisitionNumber) => {
               try {
                console.log("Selected PR:", RequisitionNumber);
                const response = await axios.get(
              `http://localhost:5000/api/PR_lines/${RequisitionNumber}`
              );
                console.log("materials:", response.data);
                setMaterials(response.data.value);
                } catch (error) {
                 console.error(error);
                 }
               };

  
  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-6">
      <div className="mx-auto overflow-hidden bg-white shadow-lg max-w-7xl rounded-2xl">

        {/* Header */}
        <div className="px-6 py-4 text-white bg-blue-700">
          <h1 className="text-2xl font-bold">
            Purchase Requisition Report
          </h1>
        </div>

        <div className="p-6 space-y-8">

          {/* Requirement Details */}
          <div className="p-5 border rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-blue-700">
              Requirement Details
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Requested Date
                </label>
                <input
                  type="text"
                  value="20-06-2026"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Accounting Date
                </label>
                <input
                  type="text"
                  value="21-06-2026"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Request Purpose
                </label>
                <input
                  type="text"
                  value="Project Material Procurement"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <input
                  type="text"
                  value="Material required for project execution."
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

            </div>
          </div>

          {/* Material Details */}
          <div className="p-5 border rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-blue-700">
              Material Details
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Material Name</th>
                    <th className="p-3 text-left">Material Category</th>
                    <th className="p-3 text-left">UOM</th>
                    <th className="p-3 text-left">Quantity</th>
                  </tr>
                </thead>

                <tbody>
                     {materials.map((item, index) => (
                  <tr key={index} 
                    className="border-t">
                    <td className="p-3">{row.ProductName}</td>
                    <td className="p-3">{row.ProcurementProductCategoryName}</td>
                    <td className="p-3">{row.PurchaseUnitSymbol}</td>
                    <td className="p-3">{row.PurchasePriceQuantity}</td>
                    
                  </tr>
                   ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Details */}
          <div className="p-5 border rounded-xl">
            <h2 className="mb-4 text-lg font-semibold text-blue-700">
              Inventory Details
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Site
                </label>
                <input
                  type="text"
                  value="SITE001"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Warehouse
                </label>
                <input
                  type="text"
                  value="WH001"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  value="LOC001"
                  readOnly
                  className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
                />
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-end gap-3 md:flex-row">

            <button
              className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Create PO
            </button>

            <button
              className="px-6 py-3 font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}