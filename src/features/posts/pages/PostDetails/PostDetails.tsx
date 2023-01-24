import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import postsRequest from "../../../../api/posts";
import Button from "../../../../components/Button/Button";
import Layout from "../../../../components/Layout";
import * as AiIcons from "react-icons/io"
import "./PostDetails.css";

const PostDetails = () => {
  const params = useParams();
 
  const fetchPost = async () => {
    let data = await postsRequest.getById(params.id);
    return data;
  };

  const { data } = useQuery("posts", fetchPost);

  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <header>
          <h1>{data?.title}</h1>
          <div className="author">
            <h2>{data?.author}</h2>
            <p className="blog-date">Published {data?.date}</p>
          </div>
          <button className="back_button"
            onClick={() => {
              navigate('/posts');
            }}
          >
            <AiIcons.IoIosArrowDropleft size='10x'/>
          </button>
        </header>
        <div className="blog-wrap">
          <img src={data?.image} alt="cover" />
          <p className="blog-desc">{data?.description}</p>
        </div>
      </div>
    </Layout>
  );
};
export default PostDetails;
