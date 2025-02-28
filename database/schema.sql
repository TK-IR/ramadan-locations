
-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  time TEXT NOT NULL,
  rakaat INTEGER NOT NULL,
  has_womens_area BOOLEAN NOT NULL DEFAULT false,
  has_wudu_facilities BOOLEAN NOT NULL DEFAULT false,
  has_parking BOOLEAN NOT NULL DEFAULT false,
  parking_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mosque_name TEXT NOT NULL,
  address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  time TEXT NOT NULL,
  rakaat INTEGER NOT NULL,
  has_womens_area BOOLEAN NOT NULL DEFAULT false,
  has_wudu_facilities BOOLEAN NOT NULL DEFAULT false,
  has_parking BOOLEAN NOT NULL DEFAULT false,
  parking_type TEXT,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Insert initial mock data into locations table
INSERT INTO locations (name, address, suburb, state, time, rakaat, has_womens_area, has_wudu_facilities, has_parking, parking_type)
VALUES
  ('Melbourne Mosque', '765 Racecourse Rd', 'North Melbourne', 'VIC', '8:00 PM', 20, true, true, true, 'Street'),
  ('Islamic Society of Victoria', '90 Cramer Street', 'Preston', 'VIC', '8:15 PM', 20, true, true, true, 'Dedicated'),
  ('Broadmeadows Mosque', '45 King Street', 'Broadmeadows', 'VIC', '7:45 PM', 8, true, true, true, 'Dedicated'),
  ('Meadow Heights Mosque', '20 Waterview Drive', 'Meadow Heights', 'VIC', '8:30 PM', 20, true, true, true, 'Dedicated'),
  ('Werribee Islamic Centre', '19 Duncans Road', 'Werribee', 'VIC', '8:00 PM', 20, true, true, true, 'Street'),
  ('Hoppers Crossing Mosque', '143 Hogans Road', 'Hoppers Crossing', 'VIC', '8:15 PM', 8, false, true, false, null),
  ('Dandenong Mosque', '65 Logis Boulevard', 'Dandenong', 'VIC', '8:15 PM', 20, true, true, true, 'Street'),
  ('Brunswick Mosque', '660 Sydney Road', 'Brunswick', 'VIC', '7:45 PM', 20, true, true, true, 'Street'),
  ('Coburg Mosque', '31 Nicholson Street', 'Coburg', 'VIC', '8:00 PM', 20, true, true, false, null);

-- Insert initial mock data into submissions table
INSERT INTO submissions (mosque_name, address, suburb, state, time, rakaat, has_womens_area, has_wudu_facilities, has_parking, parking_type, submitter_name, submitter_email, status, created_at)
VALUES
  ('Melbourne Mosque', '765 Racecourse Rd', 'North Melbourne', 'VIC', '8:00 PM', 20, true, true, true, 'Street', 'Ahmed Khan', 'ahmed@example.com', 'pending', NOW() - INTERVAL '2 days'),
  ('Sydney Islamic Centre', '15 Baker Street', 'Auburn', 'NSW', '8:30 PM', 8, true, true, false, null, 'Sara Ahmed', 'sara@example.com', 'pending', NOW() - INTERVAL '1 day'),
  ('Preston Mosque', '90 Cramer Street', 'Preston', 'VIC', '8:15 PM', 20, true, true, true, 'Dedicated', 'Mohammad Ali', 'mohammad@example.com', 'approved', NOW() - INTERVAL '3 days');

-- Create Row Level Security (RLS) policies
-- Enable RLS on tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Locations policies
-- Anyone can read locations
CREATE POLICY "Anyone can read locations" 
ON locations FOR SELECT 
USING (true);

-- Only admins can insert, update, delete locations
CREATE POLICY "Admins can insert locations" 
ON locations FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update locations" 
ON locations FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can delete locations" 
ON locations FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Submissions policies
-- Anyone can insert submissions
CREATE POLICY "Anyone can submit locations" 
ON submissions FOR INSERT 
TO anon, authenticated 
WITH CHECK (status = 'pending');

-- Only the creator or an admin can view a submission
CREATE POLICY "Users can view their own submissions" 
ON submissions FOR SELECT 
TO authenticated 
USING (
  submitter_email = auth.email() OR
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Public users can view approved submissions
CREATE POLICY "Public can view approved submissions" 
ON submissions FOR SELECT 
TO anon 
USING (status = 'approved');

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions" 
ON submissions FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Only admins can delete submissions
CREATE POLICY "Admins can delete submissions" 
ON submissions FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Admin users policies
-- Only admins can read admin_users
CREATE POLICY "Admins can read admin_users" 
ON admin_users FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Only admins can insert/update/delete admin_users
CREATE POLICY "Admins can manage admin_users" 
ON admin_users FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  )
);

-- Create a function to add a new admin
CREATE OR REPLACE FUNCTION add_admin_user(email TEXT)
RETURNS VOID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Get the user ID from the provided email
  SELECT id INTO user_id
  FROM auth.users
  WHERE auth.users.email = add_admin_user.email;
  
  -- Check if the user exists
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', email;
  END IF;
  
  -- Insert the user as an admin if they're not already one
  INSERT INTO admin_users (user_id)
  VALUES (user_id)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
