
import React, { createContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { AuthContextType } from "./types";
import { fetchUserProfile, loginUser, registerUser, logoutUser } from "./authUtils";
import { updateUserProfile, updateUserProgress } from "./profileUtils";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up the auth state listener
  useEffect(() => {
    const setupAuth = async () => {
      try {
        // Check for existing session
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session);
        
        if (sessionData.session?.user) {
          const userData = await fetchUserProfile(sessionData.session.user.id, sessionData.session);
          setUser(userData);
        }
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            if (session?.user) {
              const userData = await fetchUserProfile(session.user.id, session);
              setUser(userData);
            } else {
              setUser(null);
            }
          }
        );
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Auth setup error:", error);
      } finally {
        setLoading(false);
      }
    };

    setupAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await loginUser(email, password);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      await registerUser(email, password, username);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await updateUserProfile(user, updates);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error in updateProfile:", error);
    }
  };

  const updateProgress = async (progressUpdates: Partial<User['progress']>) => {
    if (!user) return;
    
    try {
      const updatedUser = await updateUserProgress(user, progressUpdates);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error in updateProgress:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        updateProgress,
        session
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
