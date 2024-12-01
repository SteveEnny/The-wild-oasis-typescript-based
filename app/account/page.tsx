import { title } from "process";
import Navigation from "../_components/Navigation";
import { Metadata } from "next";
import { auth } from "../_lb/auth";
import { getBookings } from "../_lb/data-service";
import Link from "next/link";
import ReservationCard from "../_components/ReservationCard";
import ReservationList from "../_components/ReservationList";
import { bookings } from "@/types/bookingTypes";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();
  const bookings: any = await getBookings(session?.user?.id as string);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">Welcome,</h2>
      {/* {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservation yet. check out our{" "}
          <Link href="cabin" className="text-accent-300">
            Luxury cabin &arrow;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )} */}
    </div>
  );
}
