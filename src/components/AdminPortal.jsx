import React, { useState } from "react";

const AdminPortal = () => {
  const [environment, setEnvironment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Environment:", environment);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Select Environment
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Environment
          </label>

          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose an environment</option>
            <option value="dev">Dev</option>
            <option value="test">Test</option>
            <option value="live">Live</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPortal;