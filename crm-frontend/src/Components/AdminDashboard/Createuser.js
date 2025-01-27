import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Createuser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "manager",
    companyName: "",
    loginID: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    try {
      await axios.post(
        "http://localhost:7070/api/auth/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setSuccessMessage(`User created successfully! LoginID: ${formData.loginID}`);
      setErrorMessage("");
      setFormData({
        name: "",
        email: "",
        role: "manager",
        companyName: "",
        loginID: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to create user.");
      setSuccessMessage("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            <li>
              <Link to="/createuser" className="block p-2 rounded hover:bg-gray-700">
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
          <div className="flex items-center">
            <div className="text-5xl cursor-pointer" onClick={toggleSidebar}>
              <span>{isSidebarOpen ? "×" : "≡"}</span>
            </div>
            <h1 className="ml-20 text-2xl font-bold">Ayushman Solutions</h1>
          </div>
        </div>

        {/* Create User Form Content */}
        <div className="flex items-center justify-center flex-1 bg-gray-100">
          <div className="w-full max-w-sm p-4 bg-white rounded shadow-md">
            <h2 className="mb-3 text-xl font-bold text-center">Create User</h2>
            {successMessage && <p className="mb-3 text-green-500">{successMessage}</p>}
            {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block mb-1 font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block mb-1 font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="role" className="block mb-1 font-semibold">
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                  <option value="client">Client</option>
                </select>
              </div>
              {formData.role === "client" && (
                <div className="mb-2">
                  <label htmlFor="companyName" className="block mb-1 font-semibold">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="mb-2">
                <label htmlFor="loginID" className="block mb-1 font-semibold">
                  Login ID:
                </label>
                <input
                  type="text"
                  id="loginID"
                  name="loginID"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.loginID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block mb-1 font-semibold">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-blue-500 transform -translate-y-1/2 right-2 top-1/2"
                  >
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createuser;
