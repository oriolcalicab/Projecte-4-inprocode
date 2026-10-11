import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <span className="font-bold">Inprocode</span>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-gray-600 sm:inline">{user?.email}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
          >
            Tanca sessió
          </button>
        </div>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}