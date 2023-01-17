import axios from "axios";
import React, { FormEvent, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import InputField from "../../components/Input/InputField";
import classes from "./LoginForm.module.css";
import { useMutation} from "react-query";
import AuthContext from "../../store/auth-context";


const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState<{ id: string }[]>([]);

  const authCtx = useContext(AuthContext);

  const [logged, setIsLogged] = useState(true);

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

  const getRegisteredUser = async (...r: any) => {
    console.log(r)
    const { data } = await axios.get(
      "http://localhost:5000/users/?email=" +
        (enteredEmail || null) +
        "&password=" +
        (enteredPassword || null)
    );
    return data;
  };

  const mutation = useMutation(getRegisteredUser, {onSuccess: (data) => {
        if (!data || data?.length === 0){
          setIsLogged(false);
          return;
        } 
        authCtx.login(data[0].id);
        navigate("/dashboard", { replace: true });
        setIsLogged(true);
      }})

  const proceedLoginHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      mutation.mutate({fff: 'fff'})
    } else {
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
              <Button type="submit" className={classes.button_register}>
                Register
              </Button>
            </Link>
          </div>
          {!logged && <span>Utilizatorul dat nu a fost găsit în sistem !</span>}
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
