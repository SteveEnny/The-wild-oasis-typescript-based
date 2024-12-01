"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange, OnSelectHandler } from "react-day-picker";

type dataState = { from: any | undefined; to: any | undefined };

interface dateType {
  range: DateRange;
  // range: any;
  setRange: React.Dispatch<React.SetStateAction<DateRange>>;
  // setRange: OnSelectHandler<DateRange | undefined>;
  resetRange: () => void;
}

const ReservationContext = createContext<dateType | undefined>(undefined);

const initalState: DateRange = { from: undefined, to: undefined };
export function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange>(initalState);
  const resetRange = () => setRange(initalState);
  //   const ctx: dateType = { range, setRange };
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("context was use outside the provider");
  return context;
}

// export { ReservationProvider, useReservation };
