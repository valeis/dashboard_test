import {
  Button,
  DatePicker,
  Form,
  Input,
  Space,
  Textarea,
  useForm,
} from "ebs-design";
import React, { useState,  useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

import postsRequest from "../../../../api/posts";
import Card from "../../../../components/Card/Card";
import AuthContext from "../../../../store/auth-context";
import { Card as CardType } from "../../../../types/Card";

import "./CreatePosts.css";

const CreatePosts = () => {
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [form] = useForm();

  let postAuthor: string | undefined = ""!;
  const [ author, setAuthor ] = useState("")

  useQuery(["posts", params.id], () => postsRequest.getById(params.id), {
    enabled: !!params.id,
    onSuccess: (data) => {
      form.setFieldsValue(data);
      setAuthor(data.author!);
    },
  });

  const navigate = useNavigate();

  const publishPost = async (post: CardType) => {
    let data = await postsRequest.post(post);
    return data;
  };

  const updatePost = async (post: CardType) => {
    let data = await postsRequest.put(params.id, post);
    return data;
  };

  const update = useMutation(updatePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      navigate("/posts");
    },
    onError: () => {
      console.log("Some error occured");
    },
    onSettled: () => {
      queryClient.invalidateQueries("update");
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(publishPost, {
    onSuccess: (data) => {
      navigate("/posts");
    },
    onError: () => {
      console.log("Some error occured");
    }
  });


  return (
    <Card className="create_posts">
      <div className="formHeader_posts">
        {params.id ? <h1>Edit post</h1> : <h1>Add a new post</h1>}
      </div>
      <Form
        form={form}
        validateMessages={{
          // eslint-disable-next-line no-template-curly-in-string
          required: "Câmpul ”${label}” nu poate să fie gol",
        }}
        onFinish={(values) => {
          if (params.id == null){
            postAuthor = authCtx.currentUser?.name;
          } else {
            postAuthor = author
          }
          const post = {
            title: values.title,
            description: values.description,
            image: values.image,
            date: values.date,
            author: postAuthor
          };
          if (params.id == null){
            mutate(post);
          } else {
            update.mutate(post);
          }
        }}
        controlOptions={{
          col: {
            size: 12,
          },
        }}
        type="vertical"
      >
        <Form.Field
          label="Titlu"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Field>

        <Form.Field
          label="Descrierea postării"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Textarea></Textarea>
        </Form.Field>

        <Form.Field
          label="Link-ul către imagine"
          name="image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" />
        </Form.Field>

        <Form.Field
          label="Data"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Field>

        {
          <Space justify="center">
            <Link to="/posts">
              <Button type="ghost" size="medium">
                Cancel
              </Button>
            </Link>

            <Button type="fill" size="medium" submit={true}>
              Publish
            </Button>
          </Space>
        }
      </Form>
    </Card>
  );
};

export default CreatePosts;
