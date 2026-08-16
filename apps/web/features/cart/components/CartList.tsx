import { FiFrown } from "react-icons/fi";
import CartItemCard, { type CartListItem } from "./CartItemCard";

interface CartListProps {
  items?: CartListItem[];
  updatingItemId?: string;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

const hasProduct = (
  item: CartListItem,
): item is CartListItem & { product: NonNullable<CartListItem["product"]> } =>
  item.product !== null;

export default function CartList({
  items = [],
  updatingItemId,
  onQuantityChange,
  onRemove,
}: CartListProps) {
  const cartItems = items.filter(hasProduct);

  return (
    <section
      className="rounded-[20px] max-h-max border border-black/10 px-4 md:px-6 "
      aria-label="Cart items"
    >
      {cartItems.length === 0 ? (
        <div className="flex flex-col align-middle min-h-full items-center justify-center py-8 text-center text-sm text-black/50 gap-2">
          <FiFrown size={42} />
          <div>Your cart is empty.</div>
        </div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="border-b border-black/10 last:border-b-0"
            >
              <CartItemCard
                item={item}
                disabled={updatingItemId === item.id}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
