import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

jest.mock('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

describe('User Service', () => {
  beforeEach(() => {
    createClient.mockClear();
  });

  it('returns user profile when authenticated', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      created_at: '2024-03-31T15:00:00Z'
    };

    createClient.mockImplementation(() => ({
      auth: {
        getUser: jest.fn().mockResolvedValue({ user: { id: '123' } })
      },
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockUser, error: null })
          })
        })
      })
    }));

    const response = await request(app)
      .get('/profile')
      .expect(200);

    expect(response.body).toEqual(mockUser);
  });

  it('returns 401 when not authenticated', async () => {
    createClient.mockImplementation(() => ({
      auth: {
        getUser: jest.fn().mockResolvedValue({ user: null })
      }
    }));

    await request(app)
      .get('/profile')
      .expect(401);
  });
});