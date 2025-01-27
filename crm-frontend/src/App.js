import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import { TicketProvider } from './Contexts/TicketContext'; // Import TicketProvider
import ManagerDashboard from "./Components/ManagerDashboard";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import CreateTicket from "./Components/ClientDashboard/CreateTicket";
import TicketFollowup from "./Components/ClientDashboard/TicketFollowup";
import Footer from "./Components/Fotter";
import AdminPanel from "./Components/AdminDashboard/AdminPanel";
import Createuser from "./Components/AdminDashboard/Createuser";
import ViewTicket from "./Components/ClientDashboard/ViewTicket";
import ClientHome from "./Components/ClientDashboard/ClientHome";

function App() {
  return (
    <TicketProvider>  {/* Wrap the Router with TicketProvider */}
      <div>
        <Router>
          <Routes>
            {/* Login Page */}
            <Route path="/" element={<Login />} />

            {/* Admin Panel */}
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/createuser" element={<Createuser />} />

            {/* Manager Dashboard */}
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />

            {/* Employee Dashboard */}
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

            {/* Client Dashboard */}
            <Route path="/CreateTicket" element={<CreateTicket />} />
            <Route path="/ViewTicket" element={<ViewTicket />} />
            <Route path="/TicketFollowup" element={<TicketFollowup />} />
            <Route path="/ClientHome" element={<ClientHome />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </TicketProvider>
  );
}

export default App;
