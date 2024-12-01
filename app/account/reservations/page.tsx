import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lb/auth";
import { getBookings } from "@/app/_lb/data-service";
import { bookings } from "@/types/bookingTypes";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservation",
};

export default async function Page() {
  const session = await auth();
  const bookings: any = await getBookings(session?.user?.id as string);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservation yet. check out our{" "}
          <Link href="cabin" className="text-accent-300">
            Luxury cabin &arrow;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
