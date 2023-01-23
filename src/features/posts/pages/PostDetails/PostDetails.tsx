import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Layout from "../../../../components/Layout";
import { CardProps } from "../../../../types/CardProps";
import "./PostDetails.css";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState<CardProps[]>([]);
  const fetchPost = async () => {
    const data = await axios.get("http://localhost:5000/posts/" + params.id);
    setPost(data.data);
    return data;
  };

  const { data } = useQuery("posts", fetchPost);
  console.log(post);

  return (
    <Layout>
      <div>
        <header>
          <h1>{data?.data.title}</h1>
          <div className="author">
            <h2>{data?.data.author}</h2>
            <p className="blog-date">Published {data?.data.date}</p>
          </div>
        </header>
        <div className="blog-wrap">
          <img src={data?.data.image} alt="cover" />
          <p className="blog-desc">{data?.data.description}</p>
        </div>
      </div>
    </Layout>
  );
};
export default PostDetails;
