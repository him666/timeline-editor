import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const EventItem = ({ event, editEvent, onDelete, setShowEdit, setEvent }) => {
  const highlightStyle = {
    backgroundColor: "#ffeeba", // Light yellow for highlighting
  };
  const edit = (event) => {
    setShowEdit(true);
    setEvent(event);
  };
  return (
    <ListGroup.Item style={event.isHighlighted ? highlightStyle : {}}>
      <div>
        <strong>{event.title}</strong> ({event.date})<br />
        <em>{event.place}</em> | Type: {event.type}
      </div>
      <div>
        <Button variant="secondary" onClick={() => edit(event)}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete} className="ml-2">
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default EventItem;
