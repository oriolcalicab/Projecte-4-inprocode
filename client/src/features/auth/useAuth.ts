import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth s'ha d'usar dins d'un AuthProvider");
  }

  return context;
}