import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingPage } from './';
import { useGetEventTypes } from '../../hooks';

// Мок хука
jest.mock('../../hooks', () => ({
  useGetEventTypes: jest.fn()
}));

describe('<BookingPage />', () => {
  it('отображает загрузку', () => {
    (useGetEventTypes as jest.Mock).mockReturnValue({ isLoading: true });

    render(<BookingPage />);

    // Здесь можно добавить проверки, связанные с отображением состояния загрузки
    // В данном примере мы просто убеждаемся, что не отображается ни одна ссылка на событие
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('отображает список событий', () => {
    const mockEventTypes = {
      isLoading: false,
      data: [
        {
          id: '1',
          owner: 'owner1',
          link: 'link1',
          color: 'red',
          name: 'Event 1',
          description: 'Event 1 Description'
        },
        {
          id: '2',
          owner: 'owner2',
          link: 'link2',
          color: 'blue',
          name: 'Event 2',
          description: 'Event 2 Description'
        }
      ]
    };

    (useGetEventTypes as jest.Mock).mockReturnValue(mockEventTypes);

    render(<BookingPage />);

    // Проверяем, что все элементы отображаются корректно
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 1 Description')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 2 Description')).toBeInTheDocument();
  });

  // Дополнительные тесты можно добавить по аналогии
});
