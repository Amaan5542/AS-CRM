import React, { useState } from 'react';
import axios from 'axios';
import { useTicketContext } from '../../Contexts/TicketContext';

const CreateTicket = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addTicket } = useTicketContext();

  const [ticketDetails, setTicketDetails] = useState({
    
    screenName: '',
    reporterName: '',
    product: '',
    description: '',
    base: '',
    type: 'General',
    reporterContact: '',
    reporterEmail: '',
    criticality: '',
    summary: '',
    attachment: null,
    companyName: '',
  });


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    

    const apiPayload = { ...ticketDetails };

    try {
      const response = await axios.post('http://localhost:7070/api/auth/create', apiPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const { ticketNumber, companyName } = response.data;

      const newTicket = {
        ...ticketDetails,
        ticketNumber,
        companyName,
      };

      alert(`Ticket created successfully! Ticket Number: ${ticketNumber}`);
      addTicket(newTicket);

      setTicketDetails({
        title: `${ticketNumber}`,
        screenName: '',
        reporterName: '',
        product: '',
        description: '',
        base: '',
        type: 'General',
        reporterContact: '',
        reporterEmail: '',
        criticality: '',
        summary: '',
        attachment: null,
        companyName: '',
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('An error occurred while submitting the ticket.');
    }
  };

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
              <a href="/clientHome">Home</a>
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

        {/* Ticket Creation Form */}
        <div className="p-2 bg-green-100">
          <div className="max-w-full mx-auto">
            <h1 className="py-3 text-3xl font-bold text-center text-white shadow-lg bg-gradient-to-r from-slate-400 to-indigo-500">
              Create Ticket
            </h1>

            <form onSubmit={handleSubmit}>
            <table className="w-full bg-white border-collapse table-auto">
              <tbody>
                {/* Title and Screen Name */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Ticket Title</td>
                  <td className="px-4 py-2">
                    <div className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg">
                      {ticketDetails.title || 'Title'}
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">Screen Name</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="screenName"
                      value={ticketDetails.screenName}
                      onChange={handleChange}
                      placeholder="Enter screen name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                </tr>

                {/* Product and Base */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Product</td>
                  <td className="px-4 py-2">
                    <select
                      name="product"
                      value={ticketDetails.product}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>Select Product</option>
                      <option value="SAP B1">SAP B1</option>
                      <option value="HANA">HANA</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">Base/Cust</td>
                  <td className="px-4 py-2">
                    <select
                      name="base"
                      value={ticketDetails.base}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>Select Base/Cust</option>
                      <option value="Base">Base</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </td>
                </tr>

                {/* Reporter Name and Type */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Reporter Name</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="reporterName"
                      value={ticketDetails.reporterName}
                      onChange={handleChange}
                      placeholder="Enter reporter name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">Type</td>
                  <td className="px-4 py-2">
                    <select
                      name="type"
                      value={ticketDetails.type}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="Problem In Existing Process">Problem In Existing Process</option>
                      <option value="New Process">New Process</option>
                      <option value="Change In Existing Process">Change In Existing Process</option>
                      <option value="New Report">New Report</option>
                      <option value="Other Issues">Other Issues</option>
                    </select>
                  </td>
                </tr>

                {/* Contact and Email */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Contact No.</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      name="reporterContact"
                      value={ticketDetails.reporterContact}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">Email ID</td>
                  <td className="px-4 py-2">
                    <input
                      type="email"
                      name="reporterEmail"
                      value={ticketDetails.reporterEmail}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                </tr>

                {/* Criticality */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Criticality</td>
                  <td className="px-4 py-2">
                    <select
                      name="criticality"
                      value={ticketDetails.criticality}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="" disabled>Select Criticality</option>
                      <option value="Non-Critical">Non-Critical</option>
                      <option value="Critical">Critical</option>
                      <option value="Show Stopper">Show Stopper</option>
                    </select>
                  </td>
                </tr>

                {/* Summary */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Summary</td>
                  <td colSpan="3" className="px-4 py-2">
                    <input
                      type="text"
                      name="summary"
                      value={ticketDetails.summary}
                      onChange={handleChange}
                      placeholder="Enter brief summary"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                </tr>

                {/* Description */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Description</td>
                  <td colSpan="3" className="px-4 py-2">
                    <textarea
                      name="description"
                      value={ticketDetails.description}
                      onChange={handleChange}
                      placeholder="Enter ticket description"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                    />
                  </td>
                </tr>

                {/* Attachment */}
                <tr>
                  <td className="px-4 py-2 font-medium text-gray-700">Attachment</td>
                  <td colSpan="3" className="px-4 py-2">
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </td>
                </tr>

                {/* Submit Button */}
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    <button
                      type="submit"
                      className="w-full py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Submit Ticket
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
