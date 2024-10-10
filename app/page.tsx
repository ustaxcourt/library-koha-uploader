"use client";

import UploadForm from "@/components/UploadForm";
import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
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
      <div>{<UploadForm />}</div>
    </SessionProvider>
  );
}
