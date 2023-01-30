import React from "react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import "./ConfirmationModal.css";
import { UseMutationResult } from "react-query";

type ConfirmationModalProps = {
  id: string;
  title: string;
  setElementToDelete: (id: string) => void;
  deleteElementHandler: UseMutationResult<any, unknown, string, unknown>;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const deleteElement = () => {
    props.deleteElementHandler.mutate(props.id);
    props.setElementToDelete('');
  }
  return (
    <>
      <div className="backdrop_modal" />
      <Card className="modal_modal">
        <header className="header_modal">
          <h1>Delete  "{props.title}" ?</h1>
        </header>
        <div className="content_modal">
          <Button onClick={() => props.setElementToDelete('')}>Cancel</Button>
          <Button
            className="button_modal"
            onClick={() => deleteElement()}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ConfirmationModal;
