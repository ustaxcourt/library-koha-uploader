import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>United States Tax Court Library</h1>

        <UploadForm />
      </div>
    </main>
  );
}
