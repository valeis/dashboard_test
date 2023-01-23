import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./ConfirmationModal.css";

const ErrorModal = (props: any) => {
  return (
    <>
      <div className="backdrop" />
      <Card className="modal">
        <header className="header">
          <h1>Delete Post ?</h1>
        </header>
        <div className="content">
          <Button onClick={() => props.setPostToDelete(false)}>Cancel</Button>
          <Button
            className="button_register"
            onClick={() => props.deletePostHandler.mutate(props.id)}>
            Delete
          </Button>

        </div>
      </Card>
    </>
  );
};

export default ErrorModal;
