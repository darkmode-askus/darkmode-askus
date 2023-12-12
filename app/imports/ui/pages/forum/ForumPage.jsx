import React, { useState } from "react";
import { Col, Container, Dropdown, DropdownMenu, Row } from "react-bootstrap";
import { useTracker } from "meteor/react-meteor-data";
import { ForumCollection } from "../../../api/ForumCollection";
import ForumRow from "./ForumRow";
import AddForumModal from "./AddForumModal";
import { PersonCircle } from 'react-bootstrap-icons';

Meteor.subscribe("forums");

const ForumPage = () => {

// Get the FAQs from the database if there are any
  const forums = useTracker(() => ForumCollection.find({}).fetch());

  // Renders the FAQ page
  return (
    <Container>
      <Col className={"d-flex p-2 navbar border-bottom"}>
        <h1 className={"title"} >Community Forums</h1>
        <AddForumModal/>
      </Col>
      {forums.length === 0 && (
        // If there are no FAQs in the database, display this message
        <Col>
          <h1 className={"text-center"}>No Forums in Database</h1>
        </Col>
      )}
      <Col>
        {forums.map((forum, index) => (
          <ForumRow forum={forum} index={index} />
        ))}
      </Col>
    </Container>
  );
};

export default ForumPage;
