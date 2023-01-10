import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import classes from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setRepeatedPassword] = useState("");
  const [confirmation, setConfirmation] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUserHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (
      enteredName.trim().length === 0 ||
      enteredSurname.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      enteredRepeatedPassword.trim().length === 0
    ) {
      setError("Input is required");
      return;
    }
    setIsLoading(true);
   
    try{
    const user = JSON.stringify({
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      gender: enteredGender,
      password: enteredPassword
    })
    await axios.post('http://localhost:5000/users',user, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => {
      setIsLoading(false);
      if (res.status === 201 ){
        navigate('/login');
      }else{
        console.log('Some error occured');
      }
    })}catch(err){
      console.log(err);
    }
  };

  
  const usernameChangeHandler = (event: any) => {
    setEnteredName(event.target.value);
    setError("");
  };

  const surnameChangeHandler = (event: any) => {
    setEnteredSurname(event.target.value);
  };

  const emailChangeHandler = (event: any) => {
    setEnteredEmail(event.target.value);
  };

  const genderChangeHandler = (event: any) => {
    setEnteredGender(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setEnteredPassword(event.target.value);
  };

  const repeatedPasswordChangeHandler = (event: any) => {
    setRepeatedPassword(event.target.value);
  };

  const confirmationChangeHandler = (event: any) => {
    setConfirmation(event.target.value);
  };

  /* const errorHandler = () => {
    setError(null);
  } */

  return (
    <div>
      {error && (
        <strong id="title-error" role="alert">
          {error}
        </strong>
      )}
      <Card className={classes.input}>
        <form onSubmit={registerUserHandler}>
          <div className={classes.formHeader}>
            <h1>Inregistrare</h1>
          </div>
          <input
            id="name"
            type="text"
            placeholder="Nume"
            value={enteredName}
            onChange={usernameChangeHandler}
          />
          <input
            id="surname"
            type="text"
            placeholder="Prenume"
            value={enteredSurname}
            onChange={surnameChangeHandler}
          />
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />

          <select onChange={genderChangeHandler}>
            <option>Genul</option>
            <option value="male">Masculin</option>
            <option value="female">Femenin</option>
            <option value="none">Ma abtin</option>
          </select>

          <input
            id="password"
            type="password"
            placeholder="Parola"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirmare parola"
            value={enteredRepeatedPassword}
            onChange={repeatedPasswordChangeHandler}
          />
          <div>
            <label htmlFor="confirmation">
              <input
                type="checkbox"
                id="confirmation"
                value={confirmation}
                onChange={confirmationChangeHandler}
              />
              Sunt de acord cu prelucrarea datelor personale
            </label>
          </div>

          <div className="footer">
           {!isLoading && <Button type="submit">Register</Button>} 
           {isLoading && <p>Sending request...</p>}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
