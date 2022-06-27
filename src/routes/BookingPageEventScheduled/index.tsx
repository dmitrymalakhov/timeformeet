import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const BookingPageEventScheduled = () => {
  const { eventTypeId, link } = useParams<Record<string, string | undefined>>();

  return null;
};
