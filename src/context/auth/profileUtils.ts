
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/lib/types";
import { toast } from "sonner";

export const updateUserProfile = async (user: User, updates: Partial<User>) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        username: updates.username,
        avatar_url: updates.avatarUrl,
        updated_at: new Date().toISOString() // Convert Date to string for storing in database
      })
      .eq('id', user.id);

    if (error) {
      throw error;
    }

    toast.success('Profile updated successfully');
    return { ...user, ...updates };
  } catch (error: any) {
    toast.error(error.message || 'Failed to update profile');
    throw error;
  }
};

export const updateUserProgress = async (user: User, progressUpdates: Partial<User['progress']>) => {
  try {
    // Create the updated progress object
    const updatedProgress = {
      ...user.progress,
      ...progressUpdates
    };
    
    // Update the progress in the database
    const { error } = await supabase
      .from('profiles')
      .update({
        progress: updatedProgress
      })
      .eq('id', user.id);
      
    if (error) {
      throw error;
    }
    
    toast.success('Progress updated successfully');
    return {
      ...user,
      progress: updatedProgress
    };
  } catch (error: any) {
    toast.error(error.message || 'Failed to update progress');
    throw error;
  }
};
