import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./ConfirmationModal.css";
import { UseMutationResult } from "react-query";

type ErrorModalProps = {
  id: string;
  setPostToDelete: (state: boolean) => void;
  deletePostHandler: UseMutationResult<any, unknown, string, unknown>;
};

const ErrorModal = (props: ErrorModalProps) => {
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
            onClick={() => props.deletePostHandler.mutate(props.id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ErrorModal;
