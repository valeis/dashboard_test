import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";

import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { Card as CardType } from "../../../types/Card";
import postsRequest from "../../../api/posts";

import "./PostCard.css";
import { AvatarInline, Button, Card, Space } from "ebs-design";

const PostCard = ({
  id,
  title,
  description,
  image,
  date,
  author,
}: CardType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const [postToDelete, setPostToDelete] = useState("");

  const deletePost = async (id: string) => {
    return await postsRequest.delete(id);
  };

  const deletePostHandler = useMutation(deletePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const editPostHandler = (id?: string) => {
    navigate(`/posts/${id}/edit`);
  };

  return (
    <Card size="small">
      <Card.Header bordered>
        <Space align="center" justify="space-between">
          <Space
            align="start"
            direction="vertical"
            size="small"
            justify="center"
          >
            <div className="header">
              <AvatarInline alt={author} />
            </div>
            <div className="header">{date}</div>
          </Space>
          
          <Space
            align="end"
            direction="horizontal"
            size="small"
            justify="center"
          >
            <Button
              type="text"
              prefix={<BiIcons.BiEdit />}
              onClick={() => {
                editPostHandler(id);
              }}
            ></Button>
            <Button
              type="text"
              prefix={<MdIcons.MdDeleteOutline />}
              onClick={() => {
                setPostToDelete(id!);
              }}
            ></Button>
          </Space>
        </Space>
      </Card.Header>
      <Card.Body>
        <Space justify="center">
          <b>
            <div className="card-text">
              {title?.substring(0, 30)}
              {title!.length > 30 ? "..." : ""}
            </div>
          </b>
        </Space>
        <img className="card-image" src={image} alt="Logo" />
        <Space justify="center">
          <div className="card-description">
            {description?.substring(0, 90)}
            <b>{description!.length > 90 ? "..." : ""}</b>
          </div>
        </Space>
      </Card.Body>

      <Card.Footer>
        <Space align="center" justify="center">
          <Space>
            <Button
              type="fill"
              onClick={() => {
                navigate(`/posts/${id}`);
              }}
            >
              Detalii
            </Button>
          </Space>
        </Space>
        {postToDelete && (
        <ConfirmationModal
          setElementToDelete={setPostToDelete}
          deleteElementHandler={deletePostHandler}
          id={id!}
          title={title!}
        />
      )}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
