import { getBookedDatesByCabinId, getCabin } from "@/app/_lb/data-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ cabinId: number }> }
) {
  const cabinId = (await params).cabinId;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
  console.log(params);
}
