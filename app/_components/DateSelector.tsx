"use client";

import { cabinType } from "@/types/cabinsTypes";
import { settingType } from "@/types/settings";
import {
  differenceInDays,
  getYear,
  isPast,
  isSameDay,
  isThisYear,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker, OnSelectHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
function isAlreadyBooked(range: any, datesArr: string[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

type DateSelectorTypes = {
  cabin: cabinType;
  settings: settingType;
  bookedDates: any;
};
// type DateRangeType = {
//   from: undefined | string;
//   to: undefined | string;
// };
function DateSelector({ cabin, settings, bookedDates }: DateSelectorTypes) {
  const { range, setRange, resetRange } = useReservation();

  const { regularPrice, discount } = cabin;
  const numNights =
    range.to && range.from && differenceInDays(range.to, range.from);
  const cabinPrice = numNights && numNights * (regularPrice - discount);
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={range}
        onSelect={setRange as OnSelectHandler<DateRange | undefined>}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date(currentYear, 2)}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date: any) => isSameDay(date, curDate))
        }
        endMonth={new Date(currentYear, 15)}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
