import React from 'react';
import '../styles/Card.css';
import todo from '../assets/To-do.svg';
import backlog from '../assets/Backlog.svg';
import inProgress from '../assets/in-progress.svg';
import cancelled from '../assets/Cancelled.svg';
import done from '../assets/Done.svg';
import profile from '../assets/profile.svg';

export default function Card({id, userId, priority, title, tags, status}) {
  let statusIcon;
  if(status == "Todo"){
    statusIcon = todo;
  }
  else if(status === "In progress"){
    statusIcon = inProgress;
  }
  else if(status === "Backlog"){
    statusIcon = backlog;
  }
  else if(status === "Done")
  {
    statusIcon = done;
  }
  else{
    statusIcon = cancelled;
  }
  return (
    <div className="card">
      <div className="card-header">
        <span className="device-name">{id}</span>
        <img className="profile-circle" src={profile}/>
      </div>
      <div className="task">{title}</div>
      <div className="card-footer">
        <div className="icon-container">
            <img src = {statusIcon} alt="icon"/>
            </div>
        <div className="issue-type">
            <div className="bullet"/>
                {tags[0]}
            </div>
      </div>
    </div>
  );
}
