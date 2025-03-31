/*
  # Create analytics tables

  1. New Tables
    - `analytics`
      - `id` (uuid, primary key)
      - `session_duration` (text)
      - `percentage_increase` (integer)
      - `chart_data` (jsonb)
      - `conversion_rate` (integer)
      - `created_at` (timestamp)
    
    - `events`
      - `id` (uuid, primary key)
      - `event_name` (text)
      - `metadata` (jsonb)
      - `timestamp` (timestamp)
      - `user_id` (uuid, references auth.users)

    - `metrics`
      - `id` (uuid, primary key)
      - `name` (text)
      - `value` (numeric)
      - `unit` (text)
      - `timestamp` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_duration text NOT NULL,
  percentage_increase integer NOT NULL,
  chart_data jsonb NOT NULL,
  conversion_rate integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read analytics"
  ON analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL,
  unit text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own metrics"
  ON metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);