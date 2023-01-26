import React from "react";
import { useQuery } from "react-query";
import * as AiIcons from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import postsRequest from "../../../../api/posts";


import "./PostDetails.css";

const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(["posts", params.id], () =>
    postsRequest.getById(params.id)
  );

  return (
    <div>
      <header>
        <h1>{data?.title}</h1>
        <div className="author">
          <h2>{data?.author}</h2>
          <p className="blog-date">Published {data?.date}</p>
        </div>
        <button
          className="back_button"
          onClick={() => {
            navigate("/posts");
          }}
        >
          <AiIcons.IoIosArrowDropleft size="10x" />
        </button>
      </header>
      <div className="blog-wrap">
        <img src={data?.image} alt="cover" />
        <p className="blog-desc">{data?.description}</p>
      </div>
    </div>
  );
};
export default PostDetails;
