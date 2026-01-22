import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/api";
import { useI18n } from "../contexts/I18nContext";

export default function Home() {
  const { t } = useI18n();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setStatus("loading");
        const data = await fetchProducts();
        if (!mounted) return;
        setProducts(data);
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
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-100">{t("products")}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            API: fakestoreapi.com (Axios)
          </p>
        </div>

        <label className="w-full sm:w-80">
          <span className="sr-only">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </div>

      {status === "loading" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
          {t("loading")}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {t("error")}
        </div>
      )}

      {status === "success" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-slate-800">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain p-6"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                  {t("price")}: <span className="font-semibold">${p.price}</span>
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {p.category}
                  </span>

                  <Link
                    to={`/product/${p.id}`}
                    className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    {t("view")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
