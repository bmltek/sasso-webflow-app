import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 4001;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Configure CORS with specific options
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.get('/metrics', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    const defaultAnalytics = {
      sessionDuration: '0m 0s',
      percentageIncrease: 0,
      chartData: [0, 0, 0, 0, 0, 0, 0],
      conversionRate: 0
    };

    res.json(data || defaultAnalytics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/events', async (req, res) => {
  try {
    const { event_name, metadata } = req.body;
    const { user } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('events')
      .insert([
        {
          event_name,
          metadata,
          timestamp: new Date().toISOString(),
          user_id: user.id
        }
      ]);

    if (error) throw error;
    res.status(201).json({ message: 'Event tracked successfully' });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Analytics service running on port ${port}`);
});