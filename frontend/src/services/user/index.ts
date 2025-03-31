import axios from 'axios';

const API_URL = import.meta.env.VITE_USER_API_URL;

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export const userService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await axios.get(`${API_URL}/profile`);
      return data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  async updateUserProfile(profile: Partial<User>) {
    try {
      await axios.patch(`${API_URL}/profile`, profile);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
};