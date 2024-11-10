import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginToInstagram } from "@/lib/agentql"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Instagram',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        
        try {
          const result = await loginToInstagram(credentials.username, credentials.password)
          if (result.success) {
            return { id: credentials.username, name: credentials.username }
          }
          return null
        } catch (error) {
          console.error('Error during authentication:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }