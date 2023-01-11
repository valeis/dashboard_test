import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import InputField from "../../components/Input/InputField";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState<{ id: string }[]>([]);

  const navigate = useNavigate();

  const validation = () => {
    let error: { id: string }[] = [];
    //error = !enteredName.match('22') ? [...error, {id: 'name'}]: error.filter(({id})=>id !== 'name')
    error =
      enteredEmail.trim().length! <= 5
        ? [...error, { id: "email" }]
        : error.filter(({ id }) => id !== "email");
    error = !enteredEmail.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
      ? [...error, { id: "email" }]
      : error.filter(({ id }) => id !== "email");
    error =
      enteredPassword.trim().length! <= 5
        ? [...error, { id: "password" }]
        : error.filter(({ id }) => id !== "password");
    setError(error);
    return !error.length;
  };

  const usernameChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);
  };

  const proceedLoginHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      await axios
        .get(
          "http://localhost:5000/users/?email=" +
            enteredEmail +
            "&password=" +
            enteredPassword
        )
        .then((res) => res.data)
        .then((data) => {

          if (Object.keys(data).length === 0) {
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
        });
    }else {
      return;
    }
  };

  return (
    <div>
      <Card className={classes.input}>
        <form onSubmit={proceedLoginHandler}>
          <div className={classes.formHeader}>
            <h1>Login</h1>
          </div>
          <InputField
            id="emails"
            type="text"
            placeholder="Email"
            value={enteredEmail}
            onChange={usernameChangeHandler}
            error={
              error.find(({ id }) => id === "email") &&
              "Email-ul introdus nu corespunde cerințelor"
            }
          />
          <InputField
            id="password"
            type="password"
            placeholder="Parola"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            error={
              error.find(({ id }) => id === "password") &&
              "Parola trebuie să conțină cel puțin 6 caractere"
            }
          />
          <div className="footer">
            <Button type="submit">Log in</Button>
            <Link to="/register">
              <Button type="submit">Register</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
