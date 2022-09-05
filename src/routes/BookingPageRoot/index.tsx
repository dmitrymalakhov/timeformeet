import { Outlet } from 'react-router-dom';
import { BookingPageWrapper, BookingContainer } from './styled';

export const BookingPageRoot: React.FC = () => (
  <BookingPageWrapper>
    <BookingContainer>
      <Outlet />
    </BookingContainer>
  </BookingPageWrapper>
);
