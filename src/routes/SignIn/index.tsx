import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { SignInWrapper } from "./styled";

const LoginButtonWrapper = styled(Form.Item)`
  display: flex;
  flex-direction: column;
`;

export const SignIn = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  console.log(loggedIn);

  const onFinish = (values: any) => {
    fetch("https://rbuobh.sse.codesandbox.io/signin", {
      method: "POST",
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then((res) => {
        setLoggedIn(!!res);
      });
  };

  return (
    <SignInWrapper>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Please input your Login!"
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!"
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <LoginButtonWrapper>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </LoginButtonWrapper>
      </Form>
      {loggedIn && <Navigate replace to="/calendar" />}
    </SignInWrapper>
  );
};
