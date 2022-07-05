import { Outlet } from 'react-router-dom';
import { BookingPageWrapper, BookingContainer } from './styled';

export const BookingPageRoot = () => (
  <BookingPageWrapper>
    <BookingContainer>
      <Outlet />
    </BookingContainer>
  </BookingPageWrapper>
);
