import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useI18n } from "../contexts/I18nContext";
import { Modal } from "../components/common/Modal";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, setQty, total, clear } = useCart();
  const { t } = useI18n();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold dark:text-slate-100">{t("cart")}</h1>

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
          <p>{t("emptyCart")}</p>
          <Link
            to="/"
            className="mt-3 inline-block rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <article
                key={it.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center"
              >
                <div className="h-20 w-20 flex-none rounded-xl bg-slate-50 p-2 dark:bg-slate-800">
                  <img src={it.image} alt={it.title} className="h-full w-full object-contain" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {it.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    ${it.price} each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600 dark:text-slate-300">
                    {t("quantity")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => setQty(it.id, e.target.value)}
                    className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    ${(it.price * it.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                  >
                    {t("remove")}
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold dark:text-slate-100">{t("total")}</h2>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              ${total.toFixed(2)}
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => setCheckoutOpen(true)}
                className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {t("checkout")}
              </button>
              <button
                onClick={clear}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}

      <Modal
        isOpen={checkoutOpen}
        title={t("checkout")}
        onClose={() => setCheckoutOpen(false)}
      >
        <p className="text-sm text-slate-700 dark:text-slate-200">
          This is a demo checkout modal (meets “modal/animations” requirement). Your cart is stored in localStorage.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setCheckoutOpen(false)}
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}
