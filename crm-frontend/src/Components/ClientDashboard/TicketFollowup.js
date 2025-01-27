import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TicketFollowup = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { ticketNumber } = state || {};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/api/auth/tickets-details/${ticketNumber}`
        );
        setTicketDetails(response.data.ticket);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        alert('Failed to fetch ticket details.');
      } finally {
        setLoading(false);
      }
    };

    if (ticketNumber) {
      fetchTicketDetails();
    } else {
      setLoading(false);
    }
  }, [ticketNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
          <ul className="p-4 mt-4 space-y-4">
            <h1 className="ml-2 text-2xl font-bold">Menu</h1>
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/ClientHome">Home</a>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/ViewTicket">View Ticket</a>
            </li> 
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/TicketFollowup">Ticket Followup</a>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/CreateTicket">Ticket Register</a>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <div className="flex items-center justify-between w-full p-4 text-white bg-gray-800">
          <div className="flex items-center">
            <div className="text-3xl cursor-pointer" onClick={toggleSidebar}>
              {isSidebarOpen ? '×' : '≡'}
            </div>
            <h1 className="ml-20 text-2xl font-bold">Ayushman Solutions</h1>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="p-12 bg-green-100">
          <h1 className="py-3 text-2xl font-bold text-center text-white shadow-lg bg-gradient-to-r from-slate-400 to-indigo-500">
            Ticket Follow Up
          </h1>

          <table className="w-full bg-white border-collapse table-auto">
            <tbody>
              <tr className="text-left">
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Title</span>
                  <input
                    type="text"
                    value={ticketDetails?.ticketNumber || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Reported By</span>
                  <input
                    type="text"
                    value={ticketDetails?.reporterName || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Current Status</span>
                  <input
                    type="text"
                    value={ticketDetails?.status || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
              </tr>
              <tr className="text-left">
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Reporting Date</span>
                  <input
                    type="text"
                    value={ticketDetails?.registrationDate || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Product</span>
                  <input
                    type="text"
                    value={ticketDetails?.product || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Base/Cust</span>
                  <input
                    type="text"
                    value={ticketDetails?.base || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
              </tr>
              <tr className="text-left">
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Criticality</span>
                  <input
                    type="text"
                    value={ticketDetails?.criticality || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Type</span>
                  <input
                    type="text"
                    value={ticketDetails?.type || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
                <td className="w-1/3 px-4 py-2">
                  <span className="block font-semibold">Screen Name</span>
                  <input
                    type="text"
                    value={ticketDetails?.screenName || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="px-4 py-2">
                  <span className="block font-semibold">Description</span>
                  <textarea
                    value={ticketDetails?.description || ''}
                    readOnly
                    className="w-full px-2 py-1 mt-1 border rounded"
                    rows="4"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketFollowup;
