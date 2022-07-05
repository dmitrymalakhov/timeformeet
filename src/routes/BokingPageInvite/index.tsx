import React from 'react';
import { useParams } from 'react-router-dom';

export const BookingPageInvite: React.FC | null = () => {
  const params = useParams<Record<string, string | undefined>>();

  console.log(params);

  return null;
};
