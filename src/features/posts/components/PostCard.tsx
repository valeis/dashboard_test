import React from "react";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";

import "./PostCard.css";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface CardInterface {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  author?: string;
}

const PostCard = ({
  id,
  title,
  description,
  image,
  date,
  author,
}: CardInterface) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deletePost = async (id: string) => {
    return await axios.delete(`http://localhost:5000/posts/${id}`)
  };

  const deletePostHandler = useMutation(deletePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['posts'], exact: true});
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    }
  })

  return (
    <div className="card">
      <div className="card-header">
        <div className="profile">
          <span className="letter">
            <AiIcons.AiOutlineUser />
          </span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{author}</h5>
          <div className="card-date">{date}</div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              ("");
            }}
          >
            <BiIcons.BiEdit />
          </button>
          &nbsp;
          <button
            onClick={() => {
              deletePostHandler.mutate(id);
            }}
          >
            <MdIcons.MdDeleteOutline />
          </button>
        </div>
      </div>
      <div>
        <b>{title}</b>
      </div>
      <img className="card-image" src={image} alt="Logo" />
      <div className="card-text">
        {description?.substring(0, 60)}
        <b>{description!.length > 60 ? "..." : ""}</b>
      </div>
      <button
        className="button-81"
        onClick={() => {
          navigate(`/posts/${id}`);
        }}
      >
        {" "}
        Detalii
      </button>
    </div>
  );
};

export default PostCard;
