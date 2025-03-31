import axios from 'axios';

const API_URL = import.meta.env.VITE_ANALYTICS_API_URL || '/api/analytics';

export interface AnalyticsData {
  sessionDuration: string;
  percentageIncrease: number;
  chartData: number[];
  conversionRate: number;
}

const defaultAnalytics: AnalyticsData = {
  sessionDuration: '0m 0s',
  percentageIncrease: 0,
  chartData: [0, 0, 0, 0, 0, 0, 0],
  conversionRate: 0
};

export const analyticsService = {
  async getRealtimeMetrics(): Promise<AnalyticsData> {
    try {
      const { data } = await axios.get(`${API_URL}/metrics`);
      return data || defaultAnalytics;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      return defaultAnalytics;
    }
  },

  async trackEvent(eventName: string, metadata: Record<string, any>) {
    try {
      const response = await axios.post(`${API_URL}/events`, {
        event_name: eventName,
        metadata
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data) {
        throw new Error('No response from analytics service');
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to track event:', error);
      throw error;
    }
  }
};