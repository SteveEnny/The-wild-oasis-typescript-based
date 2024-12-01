import { cabinType } from "@/types/cabinsTypes";
import { getBookedDatesByCabinId, getSettings } from "../_lb/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { settingType } from "@/types/settings";
import { auth } from "../_lb/auth";
import LoginMessage from "./LoginMessage";

type ReservationProp = {
  cabin: cabinType;
};

async function Reservation({ cabin }: ReservationProp) {
  const [settings, bookedDates]: [settingType, any] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
