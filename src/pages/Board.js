import React, { useEffect, useState } from 'react';
import { getTickets, groupTicketsByPriority, groupTicketsByStatus, groupTicketsByUser, sortTicketsByPriority, sortTicketsByTitle } from '../functions/Data.js';
import { useNavbarContext } from '../contexts/NavbarContext.js';
import Card from '../components/Card.js';
import '../styles/Board.css';

// imported icons here
import addIcon from '../assets/add.svg';
import menuIcon from '../assets/3 dot menu.svg';
import noPriority from '../assets/No-priority.svg';
import lowPriority from '../assets/Img - Low Priority.svg';
import mediumPriority from '../assets/Img - Medium Priority.svg';
import highPriority from '../assets/Img - High Priority.svg';
import urgentPriority from '../assets/SVG - Urgent Priority colour.svg';
import todo from '../assets/To-do.svg';
import backlog from '../assets/Backlog.svg';
import inProgress from '../assets/in-progress.svg';
import cancelled from '../assets/Cancelled.svg';
import done from '../assets/Done.svg';
import profileIcon from '../assets/profile.svg';

export default function Board() {
  const { groupingOption, orderingOption } = useNavbarContext();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const priorities = ["No Priority", "Low", "Medium", "High", "Urgent"];
  const priority_icons = [noPriority, lowPriority, mediumPriority, highPriority, urgentPriority];

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const api_url = "https://api.quicksell.co/v1/internal/frontend-assignment";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    const fetchData = async () => {
      const { data, error } = await getTickets(api_url, options, signal);
      if (!signal.aborted) {
        if (data) {
          let groupedTickets = {};
          if (groupingOption === "Status") {
            groupedTickets = groupTicketsByStatus(data);
          } else if (groupingOption === "User") {
            groupedTickets = groupTicketsByUser(data);
          } else {
            groupedTickets = groupTicketsByPriority(data);
          }

          if (orderingOption === "Priority") {
            groupedTickets = sortTicketsByPriority(groupedTickets);
          } else {
            groupedTickets = sortTicketsByTitle(groupedTickets);
          }
          setTickets(groupedTickets);
        } else {
          setError(error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [groupingOption, orderingOption]);

  console.log(tickets);
  return (
    <div className="board-container">
      {
        Object.keys(tickets).map((key, index) => (
          <div key={index} className="column">
            <div className="column-header">
              <img
                src={
                  groupingOption === "Priority"
                    ? priority_icons[key]
                    : groupingOption === "Status"
                      ? (() => {
                          let statusIcon;
                          const status = key;
                          if (status === "Todo") {
                            statusIcon = todo;
                          } else if (status === "In progress") {
                            statusIcon = inProgress;
                          } else if (status === "Backlog") {
                            statusIcon = backlog;
                          } else if (status === "Done") {
                            statusIcon = done;
                          } else {
                            statusIcon = cancelled;
                          }
                          return statusIcon;
                        })()
                      : profileIcon
                }
                className="column-logo"
              />
              <span className="column-title">{priorities[key] || key}</span>
              <span className="column-count">{tickets[key].length}</span>
              <div className="column-icons">
                <img className="icon" src={addIcon} />
                <img className="icon" src={menuIcon} />
              </div>
            </div>
            {
              tickets[key].map((ticket, ticketIndex) => (
                <Card
                  key={ticketIndex}
                  id={ticket.id}
                  userId={ticket.userId}
                  priority={ticket.priority}
                  title={ticket.title}
                  tags={ticket.tag}
                  status={ticket.status}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  );
}
