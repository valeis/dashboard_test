import React, { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import usersRequest from "../../api/users";
import { User } from "../../types/User";
import Button from "../Button/Button";
import Card from "../Card/Card";
import InputField from "../Input/InputField";

import "./UserModalForm.css";

type UserModalProps = {
  userId?: string;
  onConfirm: () => void;
};

const UserModal = (props: UserModalProps) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRepeatedPassword, setRepeatedPassword] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [enteredRole, setEnteredRole] = useState("Moderator");
  
  const [error, setError] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();
  
  const user = {
    name: enteredName,
    surname: enteredSurname,
    email: enteredEmail,
    gender: enteredGender,
    password: enteredPassword,
    role: enteredRole,
  };

  useQuery(["users", props.userId], () => usersRequest.getById(props.userId!), {
    enabled: !!props.userId!,
    onSuccess: (data) => {
      setEnteredName(data.name!);
      setEnteredSurname(data.surname!);
      setEnteredEmail(data.email!);
      setEnteredGender(data.gender!);
      setEnteredRole(data.role!);
      setEnteredPassword(data.password!);
    },
  });

  const validation = () => {
    let error: { id: string }[] = [];
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

      if (!confirmation) {
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

  const registerUser = async (user: User) => {
    let data = await usersRequest.post(user);
    return data;
  };

  const updateUser = async () => {
    let data = await usersRequest.put(props.userId!, user);
    return data;
  };


  const closeModal = props.onConfirm;

  const { mutate } = useMutation(registerUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
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
      queryClient.invalidateQueries(["users"]);
      closeModal();
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("update");
    },
  });

  async function registerUserHandler(event: FormEvent) {
    event.preventDefault();
    const isValid = validation();
    if (isValid) {
      setIsLoading(true);
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

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredName(event.target.value);
  };

  const surnameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSurname(event.target.value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const genderChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEnteredGender(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);
  };

  const repeatedPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatedPassword(event.target.value);
  };

  const confirmationChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmation(event.target.checked)
  };

  const roleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEnteredRole(event.target.value);
  };

  return (
    <>
      <div className={"backdrop"} onClick={props.onConfirm} />
      <Card className={"modal"}>
        <header className={"header_modal"}>
          {props.userId == null ? (
            <h2>Introduce??i datele noului utilizator</h2>
          ) : (
            <h2>Introduce??i datele modificate</h2>
          )}
        </header>
        <div className={"content"}>
          <div>
            <Card className={"input_modal"}>
              <form onSubmit={registerUserHandler}>
                <InputField
                  id="name"
                  type="text"
                  placeholder="Nume"
                  value={enteredName}
                  onChange={usernameChangeHandler}
                  error={
                    error.find(({ id }) => id === "name") &&
                    "Numele introdus nu corespunde cerin??elor"
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
                    "Prenumele introdus nu corespunde cerin??elor"
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
                    "Email-ul introdus nu corespunde cerin??elor"
                  }
                />

                <select
                  value={enteredGender}
                  onChange={genderChangeHandler}
                  id="gendre"
                >
                  <option value="">Genul</option>
                  <option value="male">Masculin</option>
                  <option value="female">Femenin</option>
                  <option value="none">Ma abtin</option>
                </select>
                {error.find(({ id }) => id === "gendre") && (
                  <span className={"span_modal"}>
                    Selecta??i cel pu??in o valoare
                  </span>
                )}

                <select
                  value={enteredRole}
                  onChange={roleChangeHandler}
                  id="role"
                >
                  <option value="">Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
                {error.find(({ id }) => id === "role") && (
                  <span className={"span_modal"}>
                    Selecta??i cel pu??in o valoare
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
                      "Parola trebuie s?? con??in?? cel pu??in 6 caractere"
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
                        checked={confirmation}
                        onChange={confirmationChangeHandler}
                        error={
                          error.find(({ id }) => id === "confirmation") &&
                          "Pentru a continua trebuie s?? fi??i de acord cu prelucrarea datelor personale!"
                        }
                        message="Sunt de acord cu prelucrarea datelor personale"
                      />
                    </label>
                  </div>
                )}

                <div>
                  {!isLoading && (
                    <Button type="submit" value="submit">
                      {!props.userId ? "Register" : "Update"}
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
