import axios from 'axios';

const API_URL = import.meta.env.VITE_METRICS_API_URL;

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

export const metricsService = {
  async getMetrics(): Promise<Metric[]> {
    try {
      const { data } = await axios.get(`${API_URL}/metrics`);
      return data;
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      throw error;
    }
  },

  async createMetric(metric: Omit<Metric, 'id' | 'timestamp'>) {
    try {
      await axios.post(`${API_URL}/metrics`, metric);
    } catch (error) {
      console.error('Failed to create metric:', error);
      throw error;
    }
  }
};