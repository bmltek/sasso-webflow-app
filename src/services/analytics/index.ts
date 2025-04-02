import { createClient } from '@supabase/supabase-js';
import { env } from '../env';

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

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
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      return data || defaultAnalytics;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      return defaultAnalytics;
    }
  },

  async trackEvent(eventName: string, metadata: Record<string, any>) {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!data.user) {
        console.warn('No authenticated user found, skipping event tracking');
        return;
      }

      const { error: insertError } = await supabase
        .from('events')
        .insert([
          {
            event_name: eventName,
            metadata,
            timestamp: new Date().toISOString(),
            user_id: data.user.id
          }
        ]);

      if (insertError) throw insertError;
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }
};