// import Counter from "@app/_components/Counter";
// import Navigation from "../_components/Navigation";

import { cabinsType } from "@/types/cabinsTypes";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Filter from "../_components/Filter";
import Spinner from "../_components/Spinner";
import ReservationReminder from "../_components/ReservationReminder";

type SearchParams = { [key: string]: string | string[] | undefined };
export const revalidate = 1800; // need to be alwasy in seconds

export const metadata = {
  title: "Cabind",
};

type Filter = { capacity: "all" | "small" | "large" | "medium" };
export default function Page({ searchParams }: { searchParams: Filter }) {
  // CHANGE
  const filter = searchParams?.capacity ?? "all";
  console.log(filter);
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
