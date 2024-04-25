/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <span>Signed in as</span>
        {session.user.image ? (
          <img src={session.user.image} alt="profile picture" />
        ) : (
          <></>
        )}

        <span>{session.user.email}</span>
        <br />
        <button className="btn btn-blue" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-blue" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
