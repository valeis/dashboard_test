import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Space,
  useForm,
} from "ebs-design";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import usersRequest from "../../api/users";
import { User } from "../../types/User";

import "./UserModalForm.css";

type UserModalProps = {
  userId?: string;
  onConfirm: () => void;
};

const UserModal = (props: UserModalProps) => {
  const queryClient = useQueryClient();
  const [form] = useForm();

  useQuery(["users", props.userId], () => usersRequest.getById(props.userId!), {
    enabled: !!props.userId!,
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
  });

  const registerUser = async (user: User) => {
    let data = await usersRequest.post(user);
    return data;
  };

  const updateUser = async (user: User) => {
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
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("update");
    },
  });

  return (
    <Modal
      closeOnClickOutside
      mask
      open
      size="small"
      title={
        props.userId == null
          ? "Introduceți datele noului utilizator"
          : "Introduceți datele modificate"
      }
      className={props.userId == null ? "modal_user" : "modal_user_update" }
      onClose={props.onConfirm}
    >
      <div className="user_modal">
        <Modal.Content>
          <Form
            form={form}
            validateMessages={{
              // eslint-disable-next-line no-template-curly-in-string
              required: "Câmpul ”${label}” nu poate să fie gol",
            }}
            onFinish={(values) => {
              const user = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                gender: values.gender,
                password: values.password,
                role: values.role,
              };
              if (props.userId == null){
                mutate(user);
              } else {
                put.mutate(user);
              }
              closeModal();
            }}
            controlOptions={{
              col: {
                size: 12,
              },
            }}
            labelOptions={{
              col: {
                size: 12,
              },
            }}
            type="vertical"
          >
            <Form.Field
              label="Nume"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="text" />
            </Form.Field>

            <Form.Field
              label="Prenume"
              name="surname"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="text" />
            </Form.Field>

            <Form.Field
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="email" />
            </Form.Field>

            <Form.Field
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    text: "Masculin",
                    value: "male",
                  },
                  {
                    text: "Femenin",
                    value: "female",
                  },
                  {
                    text: "Mă abțin",
                    value: "none",
                  },
                ]}
              />
            </Form.Field>

            <Form.Field
              label="Rolul"
              name="role"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={[
                  {
                    text: "Moderator",
                    value: "Moderator",
                  },
                  {
                    text: "Admin",
                    value: "Admin",
                  },
                ]}
              />
            </Form.Field>
            {props.userId == null && (
              <Form.Field
                label="Parola"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="password" />
              </Form.Field>
            )}

            {props.userId == null && (
              <Form.Field
                label="Confirmare parola"
                name="confirm_password"
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    async validator(_, value) {
                      if (getFieldValue("password") !== value) {
                        return Promise.reject(
                          "Parolele introduse nu corespund"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input type="password" />
              </Form.Field>
            )}

            {props.userId == null && (
              <Form.Field
                name="confirmations"
                rules={[
                  {
                    required: true,
                    async validator(rule, value){
                      value ? await Promise.resolve() : await Promise.reject('Pentru a continua trebuie să fiți de acord cu prelucrarea datelor personale!')
                    },
                  },
                ]}
              >
                <Checkbox text="Sunt deacord cu prelucrarea datelor personale" />
              </Form.Field>
            )}
            <Space justify="center">
              <Button type="ghost" size="medium" onClick={props.onConfirm}>
                Cancel
              </Button>

              <Button type="fill" size="medium" submit={true}>
                {!props.userId ? "Add User" : "Update"}
              </Button>
            </Space>
          </Form>
        </Modal.Content>
      </div>
    </Modal>
  );
};
export default UserModal;
