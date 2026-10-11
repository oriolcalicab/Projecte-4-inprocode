import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../useAuth";

function getLoginErrorMessage(error: unknown): string {
  const code = error instanceof FirebaseError ? error.code : "";

  if (
    code === "auth/invalid-credential" ||
    code === "auth/user-not-found" ||
    code === "auth/wrong-password"
  ) {
    return "Correu o contrasenya incorrectes.";
  }
  if (code === "auth/too-many-requests") {
    return "Massa intents. Torna-ho a provar d'aquí una estona.";
  }
  if (code === "auth/network-request-failed") {
    return "No hi ha connexió. Revisa la teva xarxa.";
  }
  return "No s'ha pogut iniciar sessió.";
}

export function LoginPage() {
  const { user, loading, login } = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
  const from = (location.state as { from?: string } | null)?.from ?? "/";


  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Escriu el correu.");
      return;
    }
    if (!password) {
      setError("Escriu la contrasenya.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Inprocode</h1>
        <p className="text-sm text-gray-600">Entra al panell d'administració</p>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Correu
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Contrasenya
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          {submitting ? "Entrant..." : "Entra"}
        </button>
      </form>
    </div>
  );
}