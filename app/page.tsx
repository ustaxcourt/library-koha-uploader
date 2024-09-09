"use client";

import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import UploadForm from "@/components/UploadForm";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex">
          <div className="flex-col py-10">
            <div>
              <Image
                src="/images/library-books.svg"
                width={100}
                height={100}
                alt="Library books"
              />
            </div>
            <h1 className="text-xl my-3">United States Tax Court Library</h1>
            <LoginButton />
          </div>
          <UploadForm />
        </div>
      </main>
    </SessionProvider>
  );
}
