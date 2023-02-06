import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";

import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import AuthContext from "../../../store/auth-context";
import { Card as CardType } from "../../../types/Card";
import postsRequest from "../../../api/posts";

import "./PostCard.css";
import { Button, Card, Space, Table } from "ebs-design";

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
  const authCtx = useContext(AuthContext);

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
    <Card size="medium">
      <Card.Header bordered>
        <Space align="center" justify="space-between">
          <Space align="center">
            <h4>Card title</h4>
            <Button type="primary">A regular button</Button>
          </Space>
          <Button>Another one</Button>
        </Space>
      </Card.Header>
      <Card.Body>
        <Table
          columns={[
            {
              dataIndex: "title",
              key: "title",
              title: "Title",
            },
            {
              dataIndex: "desc",
              key: "desc",
              title: "Description",
            },
            {
              dataIndex: "date",
              key: "date",
              title: "Time",
            },
          ]}
          data={[
            {
              date: "Today",
              desc: "Desc",
              title: "Test",
            },
            {
              date: "Today",
              desc: "Desc",
              title: "Test",
            },
            {
              date: "Today",
              desc: "Desc",
              title: "Test",
            },
            {
              date: "Today",
              desc: "Desc",
              title: "Test",
            },
            {
              date: "Today",
              desc: "Desc",
              title: "Test",
            },
          ]}
        />
      </Card.Body>
      <Card.Footer bordered>
        <Space align="center" justify="space-between">
          <span className="no-wrap">1 of 5</span>
          <Space>
            <Button disabled>Prev</Button>
            <Button>Next</Button>
          </Space>
        </Space>
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
