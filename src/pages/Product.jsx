import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../contexts/CartContext";
import { useI18n } from "../contexts/I18nContext";
import { Modal } from "../components/common/Modal";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { t } = useI18n();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setStatus("loading");
        const data = await fetchProductById(id);
        if (!mounted) return;
        setProduct(data);
        setStatus("success");
      } catch {
        if (!mounted) return;
        setStatus("error");
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
          {t("loading")}
        </div>
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {t("error")}
        </div>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Link to="/" className="text-sm text-slate-600 underline dark:text-slate-300">
        ← {t("continueShopping")}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          aria-label="Open image modal"
        >
          <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-slate-800">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-8 transition group-hover:scale-[1.02]"
            />
          </div>
        </button>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {product.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {product.category}
          </p>

          <p className="mt-4 text-slate-700 dark:text-slate-200">
            {product.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ${product.price}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              ⭐ {product?.rating?.rate ?? "-"} ({product?.rating?.count ?? 0})
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600 dark:text-slate-300">
                {t("quantity")}
              </label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <button
              onClick={() => addItem(product, Number(qty) || 1)}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              {t("addToCart")}
            </button>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={product.title}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-80 w-full object-contain"
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Click outside or press ESC to close.
        </p>
      </Modal>
    </div>
  );
}
