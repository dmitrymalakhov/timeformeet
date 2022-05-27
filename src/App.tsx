import { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  SignIn,
  SignUp,
  Calendar,
  BookingPage,
  Root,
  BookingPageEvent
} from "./routes";

import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
  }
`;
const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/booking-page/:owner/" element={<BookingPage />}>
        <Route path=":link" element={<BookingPageEvent />} />
      </Route>

      <Route path="/" element={<Root />}>
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
