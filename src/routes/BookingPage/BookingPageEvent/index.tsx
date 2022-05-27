import React from "react";
import { useParams } from "react-router-dom";

export const BookingPageEvent: React.FC | null = () => {
  const { owner, link } = useParams();
  return (
    <div>
      BookingPageEvent {owner} {link}
    </div>
  );
};
