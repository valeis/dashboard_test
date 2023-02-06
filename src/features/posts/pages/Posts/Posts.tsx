import { Button, Col, Row } from "ebs-design";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import postsRequest from "../../../../api/posts";
import PostCard from "../../components/PostCard";

import "./Posts.css";

const Posts = () => {
  const navigate = useNavigate();
  const addPostHandler = () => {
    navigate("/posts/create", { replace: true });
  };
  const { data: posts } = useQuery("posts", postsRequest.get);

  return (
    <>
      <Button className="top_button" type="primary" onClick={addPostHandler}>
        Add new post
      </Button>
      <Row className="mb-16">
        {posts &&
          posts.map((item) => (
            <Col className="col-md" key={item.id}>
              <PostCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                date={item.date}
                author={item.author}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Posts;
