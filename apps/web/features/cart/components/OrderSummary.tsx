interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  totalDiscount: number;
  total: number;
  isCheckoutPending?: boolean;
  onCheckout?: () => void;
}

const formatCurrency = (value: number) => `$${value}`;

export default function OrderSummary({
  totalItems,
  subtotal,
  totalDiscount,
  total,
  isCheckoutPending = false,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <section className="h-fit rounded-[20px]">
      <h2 className="text-xl font-bold md:text-2xl">Order Summary</h2>

      <dl className="mt-6 space-y-5 border-b border-black/10 pb-5">
        <div className="flex items-center justify-between">
          <dt className="text-black/60">Items</dt>
          <dd className="font-bold">{totalItems}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-black/60">Subtotal</dt>
          <dd className="font-bold">{formatCurrency(subtotal)}</dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-black/60">Discount</dt>
          <dd className="font-bold text-[#FF3333]">
            -{formatCurrency(totalDiscount)}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between py-5">
        <span>Total</span>

        <strong className="text-xl md:text-2xl">{formatCurrency(total)}</strong>
      </div>

      <button
        type="button"
        className="h-12 w-full rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-black/30"
        disabled={isCheckoutPending || !onCheckout}
        onClick={onCheckout}
      >
        {isCheckoutPending ? "Checking out..." : "Go to Checkout"}
      </button>
    </section>
  );
}
