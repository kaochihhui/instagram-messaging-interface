import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginToInstagram } from "@/lib/agentql"
import { log } from "@/lib/logger"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Instagram',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required")
        }
        
        try {
          const result = await loginToInstagram(credentials.username, credentials.password)
          if (result.success) {
            return { 
              id: credentials.username, 
              name: credentials.username,
              email: `${credentials.username}@example.com`
            }
          }
          throw new Error(result.error || "Invalid username or password")
        } catch (error) {
          log('error', 'Authentication error', { username: credentials.username, error: (error as Error).message })
          throw new Error((error as Error).message || "An unexpected error occurred")
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }