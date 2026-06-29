import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

//import R2RLoginpage From "./R2RLoginpage";
const navItems = [
  {
    label: "Home",
    path: " ",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },

  {
    label: "PR",
    path: "/app/DbsPurchaseRequest",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <path d="M12 3v4M17 7h2a2 2 0 010 4h-2" />
        <line x1="8" y1="12" x2="13" y2="12" />
        <line x1="8" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },

  {
    label: "RFQ",
    path: "/app/RFQPage",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <path d="M9 3v4M4 7h2a2 2 0 010 4H4" />
        <path d="M13 14l2 2 4-4" />
      </svg>
    ),
  },

  {
    label: "PO",
    path: "/app/PurchaseOrders",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="4" y="3" width="13" height="17" rx="2" />
        <path d="M9 3v4M4 7h2a2 2 0 010 4H4" />
        <path d="M8 14h8M8 17h5" />
      </svg>
    ),
  },

  {
    label: "GRN",
    path: "/app/GRNOverview",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4a2 2 0 001-1.73z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function FigR2rNavbar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-screen w-20 bg-[#1e2130]
            transition-transform duration-300 ease-in-out
            z-40
            ${collapsed ? "-translate-x-full" : "translate-x-0"}

            md:static
            md:translate-x-0
            md:flex
            md:flex-col
            `}
        >
          {/* R2R Logo */}
          <div className="flex flex-col items-center mt-12 mb-6 select-none">
            <img
              src="/R2R_image.png"
              alt="R2R Logo"
              className="object-contain w-auto h-auto"
            />
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-5 bg-gray-700" />

          {/* Navigation */}
          <nav className="flex flex-col items-center flex-1 w-full gap-2 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setCollapsed(true);
                  }
                }}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center
          w-14 h-14 rounded-xl gap-1
          transition-all duration-200
          group relative
          ${isActive
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-900/40"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`transition-colors ${isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                        }`}
                    >
                      {item.icon}
                    </span>

                    <span
                      className={`text-[10px] font-semibold tracking-wide ${isActive
                          ? "text-white"
                          : "text-gray-500 group-hover:text-gray-300"
                        }`}
                    >
                      {item.label}
                    </span>

                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>
        {/* overlay */}
        {!collapsed && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
        <main className="flex-1 overflow-y-auto  md:pt-0">
          <Outlet />
        </main>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="fixed top-4 left-4 z-50 md:hidden bg-[#1e2130] text-white p-2 rounded-lg shadow-lg"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Actual Page Content */}

      </div>

    </>
  );
}