// This function fetches all the tickets from the API
export const getTickets = async (url, options, signal) => {
    try{
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
          throw new Error("Bad Response");
        }
        const data = await response.json();   
        return { data, error: null }; 
    }
    catch(error){
        if (error.name !== 'AbortError') {
            return { data: null, error: error.message };
          }
        return { data: null, error: null }
    }
};

// This function groups the ticket with respect to status
export const groupTicketsByStatus = (data) => {
  const { tickets } = data;

  const groupedByStatus = tickets.reduce((acc, ticket) => {
    const status = ticket.status;
    acc[status] = acc[status] || [];
    acc[status].push(ticket);
    return acc;
  }, {});

  return groupedByStatus;
};


// This function groups the ticket with respect to users
export const groupTicketsByUser = (data) => {
  const { tickets, users } = data;

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  const groupedByUsers = tickets.reduce((acc, ticket) => {
    const userName = userMap[ticket.userId] || "Unknown User";
    acc[userName] = acc[userName] || []; 
    acc[userName].push(ticket);
    return acc;
  }, {});

  return groupedByUsers;
}

// This function groups the ticket with respect to their priority
export const groupTicketsByPriority = (data) => {
    const {tickets} = data;

    const groupedByPriority = tickets.reduce((acc, ticket) => {
      const priority = ticket.priority;
      acc[priority] = acc[priority] || [];
      acc[priority].push(ticket);
      return acc;
    }, {});

    return groupedByPriority;
};

// This function sorts the ticket with respect to priority
export const sortTicketsByPriority = (groupedTickets) => {
    for(const key in groupedTickets){
      groupedTickets[key].sort((a, b) => b.priority - a.priority);
    }
    return groupedTickets;
}

// This function sorts the ticket with respect to title
export const sortTicketsByTitle = (groupedTickets) => {
  for(const key in groupedTickets){
    groupedTickets[key].sort((a, b) => a.title.localeCompare(b.title));
  }
  return groupedTickets
}