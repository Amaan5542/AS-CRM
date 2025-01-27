import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewTicket = () => {
  const [view, setView] = useState("");
  const [status, setStatus] = useState("");
  const [criticality, setCriticality] = useState("");
  const [product, setProduct] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [tickets, setTickets] = useState([]);
  const [searchedTicket, setSearchedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:7070/api/auth/my-tickets`, {
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
  
  const filteredTickets = tickets.filter((ticket) => {
    const matchesProduct = product ? ticket.product === product : true;
    const matchesStatus = status ? ticket.status === status : true;
    const matchesCriticality = criticality ? ticket.criticality === criticality : true;
    return matchesProduct && matchesStatus && matchesCriticality;
  });

  const handleSearch = async () => {
    setLoading(true);
    setError("");
  
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  
    if (!user || !user.companyName) {
      setError("Unauthorized access. No company assigned.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:7070/api/auth/tickets/company/${ticketNumber}`, // API endpoint with ticketNumber
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setSearchedTicket(response.data.ticket); // Set the found ticket
    } catch (err) {
      console.error("Error fetching ticket:", err);
      setSearchedTicket(null);
      setError("Ticket not found or unauthorized access.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
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
              {isSidebarOpen ? "×" : "≡"}
            </div>
            <h1 className="ml-20 text-2xl font-bold">Ayushman Solutions</h1>
          </div>
         </div>

        {/* Ticket Management */}
        <div className="min-h-screen p-8 bg-green-100">
          <div>
            <h1 className="py-3 text-2xl font-bold text-center text-white shadow-lg bg-gradient-to-r from-slate-400 to-indigo-500">
              View Ticket
            </h1>
          </div>

          <div className="flex flex-col items-center w-full p-6 mx-auto mt-3 bg-white rounded-lg shadow-md">
            <div className="flex justify-center my-4 space-x-4">
              <button
                className={`px-6 py-2 rounded-lg border-2 text-gray-700 transition-all duration-300 ${
                  view === "byTicket" ? "border-blue-200 bg-orange-100" : "border-gray-400 hover:bg-gray-200"
                }`}
                onClick={() => setView("byTicket")}
              > 
                By Ticket
              </button>
              <button
                className={`px-6 py-2 rounded-lg border-2 text-gray-700 transition-all duration-300 ${
                  view === "byCategory" ? "border-indigo-500 bg-indigo-100" : "border-gray-400 hover:bg-gray-200"
                }`}
                onClick={() => setView("byCategory")}
              >
                By Category
              </button>
            </div>

            {view === "byTicket" && (
              <div className="flex flex-col items-center w-full p-4 mt-6 bg-gray-100 rounded-md">
                <h2 className="mb-4 text-lg font-bold text-gray-700">Search Ticket by Ticket Number</h2>
                <input
                  type="text"
                  placeholder="Enter Ticket ID"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="w-1/2 px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>

                {loading && <p className="text-blue-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {searchedTicket && (
                  <div className="w-3/4 mt-6">
                    <h2 className="mb-4 text-lg font-bold text-center text-gray-700">Ticket Details</h2>
                    <table className="w-full border border-collapse border-gray-300 table-auto">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 border border-gray-300">Ticket ID</th>
                          <th className="px-4 py-2 border border-gray-300">Description</th>
                          <th className="px-4 py-2 border border-gray-300">Status</th>
                          <th className="px-4 py-2 border border-gray-300">Criticality</th>
                          <th className="px-4 py-2 border border-gray-300">Product</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 text-center border border-gray-300">{searchedTicket.ticketNumber}</td>
                          <td className="px-4 py-2 text-center border border-gray-300">{searchedTicket.description}</td>
                          <td className="px-4 py-2 text-center border border-gray-300">{searchedTicket.status}</td>
                          <td className="px-4 py-2 text-center border border-gray-300">{searchedTicket.criticality}</td>
                          <td className="px-4 py-2 text-center border border-gray-300">{searchedTicket.product}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {view === "byCategory" && (
              <>
                <div className="flex items-center justify-between w-full">
                  <label className="font-medium text-gray-700">Status</label>
                  <select
                    className="px-4 py-2 ml-2 bg-white border rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Not Assigned">Not Assigned</option>
                    <option value="Work in Progress">Work in Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <label className="ml-10 font-medium text-gray-700">Criticality</label>
                  <select
                    className="px-4 py-2 ml-2 bg-white border rounded-md"
                    value={criticality}
                    onChange={(e) => setCriticality(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Critical">Critical</option>
                    <option value="Non-Critical">Non-Critical</option>
                    <option value="Show Stopper">Show Stopper</option>
                  </select>
                  <label className="ml-10 font-medium text-gray-700">Product</label>
                  <select
                    className="px-4 py-2 ml-2 bg-white border rounded-md"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  >
                    <option value="">All Products</option>
                    <option value="SAP B1">SAP B1</option>
                    <option value="HANA">HANA</option>
                  </select> 
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setShowTable(!showTable)}
                    className="px-6 py-2 text-black bg-blue-200 rounded-full"
                  >
                    {showTable ? "Hide Ticket Data" : "View Ticket Data"}
                  </button>
                </div>
                {showTable && (
                  <div className="w-3/4 mt-6">
                    <h2 className="mb-4 text-lg font-bold text-center text-gray-700">Filtered Tickets</h2>
                    <table className="w-full border border-collapse border-gray-300 table-auto">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 border border-gray-300">Ticket ID</th>
                          <th className="px-4 py-2 border border-gray-300">Description</th>
                          <th className="px-4 py-2 border border-gray-300">Status</th>
                          <th className="px-4 py-2 border border-gray-300">Criticality</th>
                          <th className="px-4 py-2 border border-gray-300">Product</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTickets.length === 0 && (
                          <tr>
                            <td className="px-4 py-2 text-center" colSpan="5">
                              No tickets found matching the selected criteria.
                            </td>
                          </tr>
                        )}
                        {filteredTickets.map((ticket) => (
                          <tr key={ticket.ticketNumber}>
                            <td className="px-4 py-2 text-center border border-gray-300">{ticket.ticketNumber}</td>
                            <td className="px-4 py-2 text-center border border-gray-300">{ticket.description}</td>
                            <td className="px-4 py-2 text-center border border-gray-300">{ticket.status}</td>
                            <td className="px-4 py-2 text-center border border-gray-300">{ticket.criticality}</td>
                            <td className="px-4 py-2 text-center border border-gray-300">{ticket.product}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
