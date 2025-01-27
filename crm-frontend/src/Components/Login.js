import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to the server
      const response = await axios.post("http://localhost:7070/api/auth/login", {
        loginID,
        password,
      });

      // Destructuring response data
      const { token, role } = response.data;

      // Saving token to localStorage
      localStorage.setItem("authToken", token);

      // Role-based navigation
      switch (role) {
        case "admin":
          navigate("/AdminPanel");
          break;
        case "manager":
          navigate("/Manager-dashboard");
          break;
        case "employee":
          navigate("/Employee-dashboard");
          break;
        case "client":
          navigate("/ClientHome");
          break;
        default:
          setError("Invalid role.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed."); // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url(/bgimage.png)' }}>
  <div className="fixed top-0 left-0 z-50 w-full bg-gray-800 shadow-md">
    <div className="container flex items-center justify-start py-4 mx-auto">
      <h1 className="ml-4 text-2xl font-bold text-white">Ayushman Solutions</h1>
    </div>
  </div>
  <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md bg-opacity-20 w-96">
    <h2 className="mb-4 text-2xl font-bold">Login</h2>
    {error && <p className="text-red-500">{error}</p>}
    <div className="mb-4">
      <label htmlFor="loginID" className="block mb-2 font-semibold">
        Login ID:
      </label>
      <input
        type="text"
        id="loginID"
        className="w-full px-4 py-2 border rounded"
        value={loginID}
        onChange={(e) => setLoginID(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block mb-2 font-semibold">
        Password:
      </label>
      <input
        type="password"
        id="password"
        className="w-full px-4 py-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Login
    </button>
  </form>
</div>

  );
};

export default Login;
