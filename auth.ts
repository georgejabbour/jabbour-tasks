import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import { exchangeToken } from "./lib/taskHelpers"
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 57664,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const providers: Provider[] = [
  Google,
]
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }): Promise<string | boolean> {
      // console.log("signIn callbacks", { user, account, profile, email, credentials });
      return true;
    },
    async session({ session, token, user }): Promise<any> {
      session.user.id = user.id
      // console.log("session callbacks", { session, token, user });
      return session
    }
  }
})