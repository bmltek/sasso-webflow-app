import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
}

export const metricsService = {
  async getMetrics(): Promise<Metric[]> {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async subscribeToMetrics(callback: (metric: Metric) => void) {
    const channel = supabase
      .channel('metrics')
      .on('INSERT', (payload) => {
        callback(payload.new as Metric);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};