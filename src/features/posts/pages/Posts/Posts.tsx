import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Layout from "../../../../components/Layout";
import PostCard from "../../components/PostCard";
import "./Posts.css";

export type CardProps = {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  author?: string;
};

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CardProps[]>([]);

  const [loading, setLoading] = useState(false);
  const addPostHandler = () => {
    navigate("/posts/create", { replace: true });
  };

  const fetchPosts = async () => {
    const data = await axios.get("http://localhost:5000/posts");
    setPosts(data.data);
    setLoading(false);
    return data;
  };

  const { data } = useQuery("posts", fetchPosts);

  return (
    /* <div className="top_button">
        <button className="add_new" onClick={addPostHandler}>
          Add new post
        </button>
      </div> */
    <Layout>
      <div className="test">
        {posts &&
          posts.map((item) => (
              <PostCard
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
