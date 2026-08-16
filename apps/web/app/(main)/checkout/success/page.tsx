import Link from "next/link";
import { FiCheck } from "react-icons/fi";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{
    orderId?: string | string[];
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const orderId =
    typeof params.orderId === "string" ? params.orderId : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 pt-28">
      <section className="w-full max-w-xl rounded-[20px] border border-black/10 p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
          <FiCheck size={32} aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Order confirmed</h1>
        <p className="mt-3 text-black/60">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {orderId ? (
          <div className="mt-6 rounded-xl bg-black/5 p-4">
            <p className="text-sm text-black/60">Order ID</p>
            <p className="mt-1 break-all font-semibold">{orderId}</p>
          </div>
        ) : (
          <p className="mt-6 text-sm text-red-500">
            Order ID is unavailable.
          </p>
        )}

        <Link
          href="/catalog"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-black/80"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
