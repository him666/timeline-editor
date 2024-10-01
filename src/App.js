import React from "react";
import { Container } from "react-bootstrap";
import TimelineEditor from "./TimelineEditor";

const App = () => {
  return (
    <Container>
      <h1 className="text-center my-4">User Timeline Editor</h1>
      <TimelineEditor />
    </Container>
  );
};

export default App;
