
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/lib/types";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

export const fetchUserProfile = async (userId: string, session: Session | null): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      // Extract progress from metadata if it exists, otherwise use default values
      const metadata = data.metadata as Record<string, any> || {};
      const progress = metadata.progress || {
        completedCourses: [],
        completedQuizzes: [],
        loginStreak: 0,
        lastLogin: new Date(),
        points: 0,
        level: 1,
        title: "Rookie"
      };

      return {
        id: userId,
        email: session?.user?.email || '',
        name: data.name || '',
        username: data.username,
        avatarUrl: data.avatar_url,
        createdAt: session?.user?.created_at ? new Date(session.user.created_at) : new Date(),
        progress
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }
    
    return data;
  } catch (error: any) {
    toast.error(error.message || 'Failed to sign in');
    throw error;
  }
};

export const registerUser = async (email: string, password: string, username: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (error) {
      throw error;
    }
    
    return data;
  } catch (error: any) {
    toast.error(error.message || 'Failed to create account');
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error: any) {
    toast.error(error.message || 'Failed to sign out');
    throw error;
  }
};
