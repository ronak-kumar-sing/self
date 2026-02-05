
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user.email === process.env.USER_EMAIL) {
                return true
            }
            return false
        },
    },
    pages: {
        error: '/admin/login', // Redirect to login page on error
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
