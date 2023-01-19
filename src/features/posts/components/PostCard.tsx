import React from "react";
import * as AiIcons from "react-icons/ai";

import "./PostCard.css";

interface CardInterface {
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  author?: string;
}

const PostCard = ({ title, description, image, date, author }: CardInterface) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="profile">
          <span className="letter"><AiIcons.AiOutlineUser/></span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{author}</h5>
          <div className="card-date">{date}</div>
        </div>
      </div>
      <div><b>{title}</b></div>
      <img className="card-image" src={image} alt="Logo" />
      <div className="card-text">{description}</div>
    </div>
  );
};

export default PostCard;
