import { supabaseMock } from '../__mocks__/supabase';
import { auth, database } from '../supabase';

// Mock environment variables
jest.mock('../env', () => ({
  env: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key'
  }
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => supabaseMock
}));

describe('Supabase Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Auth', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    it('handles sign in', async () => {
      const mockAuthResponse = { user: { id: '1', email: testEmail } };
      supabaseMock.auth.signInWithPassword.mockResolvedValue({ data: mockAuthResponse, error: null });

      const result = await auth.signIn(testEmail, testPassword);
      expect(result).toEqual(mockAuthResponse);
      expect(supabaseMock.auth.signInWithPassword).toHaveBeenCalledWith({ email: testEmail, password: testPassword });
    });

    it('handles sign in error', async () => {
      const mockError = new Error('Invalid credentials');
      supabaseMock.auth.signInWithPassword.mockResolvedValue({ data: null, error: mockError });

      await expect(auth.signIn(testEmail, testPassword)).rejects.toThrow('Invalid credentials');
    });

    it('handles sign up', async () => {
      const mockAuthResponse = { user: { id: '1', email: testEmail } };
      supabaseMock.auth.signUp.mockResolvedValue({ data: mockAuthResponse, error: null });

      const result = await auth.signUp(testEmail, testPassword);
      expect(result).toEqual(mockAuthResponse);
      expect(supabaseMock.auth.signUp).toHaveBeenCalledWith({ email: testEmail, password: testPassword });
    });

    it('handles sign up error', async () => {
      const mockError = new Error('Email already exists');
      supabaseMock.auth.signUp.mockResolvedValue({ data: null, error: mockError });

      await expect(auth.signUp(testEmail, testPassword)).rejects.toThrow('Email already exists');
    });

    it('handles sign out', async () => {
      supabaseMock.auth.signOut.mockResolvedValue({ error: null });

      await auth.signOut();
      expect(supabaseMock.auth.signOut).toHaveBeenCalled();
    });

    it('handles sign out error', async () => {
      const mockError = new Error('Network error');
      supabaseMock.auth.signOut.mockResolvedValue({ error: mockError });

      await expect(auth.signOut()).rejects.toThrow('Network error');
    });

    it('handles get user', async () => {
      const mockUser = { id: '1', email: testEmail };
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null });

      const result = await auth.getUser();
      expect(result).toEqual(mockUser);
      expect(supabaseMock.auth.getUser).toHaveBeenCalled();
    });

    it('handles get user error', async () => {
      const mockError = new Error('Not authenticated');
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: mockError });

      await expect(auth.getUser()).rejects.toThrow('Not authenticated');
    });
  });

  describe('Database', () => {
    const testTable = 'test-table';
    const testId = '1';
    const testItem = { name: 'Test Item' };

    beforeEach(() => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockReturnThis()
      };
      supabaseMock.from.mockReturnValue(mockQuery);
    });

    it('gets all items', async () => {
      const mockItems = [{ id: 1, name: 'Test' }];
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.select.mockResolvedValue({ data: mockItems, error: null });

      const result = await database.getItems(testTable);
      expect(result).toEqual(mockItems);
      expect(supabaseMock.from).toHaveBeenCalledWith(testTable);
      expect(mockQuery.select).toHaveBeenCalled();
    });

    it('gets item by id', async () => {
      const mockItem = { id: 1, name: 'Test' };
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.select.mockReturnThis();
      mockQuery.eq.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockItem, error: null });

      const result = await database.getItemById(testTable, testId);
      expect(result).toEqual(mockItem);
      expect(supabaseMock.from).toHaveBeenCalledWith(testTable);
      expect(mockQuery.select).toHaveBeenCalled();
      expect(mockQuery.eq).toHaveBeenCalledWith('id', testId);
    });

    it('creates item', async () => {
      const mockCreatedItem = { id: 1, ...testItem };
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.insert.mockReturnThis();
      mockQuery.select.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockCreatedItem, error: null });

      const result = await database.createItem(testTable, testItem);
      expect(result).toEqual(mockCreatedItem);
      expect(supabaseMock.from).toHaveBeenCalledWith(testTable);
      expect(mockQuery.insert).toHaveBeenCalledWith(testItem);
    });

    it('updates item', async () => {
      const mockUpdatedItem = { id: 1, name: 'Updated' };
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.update.mockReturnThis();
      mockQuery.eq.mockReturnThis();
      mockQuery.select.mockReturnThis();
      mockQuery.single.mockResolvedValue({ data: mockUpdatedItem, error: null });

      const result = await database.updateItem(testTable, testId, testItem);
      expect(result).toEqual(mockUpdatedItem);
      expect(supabaseMock.from).toHaveBeenCalledWith(testTable);
      expect(mockQuery.update).toHaveBeenCalledWith(testItem);
      expect(mockQuery.eq).toHaveBeenCalledWith('id', testId);
    });

    it('deletes item', async () => {
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.delete.mockReturnThis();
      mockQuery.eq.mockResolvedValue({ error: null });

      await database.deleteItem(testTable, testId);
      expect(supabaseMock.from).toHaveBeenCalledWith(testTable);
      expect(mockQuery.delete).toHaveBeenCalled();
      expect(mockQuery.eq).toHaveBeenCalledWith('id', testId);
    });

    it('handles database errors', async () => {
      const mockError = new Error('Database error');
      const mockQuery = supabaseMock.from(testTable);
      mockQuery.select.mockResolvedValue({ data: null, error: mockError });

      await expect(database.getItems(testTable)).rejects.toThrow('Database error');
    });

    it('handles missing environment variables', () => {
      jest.resetModules();
      jest.mock('../env', () => ({
        env: {}
      }));

      expect(() => {
        require('../supabase');
      }).toThrow('Missing Supabase environment variables');
    });
  });
}); 