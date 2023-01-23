import React, { useContext, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import "./PostCard.css";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import ErrorModal from "../../../components/ConfirmationModal/ConfirmationModal";
import AuthContext from "../../../store/auth-context";
import { CardProps } from "../../../types/CardProps";

const PostCard = ({
  id,
  title,
  description,
  image,
  date,
  author,
}: CardProps) => {

  const [ postToDelete, setPostToDelete ] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const authCtx = useContext(AuthContext);

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

  const editPostHandler = (id: string) =>{
    navigate(`/posts/${id}/edit`);
  };

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
        {(authCtx.currentUser?.role === "Admin" || authCtx.currentUser?.name === author) && <div className="buttons">
          <button
            onClick={() => {
              editPostHandler(id);
            }}
          >
            <BiIcons.BiEdit />
          </button>
          &nbsp;
          <button
            onClick={() => {
              setPostToDelete(true);
            }}
          >
            <MdIcons.MdDeleteOutline />
          </button>
        </div>}
      </div>
      { postToDelete && <ErrorModal setPostToDelete={setPostToDelete} deletePostHandler={deletePostHandler} id={id}/>} 
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
        Detalii
      </button>
    </div>
  );
};

export default PostCard;
