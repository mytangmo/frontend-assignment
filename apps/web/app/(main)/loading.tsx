import Loading from "@/_components/Loading";

export default function StorefrontLoading() {
  return (
    <main className="relative min-h-screen">
      <Loading label="Loading page..." delayMs={0} />
    </main>
  );
}
