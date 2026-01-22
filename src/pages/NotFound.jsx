import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold dark:text-slate-100">404</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Page not found.</p>
      <Link to="/" className="mt-4 inline-block text-sm underline">
        Go home
      </Link>
    </div>
  );
}
