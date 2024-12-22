import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./config/axios";
import { cookies } from "next/headers";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string; // Add additional fields here
    phone_number?: string;
    type?: string;
    full_name?: string,
    profileImage?: string,
    isAvailable?: string,

  }

  interface Session {
    user: {
      id?: string;
      full_name?: string,
      phone_number?: string;
      type?: string;
      profileImage?: string;
      isAvailable?: string;
    } & DefaultUser;
  }

  // If you use JWT for session management
  interface JWT {
    id?: string;
    phone_number?: string;
    type?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const credentialDetails = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const response = await axiosInstance.post(
            "/api/users/sign-in",
            credentialDetails,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          const user = response.data;

          if (user.success) {
            cookies().set("cookie-token", user.body.token, {
              expires: new Date(Date.now() + 60 * 60 * 10000)
            });
            return {
              id: user.body.user._id,
              email: user.body.user.email,
              name: user.body.user.full_name,
              profileImage: user.body.user.profileImage,
              type: user.body.user.type,
              isAvailable: user.body.user.isAvailable
            };
          } else {
            // console.log("check your credentials");

            throw new Error("Invalid credentials");
          }
        } catch (error: any) {
          throw new Error(`${error.response.data.error ? error.response.data.error : "Invalid credentials"}`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 30 * 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("🚀 ~ jwt ~ user:", user)
      console.log("🚀 ~ jwt ~ session:", session)
      console.log("🚀 ~ jwt ~ trigger:", trigger)
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.profile = session.user.image;
        token.available = session.user.isAvailable;
      }
      if (user) {
        console.log("🚀 ~ jwt ~ user:", user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.available = user.isAvailable;
        token.type = user.type;
        token.profile = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("🚀 ~ session ~ token:", token)
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          type: token.type as string,
          image: token.profile as string,
          isAvailable: token.available as string,
        };
      }
      return session;
    },
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
