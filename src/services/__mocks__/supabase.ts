const createMockQuery = () => {
  const query = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis()
  };
  return query;
};

export const supabaseMock = {
  auth: {
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    getUser: jest.fn(),
  },
  from: jest.fn(),
  rpc: jest.fn(),
};

export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  role: 'user',
};

export const mockSession = {
  access_token: 'test-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  user: mockUser,
};

export default supabaseMock; 