import { createClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'jest';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(),
        data: [{ id: 1, name: 'Test' }],
        error: null
      })),
      insert: vi.fn(() => ({
        data: { id: 1 },
        error: null
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: { id: 1, name: 'Updated' },
          error: null
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null
        }))
      }))
    })),
    auth: {
      signIn: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn()
    }
  }))
}));

describe('Supabase Service', () => {
  let supabase;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    supabase = createClient('test-url', 'test-key');
  });

  describe('Authentication', () => {
    it('handles sign in successfully', async () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      await supabase.auth.signIn(mockCredentials);
      expect(supabase.auth.signIn).toHaveBeenCalledWith(mockCredentials);
    });

    it('handles sign out successfully', async () => {
      await supabase.auth.signOut();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('Data Operations', () => {
    it('fetches data successfully', async () => {
      const response = await supabase
        .from('test-table')
        .select('*');

      expect(response.data).toBeDefined();
      expect(response.error).toBeNull();
    });

    it('inserts data successfully', async () => {
      const newData = { name: 'Test Item' };
      const response = await supabase
        .from('test-table')
        .insert(newData);

      expect(response.data).toBeDefined();
      expect(response.error).toBeNull();
    });

    it('updates data successfully', async () => {
      const updateData = { name: 'Updated Item' };
      const response = await supabase
        .from('test-table')
        .update(updateData)
        .eq('id', 1);

      expect(response.data).toBeDefined();
      expect(response.error).toBeNull();
    });

    it('deletes data successfully', async () => {
      const response = await supabase
        .from('test-table')
        .delete()
        .eq('id', 1);

      expect(response.error).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('handles network errors', async () => {
      // Mock a network error
      vi.spyOn(supabase.from('test-table'), 'select').mockImplementationOnce(() => {
        throw new Error('Network Error');
      });

      try {
        await supabase.from('test-table').select('*');
      } catch (error) {
        expect(error.message).toBe('Network Error');
      }
    });

    it('handles authentication errors', async () => {
      // Mock an auth error
      vi.spyOn(supabase.auth, 'signIn').mockImplementationOnce(() => {
        throw new Error('Invalid credentials');
      });

      try {
        await supabase.auth.signIn({
          email: 'test@example.com',
          password: 'wrong-password'
        });
      } catch (error) {
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
}); 