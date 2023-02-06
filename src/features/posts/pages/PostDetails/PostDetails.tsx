import React from "react";
import { useQuery } from "react-query";
import * as AiIcons from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import postsRequest from "../../../../api/posts";

import "./PostDetails.css";
import { Button, Space } from "ebs-design";

const PostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(["posts", params.id], () =>
    postsRequest.getById(params.id)
  );

  return (
    <div>
      <Space justify="center" ><h1>{data?.title}</h1></Space>
      <Space align="center" justify="space-around" direction="horizontal">
        <Button
          size="large"
          type="light"
          onClick={() => {
            navigate("/posts");
          }}
          prefix={<AiIcons.IoIosArrowDropleft size="35px" />}
        ></Button>
        <Space direction="vertical" size="small" align="end">
          <h2 className="author">{data?.author}</h2>
          <p className="blog-date">Published {data?.date}</p>
        </Space>
      </Space>
      <div className="blog-wrap">
        <img src={data?.image} alt="cover" />
      </div>
      <p className="blog-desc">{data?.description}</p>
    </div>
  );
};
export default PostDetails;
