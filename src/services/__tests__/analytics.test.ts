import { supabaseMock } from '../__mocks__/supabase';
import { analyticsService } from '../analytics';

// Mock environment variables
jest.mock('../env', () => ({
  env: {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-anon-key'
  }
}));

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: () => supabaseMock
}));

describe('Analytics Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRealtimeMetrics', () => {
    it('returns analytics data when successful', async () => {
      const mockData = {
        sessionDuration: '5m 30s',
        percentageIncrease: 15,
        chartData: [10, 20, 30, 40, 50, 60, 70],
        conversionRate: 2.5
      };

      supabaseMock.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: mockData, error: null })
      });

      const result = await analyticsService.getRealtimeMetrics();

      expect(result).toEqual(mockData);
      expect(supabaseMock.from).toHaveBeenCalledWith('analytics');
      expect(supabaseMock.from().select).toHaveBeenCalledWith('*');
      expect(supabaseMock.from().order).toHaveBeenCalledWith('created_at', { ascending: false });
      expect(supabaseMock.from().limit).toHaveBeenCalledWith(1);
      expect(supabaseMock.from().maybeSingle).toHaveBeenCalled();
    });

    it('returns default analytics when error occurs', async () => {
      supabaseMock.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') })
      });

      const result = await analyticsService.getRealtimeMetrics();

      expect(result).toEqual({
        sessionDuration: '0m 0s',
        percentageIncrease: 0,
        chartData: [0, 0, 0, 0, 0, 0, 0],
        conversionRate: 0
      });
    });

    it('returns default analytics when data is null', async () => {
      supabaseMock.from.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockResolvedValue({ data: null, error: null })
      });

      const result = await analyticsService.getRealtimeMetrics();

      expect(result).toEqual({
        sessionDuration: '0m 0s',
        percentageIncrease: 0,
        chartData: [0, 0, 0, 0, 0, 0, 0],
        conversionRate: 0
      });
    });
  });

  describe('trackEvent', () => {
    it('tracks event successfully when user is authenticated', async () => {
      const mockUser = { id: 'test-user-id' };
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      
      supabaseMock.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: null })
      });

      const eventName = 'test_event';
      const metadata = { test: 'data' };

      await analyticsService.trackEvent(eventName, metadata);

      expect(supabaseMock.auth.getUser).toHaveBeenCalled();
      expect(supabaseMock.from).toHaveBeenCalledWith('events');
      expect(supabaseMock.from().insert).toHaveBeenCalledWith([{
        event_name: eventName,
        metadata,
        timestamp: expect.any(String),
        user_id: mockUser.id
      }]);
    });

    it('skips event tracking when no user is authenticated', async () => {
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });

      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      await analyticsService.trackEvent('test_event', {});

      expect(consoleWarn).toHaveBeenCalledWith('No authenticated user found, skipping event tracking');
      expect(supabaseMock.from).not.toHaveBeenCalled();
      consoleWarn.mockRestore();
    });

    it('handles errors gracefully', async () => {
      const mockUser = { id: 'test-user-id' };
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      
      supabaseMock.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: new Error('Database error') })
      });

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      await analyticsService.trackEvent('test_event', {});

      expect(consoleError).toHaveBeenCalledWith('Failed to track event:', expect.any(Error));
      consoleError.mockRestore();
    });

    it('handles auth errors gracefully', async () => {
      supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: new Error('Auth error') });

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      await analyticsService.trackEvent('test_event', {});

      expect(consoleError).toHaveBeenCalledWith('Failed to track event:', expect.any(Error));
      expect(supabaseMock.from).not.toHaveBeenCalled();
      consoleError.mockRestore();
    });
  });
});