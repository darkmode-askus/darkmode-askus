import { Col, Row } from "react-bootstrap";
import React from "react";
import EditForumModal from "./EditForumModal";
import AddCommentModal from "./AddCommentModal";
import CommentView from "./CommentView";

const FAQRow = ({ forum, index }) => {

  const rowTag = index % 2 === 1 ? "bg-dull-light" : "bg-dull-light";

  return (
      <>
        <Row className={`m-1 py-3 ${rowTag} rounded-3`}>
          <Col>
            <div className={"fw-bold"}>Title: </div>
            <div>{forum.title}</div>
          </Col>
          <Col>
            <div className={"fw-bold"}>Description: </div>
            <div>{forum.description}</div>
          </Col>
          <Col>
            <div className={"fw-bold"}>Source: </div>
            <div>{forum.source}</div>
          </Col>
            <Col xs={12} md={1} className={"d-flex justify-content-center"}>
                <EditForumModal forum={forum} />
            </Col>
          <Col xs={12} md={1} className={"d-flex justify-content-center"}>
              <AddCommentModal forum={forum}/>
          </Col>
        </Row>
        <div>
            {forum.comments.map((comment, index) => (
                <CommentView key={index} comment={comment} />
            ))}
        </div>
      </>
  );
};

export default FAQRow;