import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { useQueryClient, QueryObserver } from "react-query";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { baseAPILink } from "../../constants";
import { apiRequest } from "../../utils/request";
import { SignInWrapper } from "./styled";

const LoginButtonWrapper = styled(Form.Item)`
  display: flex;
  flex-direction: column;
`;

type TUser = {
  id: number;
  login: string;
};

interface SignInResponce extends Response {
  accessToken?: string;
  refreshToken?: string;
  user?: TUser;
  statusCode?: number;
  error?: string;
  message?: string;
}

export const SignIn = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleCloseError = () => {
    setError(null);
  };

  const handleTestRequest = () => {
    apiRequest("/test");
  };

  const handleFinish = (values: any) => {
    fetch(`${baseAPILink}/signin`, {
      method: "POST",
      body: JSON.stringify(values),
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res: SignInResponce) => {
        if (res.message && res.statusCode && res.statusCode !== 200) {
          setError(res.message);
        } else if (res.accessToken) {
          localStorage.setItem("token", res.accessToken);
          setLoggedIn(!!res);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <SignInWrapper>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={handleFinish}
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

          {error && (
            <Alert
              description={error}
              type="error"
              closable
              onClose={handleCloseError}
            />
          )}
          <Button onClick={handleTestRequest}>Test Request</Button>
        </Form>
        {loggedIn && <Navigate replace to="/calendar" />}
      </SignInWrapper>
    </>
  );
};
