import React from "react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
        <p className="mt-3 text-sm text-slate-600">
          This page shows your procurement and purchase order reports.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-3xl bg-white shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Summary</h2>
            <p className="mt-2 text-sm text-slate-600">
              Overview of recent purchase requisitions, approvals, and order status.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Analytics</h2>
            <p className="mt-2 text-sm text-slate-600">
              Visualize procurement performance and trending metrics.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white shadow-sm border border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Export</h2>
            <p className="mt-2 text-sm text-slate-600">
              Download reports for review or share with your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
