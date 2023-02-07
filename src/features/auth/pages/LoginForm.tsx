import React, {useContext, useState } from "react";
import { Form, Input, Button, useForm } from "ebs-design";
import { Link} from "react-router-dom";

import Card from "../../../components/Card/Card";
import AuthContext from "../../../store/auth-context";

import "./LoginForm.css";

const LoginForm = () => {
  const [form] = useForm();
  const authCtx = useContext(AuthContext);

  const [logged, setLogged] = useState(true);

  return (
    <div>
      <Card className={"input_login"}>
        <div className={"formHeader_login"}>
          <h1>Login</h1>
        </div>
        <Form
          form={form}
          validateMessages={{
            // eslint-disable-next-line no-template-curly-in-string
            required: "Câmpul ”${label}” nu poate să fie gol",
          }}
          onFinish={ (values) => {
            authCtx.login(values);
            console.log(authCtx.isLoggedIn)
            setLogged(authCtx.isLoggedIn);
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

          <div className="ebs-button">
          <Button type="primary" submit={true}>
            Log in
          </Button>

          <Link to="/register">
            <Button type="ghost">Register</Button>
          </Link>  
          </div>
          {!logged && <span className="span_login">Utilizatorul dat nu a fost găsit în sistem !</span>}
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
