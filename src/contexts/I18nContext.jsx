import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const I18nContext = createContext(null);

const DICT = {
  en: {
    home: "Home",
    cart: "Cart",
    products: "Products",
    addToCart: "Add to cart",
    remove: "Remove",
    quantity: "Quantity",
    emptyCart: "Your cart is empty.",
    continueShopping: "Continue shopping",
    total: "Total",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    price: "Price",
    view: "View",
    checkout: "Checkout (demo)",
    loading: "Loading…",
    error: "Something went wrong. Please try again.",
  },
  ka: {
    home: "მთავარი",
    cart: "კალათა",
    products: "პროდუქტები",
    addToCart: "კალათაში დამატება",
    remove: "წაშლა",
    quantity: "რაოდენობა",
    emptyCart: "კალათა ცარიელია.",
    continueShopping: "შოპინგის გაგრძელება",
    total: "ჯამი",
    theme: "თემა",
    light: "ღია",
    dark: "მუქი",
    language: "ენა",
    price: "ფასი",
    view: "ნახვა",
    checkout: "გადახდა (დემო)",
    loading: "იტვირთება…",
    error: "დაფიქსირდა შეცდომა. სცადეთ თავიდან.",
  },
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage("lang", "ka");

  const value = useMemo(() => {
    const t = (key) => DICT[lang]?.[key] ?? DICT.en[key] ?? key;
    return { lang, setLang, t };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
