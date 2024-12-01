"use client";

import { cabinType } from "@/types/cabinsTypes";
import { useReservation } from "./ReservationContext";
import { differenceInDays } from "date-fns";
import { createReservaton } from "../_lb/actions";
import SubmitButton from "./SubmitButton";

type reservationFormProps = {
  cabin: cabinType;
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};
function ReservationForm({ cabin, user }: reservationFormProps) {
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const { range, resetRange, setRange } = useReservation();

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    endDate && startDate && differenceInDays(endDate, startDate);

  const cabinPrice = numNights && numNights * (regularPrice - discount);

  const bookingDate = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  console.log(startDate, endDate, numNights, cabinPrice, id);
  const createReservatonWithDate = createReservaton.bind(null, bookingDate);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        {user.name && user.image && (
          <div className="flex gap-4 items-center">
            <img
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
              src={user.image}
              // width={20}
              // height={20}
              alt={user.name}
            />
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <p>
        {range.from === undefined && range.to === undefined
          ? "select randa"
          : String(range.from)}{" "}
        to {String(range.to)}
      </p>

      <form
        action={(formData: FormData) => {
          createReservatonWithDate(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate && !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving....">
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
