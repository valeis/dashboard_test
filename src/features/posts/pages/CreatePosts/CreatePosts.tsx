import React, { FormEvent, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import postsRequest from "../../../../api/posts";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import InputField from "../../../../components/Input/InputField";
import AuthContext from "../../../../store/auth-context";
import { Card as CardType }  from "../../../../types/Card";

import "./CreatePosts.css";

const CreatePosts = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredLinkToImage, setEnteredLinkToImage] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [author, setEnteredAuthor] = useState("");

  const [error, setError] = useState<{ id: string }[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  let postAuthor: string | undefined = ""!;

  useQuery("postss", () => postsRequest.getById(params.id),{
    enabled: !!params.id,
    onSuccess: (data) => {
      setEnteredTitle(data.title!);
      setEnteredDescription(data.description!);
      setEnteredLinkToImage(data.image!);
      setEnteredDate(data.date!);
      setEnteredAuthor(data.author!);
    },
  });

  const navigate = useNavigate();
  const validation = () => {
    let error: { id: string }[] = [];

    error =
      enteredTitle.trim().length! <= 1
        ? [...error, { id: "title" }]
        : error.filter(({ id }) => id !== "title");

    error =
      enteredDescription.trim().length! <= 1
        ? [...error, { id: "description" }]
        : error.filter(({ id }) => id !== "description");

    error =
      enteredDate.trim().length! <= 1
        ? [...error, { id: "date" }]
        : error.filter(({ id }) => id !== "date");

    error =
      enteredLinkToImage.trim().length! <= 1
        ? [...error, { id: "image" }]
        : error.filter(({ id }) => id !== "image");

    setError(error);
    return !error.length;
  };

  const publishPost = async (post: CardType) => {
    let data = await postsRequest.post(post);
    return data;
  };

  const updatePost = async () => {

    if (params.id == null) {
      postAuthor = authCtx.currentUser?.name;
    } else {
      postAuthor = author;
    }
    const post =({
      title: enteredTitle,
      description: enteredDescription,
      image: enteredLinkToImage,
      date: enteredDate,
      author: postAuthor
    });

    let data = await postsRequest.put(params.id, post);
    return data;
  };

  const update = useMutation(updatePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("update");
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(publishPost, {
    onSuccess: (data) => {
      navigate("/posts");
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const publishPostHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      setIsLoading(true);

      if (params.id == null) {
        postAuthor = authCtx.currentUser?.name;
      } else {
        postAuthor = author;
      }
      if (params.id == null) {
        const post =({
          title: enteredTitle,
          description: enteredDescription,
          image: enteredLinkToImage,
          date: enteredDate,
          author: postAuthor,
        });
        mutate(post);
      } else {
        update.mutate();
      }
    } else {
      return;
    }
  };

  const titleChangeHandler = (event: any) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event: any) => {
    setEnteredDescription(event.target.value);
  };

  const imageChangeHandler = (event: any) => {
    setEnteredLinkToImage(event.target.value);
  };

  const dateChangeHandler = (event: any) => {
    setEnteredDate(event.target.value);
  };

  return (
    <div>
      <Card className="input">
        <form onSubmit={publishPostHandler}>
          <div className="formHeader">
            {params.id ? <h1>Edit post</h1> : <h1>Add a new post</h1>}
          </div>
          <InputField
            id="title"
            type="text"
            placeholder="Titlu"
            value={enteredTitle}
            onChange={titleChangeHandler}
            error={
              error.find(({ id }) => id === "title") &&
              "Postarea trebuie să conțină titlu"
            }
          />

          <textarea
            name="description"
            id="description"
            cols={64}
            rows={5}
            placeholder="Descrierea postării"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            minLength={1}
            required
            className="textarea"
          ></textarea>

          <InputField
            id="image"
            type="text"
            placeholder="Imagine"
            value={enteredLinkToImage}
            onChange={imageChangeHandler}
            error={
              error.find(({ id }) => id === "image") &&
              "Postarea trebuie să conțină link-ul către imaginea"
            }
          />

          <InputField
            id="date"
            type="date"
            value={enteredDate}
            onChange={dateChangeHandler}
            error={
              error.find(({ id }) => id === "date") &&
              "Postarea trebuie să conțină data publicării"
            }
          />

          <div className="footer">
            {!isLoading && <Button type="submit">Publish</Button>}
            {isLoading && <p>Sending request....</p>}
            <Link to="/posts">
              <Button type="submit" className="button_register">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreatePosts;
