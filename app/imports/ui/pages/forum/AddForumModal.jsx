import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddForumModal = () => {
  const [forumTitle, setForumTitle] = useState("");
  const [forumDescription, setForumDescription] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setForumTitle("");
    setForumDescription("");
    setShow(true);
  };

  const handleSubmit = () => {
    if (forumTitle.trim() === "" || forumDescription.trim() === "") {
      return;
    }
    Meteor.call("addForum", forumTitle, forumDescription, (err) => {
      if (err) {
        toast.error("Forum Not Added");
      } else {
        toast.success("Forum Added");
      }
    });
    handleClose();
  };

  return (
    <>
      <Button className={"btn-vibrant-primary"} onClick={handleShow}>
        Add Forum
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"add-forum-form"}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={forumTitle}
                  // isInvalid={forumTitle.trim() === ""}
                  onChange={(e) => {
                    setForumTitle(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">Title field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as={"textarea"}
                  rows={4}
                  type="text"
                  placeholder="Description"
                  value={forumDescription}
                  // isInvalid={forumDescription.trim() === ""}
                  onChange={(e) => {
                    setForumDescription(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">Description field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="add-forum-form" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default AddForumModal;
