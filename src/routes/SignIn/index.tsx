import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { baseAPILink } from "../../constants";
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

interface RefreshTokenResponse extends Response {
  accessToken?: string;
}

const verifyAuthentication = async (token: string) => {
  try {
    const res: RefreshTokenResponse = await fetch(`${baseAPILink}/refresh`, {
      credentials: "include"
    });

    console.log(res);
    if (res.accessToken) localStorage.setItem("token", res.accessToken);
  } catch (e) {
    console.log(e);
  }
};

export const SignIn = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [runRefreshToken, setRunRefreshToken] = useState<number>(0);

  const handleCloseError = () => {
    setError(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) verifyAuthentication(token);
  }, [runRefreshToken]);

  const handleRefreshToken = () => {
    console.log(Math.random());
    setRunRefreshToken(Math.random());
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
          <Button onClick={handleRefreshToken}>Refresh token</Button>
          {error && (
            <Alert
              description={error}
              type="error"
              closable
              onClose={handleCloseError}
            />
          )}
        </Form>

        {/* {loggedIn && <Navigate replace to="/calendar" />} */}
      </SignInWrapper>
    </>
  );
};
