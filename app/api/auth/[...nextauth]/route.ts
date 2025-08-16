import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials", 
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
  async authorize(credentials: Record<string, string> | undefined) {
        // TEMP: Replace this with DB lookup later
        const user = { id: "1", email: "test@example.com", passwordHash: await bcrypt.hash("password123", 10) };

        if (!credentials) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (isValid && credentials.email === user.email) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
