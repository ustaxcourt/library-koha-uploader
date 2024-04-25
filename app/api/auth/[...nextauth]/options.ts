import type { Account, NextAuthOptions, Profile, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider, { AzureADProfile } from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: { scope: "openid profile User.Read" },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  callbacks: {
    async jwt({
      profile,
      token,
      user,
      account,
    }: {
      profile?: Profile;
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      if (account && user) {
        return {
          accessToken: account.access_token,
          idToken: account.id_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          refreshToken: account.refresh_token,
          profile,
          user: {
            ...user,
            email: profile?.preferred_username,
          },
        };
      }

      return token;
    },
    async session(props) {
      const session = props.session;
      const token = props.token;
      // console.log(token);
      // console.log("idtoken", token.idToken);
      console.log("profile", token.profile);
      const { profile } = token;
      if (session) {
        session.user = token.user as {
          email: string;
          name: string;
          image: string;
        };
        // session.user.email = profile.preferred_username;
        // session.nameinfo = decode({
        //
        //
        // });
        // session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
