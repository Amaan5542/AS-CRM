import React from 'react';
import { useTicketContext } from '../context/TicketContext';

const TicketList = () => {
  const { tickets } = useTicketContext();

  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.ticketNumber}>
            <h3>{ticket.title}</h3> {/* Display ticket title instead of issue */}
            <p>{ticket.description}</p>
            <p><strong>Company:</strong> {ticket.companyName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
