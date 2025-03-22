
import { User } from "@/lib/types";
import { Session } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateProgress: (progressUpdates: Partial<User['progress']>) => Promise<void>;
  session: Session | null;
}
