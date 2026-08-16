"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/features/api/cart";
import {
  AddCartItemVariables,
  UpdateCartItemVariables,
} from "@/types/cart.type";

export const CART_QUERY_KEY = ["cart"] as const;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function useCart() {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const [cart] = await Promise.all([getCart(), delay(1000)]);

      return cart;
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, quantity }: UpdateCartItemVariables) =>
      updateCartItem(itemId, quantity),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: AddCartItemVariables) =>
      addCartItem(productId, quantity),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
}
