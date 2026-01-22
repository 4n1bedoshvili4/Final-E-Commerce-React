import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * Cart item shape:
 * { id, title, price, image, qty }
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("cart_items", []);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === product.id);
      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  const setQty = (id, qty) => {
    const safeQty = Math.max(1, Number(qty) || 1);
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: safeQty } : x)));
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, x) => sum + x.qty * x.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, count, total }),
    [items, count, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
