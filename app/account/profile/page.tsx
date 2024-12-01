import ProfileForm from "@/app/_components/ProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { auth } from "@/app/_lb/auth";
import { getGuest } from "@/app/_lb/data-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email as string);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <ProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </ProfileForm>
    </div>
  );
}
