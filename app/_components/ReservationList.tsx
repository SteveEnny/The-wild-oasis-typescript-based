"use client";

import { bookings } from "@/types/bookingTypes";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lb/actions";

function ReservationList({ bookings }: { bookings: bookings[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBooking: bookings[], bookingId: string) => {
      return curBooking.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: any) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
