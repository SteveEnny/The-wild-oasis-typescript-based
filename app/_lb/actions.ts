"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

////////////////////////////////////////

export async function updateGuest(formData: FormData) {
  // console.log(formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in"); // It's a common practice in server actions not to use a try catch declaration but instead we simply throw error right here

  const nationalID = formData.get("nationalID") as string;
  const nationalityEntry = formData.get("nationality") as string;
  // if (typeof nationalityEntry === "string") {
  //   const [nationality, countryFlag] = nationalityEntry.split("%");
  // }
  const [nationality, countryFlag] = nationalityEntry.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  ////////
  const updateDate = { nationality, countryFlag, nationalID };
  console.log(session.user?.id);

  //////
  const { data, error } = await supabase
    .from("guests")
    .update(updateDate)
    .eq("id", session.user?.id);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");

  // return data;
}

//////////////////////////////////////////

export async function createReservaton(bookingData: any, formData: FormData) {
  console.log(bookingData, formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Object.entries(formData.entries());
  const newBooking = {
    ...bookingData,
    guestId: session.user?.id,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

///////////////////////////////
export async function deleteReservation(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  /////////
  const guestBookings = await getBookings(session.user?.id as string);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  ////////
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  //////////
  revalidatePath("/account/reservations");
  /// Alternative revalidateTag
}

/////////////////////////////////////
export async function updateReservation(formData: FormData) {
  // console.log(formData)
  const bookingId = Number(formData.get("bookingId"));
  // 1. Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Authorization
  const guestBookings = await getBookings(session.user?.id as string);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3. BUilding update data
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updateData = {
    numGuests: Number(numGuests),
    observations: observations?.slice(0, 1000),
  };

  //////////

  ///////////
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  // redirecting
  redirect("/account/reservations");
}
