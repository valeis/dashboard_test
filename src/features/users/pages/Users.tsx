import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Pagination from "../../../components/Pagination/Pagination";
import "./Users.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import UserModalForm from "../components/UserModalForm";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export type UserItemProps = {
  id: string;
  name: string;
  surname: string;
  gender: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<UserItemProps[]>([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [deleteUser, setDeleteUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6);

  const addUserHandler = () => {
    setAddUser(true);
  };

  const editUserHandler = (id: string) => {
    setEditUser(id);
  };
  const queryClient = useQueryClient();
  
  const deleteUsers = async (id:string) =>{
    setDeleteUser(id);
    return  await axios.delete(`http://localhost:5000/users/${id}`)
  };

  const deleteUserHandler = useMutation(deleteUsers, {
    onSuccess: (data)=>{
      queryClient.invalidateQueries({queryKey:['users'], exact: true});
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  })

  const submitFormHandler = () => {
    setAddUser(false);
    setEditUser("");
  };

  const authCtx = useContext(AuthContext);
  console.log(authCtx.currentUser?.role);

  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);


  const fetchUsers= async () => {
    setLoading(true);
    const data = await axios.get('http://localhost:5000/users');
    setUsers(data.data);
    setLoading(false);
    return data;
    //setLoading(false);
  }

  const{data} = useQuery('users', fetchUsers);

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost) 
  
  return (
    <Layout>
      {addUser && <UserModalForm onConfirm={submitFormHandler} />}
      <div className={`${authCtx.currentUser?.role==='Moderator' ? 'table' : "table_l"}`}>
        <div className="table_header">
          <p>Registered users</p>
          <div>
            { authCtx.currentUser?.role === 'Admin' && <button className="add_new" onClick={addUserHandler}>
              Add new user
            </button> }
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
                <th>Rolul</th>
                { authCtx.currentUser?.role === 'Admin' && <th>Acțiuni</th>}
              </tr>
            </thead>
            <tbody>
              {currentUsers &&
                currentUsers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    { authCtx.currentUser?.role === 'Admin' &&
                    <td>
                      <button
                        onClick={() => {
                          editUserHandler(item.id);
                        }}
                      >
                        <FaIcons.FaEdit />
                      </button>
                      &nbsp;
                      <button
                        onClick={() => {
                          deleteUserHandler.mutate(item.id);
                        }}
                      >
                        <AiIcons.AiOutlineUserDelete />
                      </button>
                    </td> }
                  </tr>
                ))}
            </tbody>
          </table>
          {editUser !== "" ? (
            <UserModalForm onConfirm={submitFormHandler} userId={editUser} />
          ) : (
            ""
          )}
          <Pagination usersPerPage={usersPerPage} totalUsers={users.length}  paginate={paginate} currentPage={currentPage}/>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
