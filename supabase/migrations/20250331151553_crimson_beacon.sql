/*
  # Create messages table for real-time chat

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `content` (text)
      - `sender` (text)
      - `timestamp` (timestamptz)
      - `image` (text, optional)

  2. Security
    - Enable RLS on `messages` table
    - Add policies for authenticated users to read and insert messages
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  sender text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  image text
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);