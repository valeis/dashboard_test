import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import InputField from "../../components/Input/InputField";
import classes from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setRepeatedPassword] = useState("");
  const [confirmation, setConfirmation] = useState();

  const [error, setError] = useState<{ id: string }[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validation = () => {
    let error: { id: string }[] = [];
    //error = !enteredName.match('22') ? [...error, {id: 'name'}]: error.filter(({id})=>id !== 'name')
    error =
      enteredName.trim().length! <= 1
        ? [...error, { id: "name" }]
        : error.filter(({ id }) => id !== "name");
    error =
      enteredSurname.trim().length! <= 1
        ? [...error, { id: "surname" }]
        : error.filter(({ id }) => id !== "surname");
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
    error =
      enteredPassword !== enteredRepeatedPassword
        ? [...error, { id: "confirm-password" }]
        : error.filter(({ id }) => id !== "confirm-password");

    const checkbox = document.getElementById(
      "confirmation"
    ) as HTMLInputElement | null;

    if (checkbox?.checked) {
    } else {
      error =[...error, { id: "confirmation" }] 
    }

    if (enteredGender !== ''){
    } else {
      error =[...error, { id: "gendre" }]
    }

    //console.log(error);

    setError(error);
    return !error.length;
  };

  const registerUserHandler = async (event: FormEvent) => {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      setIsLoading(true);

      try {
        const user = JSON.stringify({
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          gender: enteredGender,
          password: enteredPassword,
        });
        await axios
          .post("http://localhost:5000/users", user, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setIsLoading(false);
            if (res.status === 201) {
              navigate("/login");
            } else {
              console.log("Some error occured");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  const usernameChangeHandler = (event: any) => {
    setEnteredName(event.target.value);
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
  return (
    <div>
      <Card className={classes.input}>
        <form onSubmit={registerUserHandler}>
          <div className={classes.formHeader}>
            <h1>Inregistrare</h1>
          </div>
          <InputField
            id="name"
            type="text"
            placeholder="Nume"
            value={enteredName}
            onChange={usernameChangeHandler}
            error={
              error.find(({ id }) => id === "name") &&
              "Numele introdus nu corespunde cerințelor"
            }
          />
          <InputField
            id="surname"
            type="text"
            placeholder="Prenume"
            value={enteredSurname}
            onChange={surnameChangeHandler}
            error={
              error.find(({ id }) => id === "surname") &&
              "Prenumele introdus nu corespunde cerințelor"
            }
          />
          <InputField
            id="email"
            type="text"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            error={
              error.find(({ id }) => id === "email") &&
              "Email-ul introdus nu corespunde cerințelor"
            }
          />

          <select onChange={genderChangeHandler} id="gendre">
            <option value="">Genul</option>
            <option value="male">Masculin</option>
            <option value="female">Femenin</option>
            <option value="none">Ma abtin</option>
          </select>
          { error.find(({ id }) => id === "gendre") && <span className={classes.span}>Selectați cel puțin o valoare</span> }

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
          <InputField
            id="confirm-password"
            type="password"
            placeholder="Confirmare parola"
            value={enteredRepeatedPassword}
            onChange={repeatedPasswordChangeHandler}
            error={
              error.find(({ id }) => id === "confirm-password") &&
              "Parolele nu corespund!"
            }
          />
          <div>
            <label htmlFor="confirmation">
              <InputField
                type="checkbox"
                id="confirmation"
                value={confirmation}
                onChange={confirmationChangeHandler}
                error={
                  error.find(({ id }) => id === "confirmation") &&
                  "Pentru a continua trebuie să fiți de acord cu prelucrarea datelor personale!"
                }
                message="Sunt de acord cu prelucrarea datelor personale"
              />
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
