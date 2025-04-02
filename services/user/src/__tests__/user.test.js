const request = require('supertest');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Mock Supabase client
const mockSupabase = {
  auth: {
    getUser: jest.fn()
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn()
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabase)
}));

const app = express();
app.use(cors());
app.use(express.json());

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns user profile when authenticated', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      created_at: '2024-03-31T15:00:00Z'
    };

    mockSupabase.auth.getUser.mockResolvedValue({ user: { id: '123' } });
    mockSupabase.single.mockResolvedValue({ data: mockUser, error: null });

    const response = await request(app)
      .get('/profile')
      .expect(200);

    expect(response.body).toEqual(mockUser);
    expect(mockSupabase.from).toHaveBeenCalledWith('profiles');
    expect(mockSupabase.select).toHaveBeenCalled();
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', '123');
  });

  it('returns 401 when not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ user: null });

    await request(app)
      .get('/profile')
      .expect(401);
  });
});