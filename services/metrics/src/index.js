import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 4003;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

app.get('/metrics', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/metrics', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, value, unit } = req.body;
    const { error } = await supabase
      .from('metrics')
      .insert([
        {
          name,
          value,
          unit,
          user_id: user.id
        }
      ]);

    if (error) throw error;
    res.status(201).json({ message: 'Metric created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Metrics service running on port ${port}`);
});