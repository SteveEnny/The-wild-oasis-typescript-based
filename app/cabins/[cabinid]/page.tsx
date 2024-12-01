import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
// import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lb/data-service";
import { cabinsType, cabinType } from "@/types/cabinsTypes";
import { Suspense } from "react";

// export const metadata = {
//   title:
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinid: number }>;
}) {
  const { name } = await getCabin((await params).cabinid);
  return { title: `Cabin ${name}` };
}

// //telling next js ahead time which params exits
export async function generateStaticParams() {
  const cabins: cabinsType[] = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinid: String(cabin.id),
  }));
  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ cabinid: number }>;
}) {
  ///Fetching datas
  const cabin: cabinType = await getCabin((await params).cabinid);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinid);  //
  /// The above meto slows own the application

  // const [] = Promise.all([
  //   getCabin(params.cabinid),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinid),
  // ]);
  // This also is better but still slos down the application.

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
