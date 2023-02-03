import { Button } from "ebs-design";
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
      <div className="test">
        {posts &&
          posts.map((item) => (
            <PostCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              date={item.date}
              author={item.author}
            />
          ))}
      </div>
    </>
  );
};

export default Posts;
