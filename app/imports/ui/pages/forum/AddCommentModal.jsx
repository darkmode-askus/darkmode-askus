import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddCommentModal = ({ forum }) => {
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setComment("");
    setShow(true);
  };

  const handleSubmit = () => {
    if (comment.trim() === "") {
      return;
    }
    Meteor.call("addForumComment", forum, comment, (err) => {
      if (err) {
        toast.error("Comment Not Added");
      } else {
        toast.success("Comment Added");
      }
    });
    handleClose();
  };

  return (
    <>
      <div className={"d-flex flex-column justify-content-center"}>
        <Button className={"btn-vibrant-primary"} onClick={handleShow}>
          Comment
        </Button>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"add-comment-form"}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as={"textarea"}
                  rows={4}
                  type="text"
                  placeholder="Description"
                  value={comment}
                  // isInvalid={forumDescription.trim() === ""}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">Comment field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="add-comment-form" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default AddCommentModal;
