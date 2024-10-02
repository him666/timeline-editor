import React from "react";
import { ListGroup, Button, Badge, Row } from "react-bootstrap";

const EventItem = ({
  event,
  editEvent,
  onDelete,
  setShowEdit,
  setEvent,
  searchTerm,
}) => {
  const dateBadgeStyles = {
    zIndex: "99",
    position: "relative",
    float: "right",
    top: "-18px",
    right: "5px",
    border: "solid 1px white",
  };
  const listStyles = {
    width: "260px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px",
  };
  const highlightStyle = {
    backgroundColor: "#ffeeba", // Light yellow for highlighting
    ...listStyles,
  };
  const badgeType = {
    accomplishment: "primary",
    assignment: "danger",
    education: "success",
  };
  const isHighLighted =
    searchTerm &&
    searchTerm.length > 1 &&
    (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()));
  const edit = (event) => {
    setShowEdit(true);
    setEvent(event);
  };
  return (
    <ListGroup.Item
      className="my-2"
      style={isHighLighted ? highlightStyle : listStyles}
    >
      <div>
        <Badge bg="secondary" style={dateBadgeStyles}>
          {event.date}
        </Badge>
        <strong>{event.title}</strong>

        <Row>
          <label>{event.place}</label>
        </Row>

        <Badge bg={badgeType[event.type]} style={{ marginBottom: "10px" }}>
          {event.type}
        </Badge>
      </div>
      <div
        style={{
          textAlign: "right",
          borderTop: "solid 1px #cdd3db",
          paddingTop: "15px",
        }}
      >
        <Button variant="primary" onClick={() => edit(event)}>
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
