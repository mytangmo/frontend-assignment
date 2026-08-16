"use client";

import { useCart } from "@/features/hooks/useCart";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";

type HeaderProps = {
  cartItemCount?: number;
  onSearch?: (value: string) => void;
};

export function Header({ cartItemCount, onSearch }: HeaderProps) {
  const { data: cart } = useCart();

  const displayedCartItemCount = cartItemCount ?? cart?.totalItems ?? 0;
  const [search, setSearch] = useState("");
  const [showPromotion, setShowPromotion] = useState(true);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(search.trim());
  };

  return (
    <header className="bg-white fixed w-screen z-100">
      {showPromotion && (
        <div className="relative flex min-h-9 items-center justify-center bg-black px-10 text-center text-xs text-white sm:text-sm">
          <p>
            Sign up and get 20% off your first order.{" "}
            <Link className="font-medium underline" href="#">
              Sign Up Now
            </Link>
          </p>

          <button
            type="button"
            aria-label="Close promotion"
            className="absolute right-4 grid size-8 place-items-center"
            onClick={() => setShowPromotion(false)}
          >
            <FiX size={20} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-310 px-4">
        <nav
          className="flex h-20 items-center gap-3 border-b border-gray-200"
          aria-label="Main navigation"
        >
          <button
            type="button"
            aria-label="Open menu"
            className="grid size-10 place-items-center md:hidden"
          >
            <FiMenu size={23} aria-hidden="true" />
          </button>

          <Link
            href="/"
            className="shrink-0 text-2xl font-black tracking-tight sm:text-3xl"
          >
            SHOP.CO
          </Link>

          <form
            role="search"
            className="ml-6 hidden flex-1 md:block"
            onSubmit={handleSubmit}
          >
            <label className="relative block">
              <span className="sr-only">Search products</span>

              <FiSearch
                size={21}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="search"
                value={search}
                placeholder="Search for products..."
                className="h-12 w-full rounded-full bg-gray-100 pl-12 pr-5 text-sm outline-none transition focus:ring-2 focus:ring-black"
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </form>

          <div className="ml-auto flex items-center">
            <button
              type="button"
              aria-label="Search products"
              aria-expanded={showMobileSearch}
              className="grid size-10 place-items-center md:hidden"
              onClick={() => setShowMobileSearch((current) => !current)}
            >
              <FiSearch size={21} aria-hidden="true" />
            </button>

            <Link
              href="/cart"
              aria-label={`Shopping cart with ${displayedCartItemCount} items`}
              className="relative grid size-10 place-items-center"
            >
              <FiShoppingCart size={22} aria-hidden="true" />

              {displayedCartItemCount > 0 && (
                <span className="absolute right-0 top-0 grid min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] leading-5 text-white">
                  {displayedCartItemCount > 99 ? "99+" : displayedCartItemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="User account"
              className="grid size-10 place-items-center"
            >
              <FiUser size={22} aria-hidden="true" />
            </button>
          </div>
        </nav>

        {showMobileSearch && (
          <form
            role="search"
            className="border-b border-gray-200 py-3 md:hidden"
            onSubmit={handleSubmit}
          >
            <label className="relative block">
              <span className="sr-only">Search products</span>

              <FiSearch
                size={20}
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                autoFocus
                type="search"
                value={search}
                placeholder="Search for products..."
                className="h-11 w-full rounded-full bg-gray-100 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-black"
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </form>
        )}
      </div>
    </header>
  );
}
