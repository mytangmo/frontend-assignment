import { api } from "@/lib/eden";

export async function getCart() {
  const { data, error } = await api.cart.get();

  if (error) {
    throw new Error("Unable to load cart");
  }

  return data;
}

export async function addCartItem(productId: string, quantity = 1) {
  const { data, error } = await api.cart.items.post({
    productId,
    quantity,
  });

  if (error) {
    throw new Error("Unable to add product to cart");
  }

  return data;
}

export async function updateCartItem(itemId: string, quantity: number) {
  const { data, error } = await api.cart.items({ id: itemId }).patch({
    quantity,
  });

  if (error) {
    throw new Error("Unable to update cart item");
  }

  return data;
}

export async function removeCartItem(itemId: string) {
  const { data, error } = await api.cart.items({ id: itemId }).delete();

  if (error) {
    throw new Error("Unable to remove cart item");
  }

  return data;
}

export async function checkoutCart() {
  const { data, error } = await api.cart.checkout.post();

  if (error) {
    throw new Error("Unable to checkout cart");
  }

  return data;
}


