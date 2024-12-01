import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

// Thi file is for Next AUTH.js configuration
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }: any) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user; // auth is the data provided from the provider like goggle or gitHub
    },
    async signIn(
      { user, account, profile }: any // { //   user: {email: string, name : string, image: string};
    ) //   account: string;
    //   profile: string;
    // }
    {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }: any) {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
