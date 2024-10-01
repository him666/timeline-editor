import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import EventList from "./EventList";
import { useDebounce } from "use-debounce";

const TimelineEditor = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [sortOrder, setSortOrder] = useState("asc"); // or 'desc'
  const [filterType, setFilterType] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:4096/events");
    setEvents(response.data);
  };

  const createEvent = async (event) => {
    await axios.post("http://localhost:4096/events", event);
    fetchEvents();
  };

  const editEvent = async (eventId, updatedEvent) => {
    await axios.put(`http://localhost:4096/events/${eventId}`, updatedEvent);
    fetchEvents();
  };

  const deleteEvent = async (eventId) => {
    await axios.delete(`http://localhost:4096/events/${eventId}`);
    fetchEvents();
  };

  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.place.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .filter((event) => (filterType ? event.type === filterType : true))
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <Container>
      <Row>
        <Col>
          <h1>Timeline Editor</h1>
          <EditModal
            show={showEdit}
            editEvent={editEvent}
            event={event}
            handleClose={() => {
              setShowEdit(false);
            }}
          />
          <CreateModal
            show={showCreate}
            createEvent={createEvent}
            handleClose={() => {
              setShowCreate(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="">All Types</option>
            <option value="accomplishment">Accomplishment</option>
            <option value="assignment">Assignment</option>
            <option value="education">Education</option>
          </select>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="asc">Date Ascending</option>
            <option value="desc">Date Descending</option>
          </select>
          <Button
            variant="primary"
            onClick={() => {
              setShowCreate(true);
            }}
          >
            Add Event
          </Button>
        </Col>
      </Row>
      <Row>
        <EventList
          events={filteredEvents}
          searchTerm={searchTerm}
          editEvent={editEvent}
          setEvent={setEvent}
          deleteEvent={deleteEvent}
          setShowEdit={setShowEdit}
        />
      </Row>
    </Container>
  );
};

export default TimelineEditor;
