import React from 'react';
import { Link } from 'react-router-dom';

function Event({ e, createdAt, id }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
         
          <Link to={"/events/"+id}>{ e.eventName }</Link>
          <Link to={"/events/"+id}>{ e.eventLocation }</Link>
           { e.eventDescription} 
        </div>
        <div className="card-footer small text-muted text-right">
          { createdAt }
        </div>
      </div>
    </div>
  );
}

export default Event;