import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { useI18n } from "../contexts/I18nContext";

function linkClass({ isActive }) {
  return [
    "rounded-lg px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  ].join(" ");
}

export default function Header() {
  const { count } = useCart();
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-base font-bold tracking-tight dark:text-slate-100">
          MiniShop
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            {t("home")}
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            {t("cart")}
            <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
              {count}
            </span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {t("theme")}: {theme === "dark" ? t("dark") : t("light")}
          </button>

          <button
            onClick={() => setLang(lang === "ka" ? "en" : "ka")}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            aria-label="Toggle language"
          >
            {t("language")}: {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
