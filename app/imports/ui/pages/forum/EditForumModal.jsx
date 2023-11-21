import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const EditForumModal = ({ forum }) => {
  const [forumTitle, setForumTitle] = useState(forum.title);
  const [forumDescription, setForumDescription] = useState(forum.description);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setForumTitle(forum.title);
    setForumDescription(forum.description);
    setShow(true);
  };

  const handleSubmit = () => {
    if (forumTitle.trim() === "" || forumDescription.trim() === "") {
      return;
    }
    handleClose();
    Meteor.call("editForum", forum._id, forumTitle, forumDescription, (err) => {
      if (err) {
        toast.error("Could not update Forum");
      } else {
        toast.success("Forum Updated");
      }
    });
  };

  const handleDelete = () => {
    handleClose();
    Meteor.call("removeForum", forum._id);
    toast.success("Forum Deleted");
  };

  return (
    <>
      <div className={"d-flex flex-column justify-content-center"}>
        <Button className={"btn-vibrant-primary"} onClick={handleShow}>
          Edit
        </Button>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Forum</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"edit-forum-form"}
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
                  isInvalid={forumTitle.trim() === ""}
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
                  type="text"
                  as="textarea"
                  placeholder="Description"
                  value={forumDescription}
                  isInvalid={forumDescription.trim() === ""}
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
          <Button className={"me-auto"} variant="danger" onClick={handleDelete}>
            Delete Forum
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="edit-forum-form" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>

            );

};

export default EditForumModal;