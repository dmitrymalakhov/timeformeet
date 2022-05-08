import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SignIn, SignUp, Calendar, Root } from "./routes";

import "antd/dist/antd.css";

const AppWrapper = styled.div``;

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppWrapper>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Root />}>
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </AppWrapper>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
