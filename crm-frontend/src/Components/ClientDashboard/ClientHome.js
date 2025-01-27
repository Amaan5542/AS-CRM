import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientHome = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await axios.get('http://localhost:7070/api/auth/my-tickets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

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
              <a href="/ViewTicket">ViewTicket</a>
            </li>
            <li className="p-2 rounded hover:bg-gray-700">
              <a href="/TicketFollowup">TicketFollowup</a>
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

        {/* Ticket List */}
        <div className="p-2 bg-green-100">
          <h2 className="py-3 text-3xl font-bold text-center text-white shadow-lg bg-gradient-to-r from-slate-400 to-indigo-500">Your Tickets</h2>
          <div>
            {tickets.length > 0 ? (
              <table className="w-full bg-white border-collapse table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Product</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Criticality</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr key={index}>
                      <td
                        className="px-4 py-2 text-center text-blue-500 underline border cursor-pointer"
                        onClick={() => navigate('/TicketFollowup', { state: ticket })}
                      >
                        {ticket.ticketNumber}
                      </td>
                      <td className="px-4 py-2 text-center border">{ticket.product}</td>
                      <td className="px-4 py-2 text-center border">{ticket.status}</td>
                      <td className="px-4 py-2 text-center border">{ticket.criticality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="py-4 text-center text-gray-700">No tickets found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
