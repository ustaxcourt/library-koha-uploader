"use client";

import LoginButton from "@/components/LoginButton";
import UploadForm from "@/components/UploadForm";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="flex-col">
            <h1 className="text-xl my-3">United States Tax Court Library</h1>
            <LoginButton />
          </div>
          <UploadForm />
        </div>
      </main>
    </SessionProvider>
  );
}
