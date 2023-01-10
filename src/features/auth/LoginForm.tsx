import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const usernameChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);
  };

  const proceedLoginHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      setError("Input is required");
      return;
    }
   
    await axios.get("http://localhost:5000/users/?email="+enteredEmail+"&password="+enteredPassword).then((res)=>
        res.data
    ).then((data)=>{
        console.log(data)
        if (Object.keys(data).length === 0){
            setError("Entered email or password is incorrect");
        }else{
            navigate('/');
        }
    }).catch((err)=>{
        console.log(err);
    })
      
  };

  return (
    <div>
      <Card className={classes.input}>
        <form onSubmit={proceedLoginHandler}>
          <div className={classes.formHeader}>
            <h1>Login</h1>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Nume"
            value={enteredEmail}
            onChange={usernameChangeHandler}
          />
          <input
            id="password"
            type="password"
            placeholder="Parola"
            value={enteredPassword}
            onChange={passwordChangeHandler}
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
