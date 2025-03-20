"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./Button";

export default function Component() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="py-4 flex flex-col space-y-4">
        <span className="font-thin">Signed in as</span>

        <div className="flex flex-row space-x-3 items-center">
          <div>
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="profile picture"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <></>
            )}
          </div>

          <div className="align-baseline">{session.user.email}</div>
        </div>

        <div>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
