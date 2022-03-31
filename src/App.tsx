import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./routes/SignIn";
import { SignUp } from "./routes/SignUp";
import { Calendar } from "./routes/Calendar";
import "antd/dist/antd.css";

const AppWrapper = styled.div``;

export const App = () => (
  <AppWrapper>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="calendar" element={<Calendar />} />
    </Routes>
  </AppWrapper>
);
