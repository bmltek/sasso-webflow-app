import { createClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'jest';
import { auth, database } from '../supabase';

// Mock the environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key'
  }
}));

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(),
        single: vi.fn(),
        data: [{ id: 1, name: 'Test' }],
        error: null
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { id: 1 },
            error: null
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({
              data: { id: 1, name: 'Updated' },
              error: null
            }))
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null
        }))
      }))
    }))
  }))
}));

describe('Supabase Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Auth', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    it('handles sign in', async () => {
      const mockAuthResponse = { user: { id: '1', email: testEmail } };
      const mockSignIn = vi.fn().mockResolvedValue({ data: mockAuthResponse, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.auth.signInWithPassword = mockSignIn;

      await expect(auth.signIn(testEmail, testPassword)).resolves.toEqual(mockAuthResponse);
      expect(mockSignIn).toHaveBeenCalledWith({ email: testEmail, password: testPassword });
    });

    it('handles sign up', async () => {
      const mockAuthResponse = { user: { id: '1', email: testEmail } };
      const mockSignUp = vi.fn().mockResolvedValue({ data: mockAuthResponse, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.auth.signUp = mockSignUp;

      await expect(auth.signUp(testEmail, testPassword)).resolves.toEqual(mockAuthResponse);
      expect(mockSignUp).toHaveBeenCalledWith({ email: testEmail, password: testPassword });
    });

    it('handles sign out', async () => {
      const mockSignOut = vi.fn().mockResolvedValue({ error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.auth.signOut = mockSignOut;

      await expect(auth.signOut()).resolves.toBeUndefined();
      expect(mockSignOut).toHaveBeenCalled();
    });

    it('handles get user', async () => {
      const mockUser = { id: '1', email: testEmail };
      const mockGetUser = vi.fn().mockResolvedValue({ data: { user: mockUser }, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.auth.getUser = mockGetUser;

      await expect(auth.getUser()).resolves.toEqual(mockUser);
      expect(mockGetUser).toHaveBeenCalled();
    });
  });

  describe('Database', () => {
    const testTable = 'test-table';
    const testId = '1';
    const testItem = { name: 'Test Item' };

    it('gets all items', async () => {
      const mockItems = [{ id: 1, name: 'Test' }];
      const mockSelect = vi.fn().mockResolvedValue({ data: mockItems, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).select = mockSelect;

      await expect(database.getItems(testTable)).resolves.toEqual(mockItems);
      expect(mockSelect).toHaveBeenCalled();
    });

    it('gets item by id', async () => {
      const mockItem = { id: 1, name: 'Test' };
      const mockSelect = vi.fn().mockResolvedValue({ data: mockItem, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).select = mockSelect;

      await expect(database.getItemById(testTable, testId)).resolves.toEqual(mockItem);
      expect(mockSelect).toHaveBeenCalled();
    });

    it('creates item', async () => {
      const mockCreatedItem = { id: 1, ...testItem };
      const mockInsert = vi.fn().mockResolvedValue({ data: mockCreatedItem, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).insert = mockInsert;

      await expect(database.createItem(testTable, testItem)).resolves.toEqual(mockCreatedItem);
      expect(mockInsert).toHaveBeenCalledWith(testItem);
    });

    it('updates item', async () => {
      const mockUpdatedItem = { id: 1, name: 'Updated' };
      const mockUpdate = vi.fn().mockResolvedValue({ data: mockUpdatedItem, error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).update = mockUpdate;

      await expect(database.updateItem(testTable, testId, testItem)).resolves.toEqual(mockUpdatedItem);
      expect(mockUpdate).toHaveBeenCalledWith(testItem);
    });

    it('deletes item', async () => {
      const mockDelete = vi.fn().mockResolvedValue({ error: null });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).delete = mockDelete;

      await expect(database.deleteItem(testTable, testId)).resolves.toBeUndefined();
      expect(mockDelete).toHaveBeenCalled();
    });

    it('handles database errors', async () => {
      const mockError = new Error('Database error');
      const mockSelect = vi.fn().mockResolvedValue({ data: null, error: mockError });
      const supabase = createClient('test-url', 'test-key');
      supabase.from(testTable).select = mockSelect;

      await expect(database.getItems(testTable)).rejects.toThrow('Database error');
    });
  });
}); 