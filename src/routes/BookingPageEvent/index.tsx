import React from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "../../components";

export const BookingPageEvent: React.FC | null = () => {
  const { owner, link } = useParams();

  // const renderCell = (date: any) => {
  //   console.log(arg);
  // };
  return (
    <div>
      <Calendar fullscreen={false} />
    </div>
  );
};
