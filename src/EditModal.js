import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ show, handleClose, event, editEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState("assignment");
  console.log(event);
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setPlace(event.place);
      setType(event.type);
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the updated event object
    const updatedEvent = {
      title,
      date,
      place,
      type,
    };
    editEvent(event.id, updatedEvent); // Pass the id and updated event
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter event title"
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPlace">
            <Form.Label>Event Place</Form.Label>
            <Form.Control
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
              placeholder="Enter event place"
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Event Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="accomplishment">Accomplishment</option>
              <option value="assignment">Assignment</option>
              <option value="education">Education</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
