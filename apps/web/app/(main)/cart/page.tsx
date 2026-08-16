"use client";

import Loading from "@/_components/Loading";
import CartList from "@/features/cart/components/CartList";
import OrderSummary from "@/features/cart/components/OrderSummary";
import {
  useCart,
  useCheckoutCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/hooks/useCart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartScreen() {
  const [checkoutError, setCheckoutError] = useState<string>();
  const router = useRouter();
  const { data: cart, isPending, error } = useCart();

  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const checkoutCart = useCheckoutCart();

  const handleCheckout = () => {
    if (!cart || cart.totalItems === 0) {
      setCheckoutError(
        "Your cart is empty. Add at least one item before checkout.",
      );
      return;
    }

    setCheckoutError(undefined);

    checkoutCart.mutate(undefined, {
      onSuccess: (data) => {
        router.push(
          `/checkout/success?orderId=${encodeURIComponent(data.orderId)}`,
        );
      },

      onError: () => {
        setCheckoutError("Unable to checkout. Please try again.");
      },
    });
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    updateCartItem.mutate({
      itemId,
      quantity,
    });
  };

  const handleRemove = (itemId: string) => {
    removeCartItem.mutate(itemId);
  };

  const updatingItemId = updateCartItem.isPending
    ? updateCartItem.variables?.itemId
    : removeCartItem.isPending
      ? removeCartItem.variables
      : undefined;

  if (isPending) {
    return (
      <main className="relative min-h-screen">
        <Loading label="Loading cart..." delayMs={0} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-40">
        <p className="text-center text-red-500">Unable to load cart.</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {checkoutCart.isPending && (
        <Loading label="Processing checkout..." delayMs={0} />
      )}

      <div className="mx-auto max-w-310 px-4 pt-40">
        <h1 className="mb-6 text-3xl font-bold">Your cart</h1>

        {(updateCartItem.error || removeCartItem.error) && (
          <p className="mb-4 text-sm text-red-500">
            Unable to update cart. Please try again.
          </p>
        )}

        {checkoutError && (
          <p role="alert" className="mb-4 text-sm text-red-500">
            {checkoutError}
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_420px]">
          <CartList
            items={cart?.items ?? []}
            updatingItemId={updatingItemId}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />

          <section className="rounded-[20px] border border-black/10 px-6 py-5 max-h-max">
            <OrderSummary
              totalItems={cart?.totalItems ?? 0}
              subtotal={cart?.subtotal ?? 0}
              totalDiscount={cart?.totalDiscount ?? 0}
              total={cart?.total ?? 0}
              isCheckoutPending={checkoutCart.isPending}
              onCheckout={handleCheckout}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
