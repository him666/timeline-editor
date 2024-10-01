import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import EventItem from "./EventItem";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const EventList = ({
  events,
  editEvent,
  deleteEvent,
  searchTerm,
  setEvent,
  setShowEdit,
}) => {
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
      <ListGroup>
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            setEvent={setEvent}
            setShowEdit={setShowEdit}
            onDelete={() => handleDeleteClick(event.id)}
            searchTerm={searchTerm}
          />
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
