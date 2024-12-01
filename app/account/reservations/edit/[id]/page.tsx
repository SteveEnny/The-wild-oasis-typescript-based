import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lb/actions";
import { getBooking, getCabin } from "@/app/_lb/data-service";
// import { useFormStatus } from "react-dom";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  // CHANGE
  const reservationId = (await params).id;
  const { numGuests, observations, cabinId } = await getBooking(reservationId);

  const { maxCapacity } = await getCabin(cabinId);
  // const maxCapacity = 23;

  // async function hadleUpdate(formdata: FormData) {
  //   "use server";
  //   return updateReservation(reservationId, formdata);
  // }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
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
        <input type="hidden" name="bookingId" value={reservationId} />

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating....">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
