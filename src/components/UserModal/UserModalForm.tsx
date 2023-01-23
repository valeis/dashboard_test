import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "../Button/Button";
import Card from "../Card/Card";
import InputField from "../Input/InputField";
import classes from "./UserModalForm.module.css";

const UserModal = (props: any) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setRepeatedPassword] = useState("");
  const [confirmation, setConfirmation] = useState();
  const [enteredRole, setEnteredRole] = useState("Moderator");

  const [error, setError] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.userId != null) {
      fetch("http://localhost:5000/users/" + props.userId)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          setEnteredName(resp.name);
          setEnteredSurname(resp.surname);
          setEnteredEmail(resp.email);
          setEnteredGender(resp.gender);
          setEnteredPassword(resp.password);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [props.userId]);


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

    if (!props.userId) {
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
        error = [...error, { id: "confirmation" }];
      }
    }

    if (enteredGender !== "") {
    } else {
      error = [...error, { id: "gendre" }];
    }
    if (enteredRole !== "") {
    } else {
      error = [...error, { id: "role" }];
    }
    setError(error);
    return !error.length;
  };

  /* interface User {
    name: string;
    surname: string;
    email: string;
    gender: string;
    password: string;
    role: string
  }
  const user = JSON.stringify({
    name: enteredName,
    surname: enteredSurname,
    email: enteredEmail,
    gender: enteredGender,
    password: enteredPassword,
    role: enteredRole
  }); */

  const registerUser = async (user: string) => {
    const { data: response } = await axios.post(
      "http://localhost:5000/users",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  const updateUser = async () =>{
    const {data: response} = await axios.put("http://localhost:5000/users/" + props.userId, {
            name: enteredName,
            surname: enteredSurname,
            email: enteredEmail,
            gender: enteredGender,
            password: enteredPassword,
            role: enteredRole
    });
    return response.data;
  };

  const queryClient = useQueryClient();
  
  const closeModal = props.onConfirm;

  const { mutate } = useMutation(registerUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const put = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
      closeModal();
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("update");
    }
  });

  async function registerUserHandler(event: FormEvent) {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      setIsLoading(true);
      const user = JSON.stringify({
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        gender: enteredGender,
        password: enteredPassword,
        role: enteredRole
      });
      /* const updatedData = {
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredGender,
        enteredPassword,
        enteredRole
      }; */
      if (props.userId == null) {
        mutate(user);
      } else {
        put.mutate();
      }
      closeModal();
    } else {
      return;
    }
  }

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

  const roleChangeHandler = (event: any) => {
    setEnteredRole(event.target.value);
  };

  return (
    <>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          {props.userId == null ? (
            <h2>Introduceți datele noului utilizator</h2>
          ) : (
            <h2>Introduceți datele modificate</h2>
          )}
        </header>
        <div className={classes.content}>
          <div>
            <Card className={classes.input}>
              <form onSubmit={registerUserHandler}>
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
                {error.find(({ id }) => id === "gendre") && (
                  <span className={classes.span}>
                    Selectați cel puțin o valoare
                  </span>
                )}

                <select onChange={roleChangeHandler} id="role">
                  <option value="">Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
                {error.find(({ id }) => id === "role") && (
                  <span className={classes.span}>
                    Selectați cel puțin o valoare
                  </span>
                )}

                {props.userId == null && (
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
                )}

                {props.userId == null && (
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
                )}
                {props.userId == null && (
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
                )}

                <div className="footer">
                  {!isLoading && (
                    <Button type="submit" value="submit">
                      {props.userId == null ? "Register" : "Modify"}
                    </Button>
                  )}
                  {isLoading && <p>Sending request...</p>}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserModal;
