import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import InputField from "../../../../components/Input/InputField";
import Layout from "../../../../components/Layout";
import AuthContext from "../../../../store/auth-context";
import "./CreatePosts.css";

//1. Titlu(input[type="text"]) - titlul postarii
//2. Descriere(input[type="textarea"]) - descrierea postarii
//3. Imagine(input[type="text"]) - un link de pe unsplash.com
//4. Data(input[type="date"]) - data postarii
//5. Utilizatorul - va fi ascuns dar cu valoarea utilizatorului logat (numele si prenumele)
//6. Buton de adaugare - POST `/posts`

const CreatePosts = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredLinkToImage, setEnteredLinkToImage] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const [error, setError] = useState<{ id: string }[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
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

    setError(error);
    return !error.length;
  };

  const publishPost = async (post: string) => {
    const { data: response } = await axios.post(
      "http://localhost:5000/posts",
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

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
      const post = JSON.stringify({
        title: enteredTitle,
        description: enteredDescription,
        image: enteredLinkToImage,
        date: enteredDate,
        author: authCtx.currentUser?.name,
      });
      mutate(post);
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
    <Layout>
      <div>
        <Card className="input">
          <form onSubmit={publishPostHandler}>
            <div className="formHeader">
              <h1>Add a new post</h1>
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
                <Button type="submit" className='button_register'>
                    Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatePosts;
