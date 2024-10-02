import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import EventItem from "./EventItem";
import DeleteModal from "./DeleteModal";

const EventList = ({
  events,
  editEvent,
  deleteEvent,
  searchTerm,
  setEvent,
  setShowEdit,
}) => {
  const eventListStyle = {
    background:
      "linear-gradient(180deg, rgba(97,165,232,1) 0%, rgba(94,130,214,1) 35%, rgba(96,107,211,1) 100%)",
    alignItems: "center",
    marginTop: "20px",
  };
  const timelineStyle = {
    position: "static",
    height: "30%",
    width: "1px",
    borderLeft: "6px solid #cdd3db",
    left: "15px",
    top: "-24px",
    content: "",
    paddingBottom: "60px",
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDeleteClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedEventId) {
      deleteEvent(selectedEventId);
      setSelectedEventId(null);
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventId(null);
  };

  return (
    <>
      <ListGroup style={eventListStyle}>
        {events.map((event) => (
          <>
            <EventItem
              key={event.id}
              event={event}
              setEvent={setEvent}
              setShowEdit={setShowEdit}
              onDelete={() => handleDeleteClick(event.id)}
              searchTerm={searchTerm}
            />
            <div style={timelineStyle}>
              <span></span>
            </div>
          </>
        ))}
      </ListGroup>
      <DeleteModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={confirmDelete}
      />
    </>
  );
};

export default EventList;
