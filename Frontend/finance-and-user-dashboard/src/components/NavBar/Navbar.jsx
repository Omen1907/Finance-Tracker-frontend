import React, { useState } from "react";

const Navbar = () => {
  const [sidenav, setSidenav] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: "grid" },
    { label: "Products", icon: "film" },
    { label: "Reports", icon: "clipboard" },
    { label: "Messages", icon: "chat" },
    { label: "Calendar", icon: "calendar" },
    { label: "Table", icon: "list" },
    { label: "UI Components", icon: "plus" },
    { label: "Users", icon: "users" },
  ];

  return (
    <div className="h-full flex flex-col font-poppins antialiased relative w-full md:w-64">
      {/* ── Mobile Menu Toggle ── */}
      <button
        onClick={() => setSidenav(true)}
        className="absolute top-4 left-4 z-30 p-2 border-2 border-gray-200 bg-white rounded-md shadow-lg text-gray-500 hover:bg-teal-500 transition-colors duration-200 hover:text-white focus:bg-teal-600 focus:text-white focus:outline-none md:hidden"

      >
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4A1 1 0 013 5zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* ── Backdrop ── */}
      {sidenav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
          onClick={() => setSidenav(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        id="sidebar"
        className={`
          fixed md:static top-0 left-0 z-20 bg-white h-screen shadow-xl px-3
          w-64 transform transition-transform duration-300 ease-in-out
          ${sidenav ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          {/* Logo */}
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            Dashwind<span className="text-teal-600">.</span>
          </h1>

          {/* Profile */}
          <div id="profile" className="space-y-3">
            <img
              src=""
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                Eduard Pantazi
              </h2>
              <p className="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-3 text-sm text-gray-600 rounded-tl-md rounded-bl-md focus:outline-none"
            />
            <button className="px-2 py-3 hidden md:block rounded-tr-md rounded-br-md">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav id="menu" className="flex flex-col space-y-2">
            {menuItems.map(({ label, icon }) => (
              <SidebarLink
                key={label}
                label={label}
                icon={icon}
                onClick={() => setSidenav(false)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

/* ── SidebarLink Component ── */
const SidebarLink = ({ label, icon, onClick }) => (
  <a
    href="#"
    onClick={onClick}
    className="
      flex items-center space-x-2
      py-2 px-2 text-sm font-medium text-gray-700
      rounded-md transition duration-150 ease-in-out
      hover:!bg-teal-500 hover:text-white hover:scale-105
    "
  >
    <Icon name={icon} />
    <span>{label}</span>
  </a>
);

/* ── Icon Component ── */
const Icon = ({ name }) => {
  const paths = {
    grid: (
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    ),
    film: (
      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
    ),
    clipboard: (
      <>
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </>
    ),
    chat: (
      <>
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
      </>
    ),
    calendar: (
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    ),
    list: (
      <path
        fillRule="evenodd"
        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    ),
    plus: (
      <path d="M14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
    ),
    users: (
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    ),
  };

  return (
    <svg
      className="w-6 h-6 fill-current inline-block"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths[name]}
    </svg>
  );
};

export default Navbar;
