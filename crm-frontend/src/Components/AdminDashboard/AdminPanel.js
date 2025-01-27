import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 


const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden`}
      >
        {/* Sidebar Menu Items */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
          <ul className="p-4 mt-4 space-y-4">
            <h1 className="ml-2 text-2xl font-bold">Menu</h1>
            <li>
              <Link
                to="/createuser"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Create Users
              </Link>
            </li>
            <li>
              <a href="/users" className="block p-2 rounded hover:bg-gray-700">
                Ticket Assign
              </a>
            </li>
            <li>
              <a href="/settings" className="block p-2 rounded hover:bg-gray-700">
                Ticket View
              </a>
            </li>
            <li>
              <a href="/" className="block p-2 rounded hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="flex items-center justify-between w-full p-4 text-white bg-gray-800">
          {/* Left Content: Menu Icon and Company Name */}
          <div className="flex items-center">
            <div
              className="text-5xl cursor-pointer"
              onClick={toggleSidebar}
            >
              <span>{isSidebarOpen ? '×' : '≡'}</span>
            </div>

            {/* Company Name */}
            <h1 className="ml-20 text-2xl font-bold">Ayushman Solutions</h1>
          </div>
        </div>

        {/* Admin Panel Content */}
        
      </div>
    </div>
  );
};

export default AdminPanel;
