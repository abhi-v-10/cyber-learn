
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types";

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextType;
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
