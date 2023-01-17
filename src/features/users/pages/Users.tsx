import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import "./Users.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import UserModalForm from "../components/UserModalForm";

type UserItemProps = {
  id: string;
  name: string;
  surname: string;
  gender: string;
  email: string;
};

const Users = () => {
  const [users, setUsers] = useState<UserItemProps[]>([]);

  const [addUser, setAddUser] = useState(false);

  const addUserHandler = () => {
    setAddUser(true);
  }
  
  const submitFormHandler = () => {
    setAddUser(false);
  }

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUsers(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Layout>
      {addUser && <UserModalForm onConfirm = {submitFormHandler}/>}
      <div className="table">
        <div className="table_header">
          <p>Registered users</p>
          <div>
            <button className="add_new" onClick={addUserHandler} >Add new user</button>
          </div>
        </div>
        <div className="table_section">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Genul</th>
                <th>Email</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              { users && users.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>
                    <button>
                      <FaIcons.FaEdit />
                    </button>
                    &nbsp;
                    <button>
                      <AiIcons.AiOutlineUserDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
