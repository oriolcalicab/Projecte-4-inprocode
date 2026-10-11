import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./shared/components/AppLayout";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { OrdersPage } from "./features/orders/pages/OrdersPage"
import { NotFoundPage } from "./shared/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OrdersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}