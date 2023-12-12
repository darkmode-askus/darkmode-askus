import { Button, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import EditForumModal from "./EditForumModal";
import AddCommentModal from "./AddCommentModal";
import CommentView from "./CommentView";
import { useTracker } from 'meteor/react-meteor-data';
import { ForumCollection } from '../../../api/ForumCollection';
import { Meteor } from 'meteor/meteor';
import { toast } from 'react-toastify';

const FAQRow = ({ forum, index }) => {

  const rowTag = index % 2 === 1 ? "bg-dull-light" : "bg-dull-light";
  const isAuthor = Meteor.userId() !== null && Meteor.user().username == forum.source;
  const isAdmin = Meteor.userId() !== null && Roles.userIsInRole(Meteor.userId(), "admin");
  const handleDelete = () => {
    Meteor.call("removeForum", forum._id);
    toast.success("Forum Deleted");
  };

  return (
      <>
        <Row className={`m-1 my-3 py-3 ${rowTag} rounded-3 border border-warning`}>
          <Col>
            <Row>
              <Col>
                <h4 className={"fw-bold"}>{forum.title}</h4>
              </Col>
              { isAdmin &&
                <Col className={"d-flex justify-content-end"}>
                <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              </Col>
              }
            </Row>
            <Row>
              <div className={"fw-bold"}>Source: {forum.source}</div>
            </Row>
            <Row>
              <div>{forum.description}</div>
            </Row>
            <Row className={"border-bottom border-warning"}>
              <Col xs={12} md={1} className={"d-flex justify-content-center mx-1 my-3"}>
                <AddCommentModal forum={forum}/>
              </Col>
              {isAuthor && (
                <Col xs={12} md={1} className={"d-flex justify-content-center"}>
                  <EditForumModal forum={forum} />
                </Col>
              )}
            </Row>
          </Col>
          <div>
            <div className={"fw-bold"}>Comments:</div>
            {forum.comments.map((comment, index) => (
              <CommentView key={index} comment={comment} />
            ))}
          </div>
        </Row>
      </>
  );
};

export default FAQRow;
