import React from "react";
import { UseMutationResult } from "react-query";
import { Button, Modal, Space } from "ebs-design";

type ConfirmationModalProps = {
  id: string;
  title: string;
  setElementToDelete: (id: string) => void;
  deleteElementHandler: UseMutationResult<any, unknown, string, unknown>;
};

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const deleteElement = () => {
    props.deleteElementHandler.mutate(props.id);
    props.setElementToDelete("");
  };
  return (
      <Modal
        closeOnClickOutside
        mask
        open
        size="small"
        title={`Delete "${props.title?.substring(0,26)} ${props.title?.length > 26 ? "..." : ""}" ?`}
        onClose={() => props.setElementToDelete("")}
      >
        <div>
          <Modal.Content>
            <Space justify="center">
              <Button
                type="ghost"
                size="medium"
                onClick={() => props.setElementToDelete("")}
              >
                Cancel
              </Button>
              <Button type="fill" size="medium" onClick={() => deleteElement()}>
                Delete
              </Button>
            </Space>
          </Modal.Content>
        </div>
      </Modal>
  );
};

export default ConfirmationModal;
