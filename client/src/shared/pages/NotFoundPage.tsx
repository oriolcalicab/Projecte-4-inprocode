import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Pàgina no trobada</h1>
      <Link to="/" className="text-amber-700 underline text-2xl">
        Tornar a l'inici
      </Link>
    </div>
  );
}