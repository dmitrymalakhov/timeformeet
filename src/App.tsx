import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SignIn } from "./routes/SignIn";
import { SignUp } from "./routes/SignUp";
import { Calendar } from "./routes/Calendar";
import "antd/dist/antd.css";

const AppWrapper = styled.div``;

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </AppWrapper>
  </QueryClientProvider>
);
