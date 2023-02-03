import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Table } from "ebs-design";

import UserModalForm from "../../../components/UserModal/UserModalForm";
import AuthContext from "../../../store/auth-context";
import usersRequest from "../../../api/users";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Pagination from "../../../components/Pagination/Pagination";

import "./Users.css";
import { User } from "../../../types/User";

const Users = () => {
  const queryClient = useQueryClient();
  const authCtx = useContext(AuthContext);

  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [userToDelete, setUserToDelete] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  const addUserHandler = () => {
    setAddUser(true);
  };

  const editUserHandler = (id: string) => {
    setEditUser(id);
  };

  const deleteUsers = async (id: string) => {
    if (authCtx.currentUser?.id === id) authCtx.logout();
    return usersRequest.delete(id);
  };

  const deleteUserHandler = useMutation(deleteUsers, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const submitFormHandler = () => {
    setAddUser(false);
    setEditUser("");
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const { data: users } = useQuery("users", usersRequest.get);

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users && users!.slice(indexOfFirstPost, indexOfLastPost);

  const columns_user = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "name",
      title: "Nume",
    },
    {
      dataIndex: "surname",
      title: "Prenume",
    },
    {
      dataIndex: "gender",
      title: "Genul",
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "role",
      title: "Rolul",
    },
  ];

  const columns = [
    ...columns_user,
    {
      dataIndex: "id",
      title: "Acțiuni",
      render: (id: string, record: User) => {
        return (
          <>
            <Button
              type="fill"
              prefix={<FaIcons.FaEdit />}
              onClick={() => {
                editUserHandler(id);
              }}
            ></Button>
            &nbsp;
            <Button
              type="primary"
              prefix={<AiIcons.AiOutlineUserDelete />}
              onClick={() => {
                setUserToDelete(id);
                setUserName(record.name!);
              }}
            ></Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {addUser && <UserModalForm onConfirm={submitFormHandler} />}
      <div className="table_header">
        <h2>Registered users</h2>
        <div>
          {authCtx.currentUser?.role === "Admin" && (
            <Button type="primary" onClick={addUserHandler}>
              Add new user
            </Button>
          )}
        </div>
      </div>
      <Table
        columns={authCtx.currentUser?.role === "Admin" ? columns : columns_user}
        data={currentUsers}
        size="large"
      />
      {editUser !== "" ? (
        <UserModalForm onConfirm={submitFormHandler} userId={editUser} />
      ) : (
        ""
      )}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users ? users!.length : 0}
        paginate={paginate}
        currentPage={currentPage}
      />
      {userToDelete !== "" && (
        <ConfirmationModal
          setElementToDelete={setUserToDelete}
          deleteElementHandler={deleteUserHandler}
          id={userToDelete!}
          title={userName}
        />
      )}
    </div>
  );
};

export default Users;
