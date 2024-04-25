import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    preferred_username: string;
    name: string;
    oid: string;
  }

  interface Account {
    provider: "azure-ad";
    type: "oauth";
    providerAccountId: string;
    token_type: "Bearer";
    scope: string;
    expires_at: number;
    access_token: string;
    id_token: string;
    session_state: string;
  }


  interface User {
    id: string;
    name: string;
  }
}
