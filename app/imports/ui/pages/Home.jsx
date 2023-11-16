import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import {
  BuildingFill,
  ChatDotsFill,
  CheckCircleFill,
  ClipboardCheckFill,
  LaptopFill,
  Newspaper,
  Server,
} from "react-bootstrap-icons";

// Basic mock-up of the ITS Homepage
// Links do not work
// Data taken from ITS webpage 11/6/2023
const Home = () => (
  <Container className={"pb-5"}>
    <Row className="text-center d-flex p-2" xs={1} md={2}>
      <Col sm={12} className={"d-flex flex-column justify-content-center"}>
        <h1 className="text-animation">MEET HOKU</h1>
        <div className={"fs-5"}>
          Hoku is the newest addition to the ITS 'ohana. She is an AI Virtual Assistant suited for answering questions
          based on ITS frequently asked questions, services, and policies. To ask Hoku a question, click the chat button
          on the bottom right to open a chat window. Try asking Hoku where the ITS building is located!
        </div>
      </Col>
      <Col sm={12}>
        <Image src="images/hoku-pfp.png" width={300} className={"my-3"} alt={"Hoku Picture"} />
      </Col>
    </Row>
  </Container>
);

export default Home;
