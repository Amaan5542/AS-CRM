import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the ticket information
const TicketContext = createContext();

// Custom hook to access the TicketContext
export const useTicketContext = () => {
  return useContext(TicketContext);
};

// Provider component to wrap around the app and share state
export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]); // Store tickets in state

  // Add ticket to global state
  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  // Filter tickets by company name
  const filterTicketsByCompany = (companyName) => {
    return tickets.filter(ticket => ticket.companyName === companyName);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, filterTicketsByCompany }}>
      {children}
    </TicketContext.Provider>
  );
};
