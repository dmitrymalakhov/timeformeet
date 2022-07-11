import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  SignIn,
  SignUp,
  AccountRoot,
  AccountEventTypes,
  AccountScheduledEvents,
  Root,
  BookingPageRoot,
  BookingPage,
  BookingPageEvent,
  BookingPageEventScheduled,
  BookingPageInvite
} from './routes';

import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: proxima nova,sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #1A1A1A;
    word-break: break-word;
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:-webkit-any-link {
    cursor: pointer;
  }
`;
const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Root />} />

      <Route path="/booking-page/" element={<BookingPageRoot />}>
        <Route path=":eventTypeId" element={<BookingPage />} />
        <Route
          path=":owner/:eventTypeId/:link"
          element={<BookingPageEvent />}
        />
        <Route
          path=":owner/:eventTypeId/:link/:eventSchedulesId"
          element={<BookingPageEventScheduled />}
        />
        <Route path="invitees/:link/:hash" element={<BookingPageInvite />} />
      </Route>

      <Route path="/account/" element={<AccountRoot />}>
        <Route path="event_types" element={<AccountEventTypes />} />
        <Route path="scheduled_events" element={<AccountScheduledEvents />} />
      </Route>
    </Routes>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
