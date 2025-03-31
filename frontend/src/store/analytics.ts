import { create } from 'zustand';
import type { AnalyticsData } from '../services/analytics';
import { analyticsService } from '../services/analytics';

interface AnalyticsStore {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchAnalytics: async () => {
    set({ loading: true });
    try {
      const data = await analyticsService.getRealtimeMetrics();
      set({ data, loading: false, error: null });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch analytics', 
        loading: false,
        data: null
      });
    }
  }
}));