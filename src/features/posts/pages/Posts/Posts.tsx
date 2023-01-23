import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../components/Layout";
import { CardProps } from "../../../../types/CardProps";
import PostCard from "../../components/PostCard";
import "./Posts.css";



const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CardProps[]>([]);
  const addPostHandler = () => {
    navigate("/posts/create", { replace: true });
  };

  const fetchPosts = async () => {
    const data = await axios.get("http://localhost:5000/posts");
    setPosts(data.data);
    return data;
  };

  useQuery("posts", fetchPosts);

  return (
    <Layout>
      <div className="top_button">
        <button className="add_new" onClick={addPostHandler}>
          Add new post
        </button>
      </div>
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
    </Layout>
  );
};

export default Posts;
