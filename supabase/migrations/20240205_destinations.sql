-- Drop existing tables if they exist
DROP TABLE IF EXISTS destination_attractions;
DROP TABLE IF EXISTS destinations;

-- Destinations Table
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  image TEXT NOT NULL,
  icon TEXT DEFAULT 'Mountain',
  color TEXT DEFAULT 'from-emerald-600 to-emerald-800',
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Destination Attractions
CREATE TABLE destination_attractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default destinations
INSERT INTO destinations (name, tagline, image, icon, color, display_order) VALUES
('Rwanda', 'Land of a Thousand Hills', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', 'Mountain', 'from-emerald-600 to-emerald-800', 1),
('Uganda', 'Pearl of Africa', 'https://images.unsplash.com/photo-1619451683160-8d896d0b95b6?w=800&q=80', 'TreePine', 'from-green-600 to-green-800', 2),
('Kenya', 'Magical Kenya', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', 'Sun', 'from-amber-600 to-amber-800', 3),
('Tanzania', 'The Soul of Africa', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', 'Bird', 'from-orange-600 to-orange-800', 4),
('Burundi', 'Heart of Africa', 'https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=800&q=80', 'Waves', 'from-teal-600 to-teal-800', 5);

-- Insert attractions for Rwanda
INSERT INTO destination_attractions (destination_id, name, display_order)
SELECT id, 'Mountain Gorillas', 1 FROM destinations WHERE name = 'Rwanda'
UNION ALL
SELECT id, 'Volcanoes National Park', 2 FROM destinations WHERE name = 'Rwanda'
UNION ALL
SELECT id, 'Lake Kivu', 3 FROM destinations WHERE name = 'Rwanda'
UNION ALL
SELECT id, 'Nyungwe Forest', 4 FROM destinations WHERE name = 'Rwanda';

-- Insert attractions for Uganda
INSERT INTO destination_attractions (destination_id, name, display_order)
SELECT id, 'Bwindi Gorillas', 1 FROM destinations WHERE name = 'Uganda'
UNION ALL
SELECT id, 'Queen Elizabeth NP', 2 FROM destinations WHERE name = 'Uganda'
UNION ALL
SELECT id, 'Murchison Falls', 3 FROM destinations WHERE name = 'Uganda'
UNION ALL
SELECT id, 'Kibale Chimps', 4 FROM destinations WHERE name = 'Uganda';

-- Insert attractions for Kenya
INSERT INTO destination_attractions (destination_id, name, display_order)
SELECT id, 'Masai Mara', 1 FROM destinations WHERE name = 'Kenya'
UNION ALL
SELECT id, 'Amboseli National Park', 2 FROM destinations WHERE name = 'Kenya'
UNION ALL
SELECT id, 'Great Rift Valley', 3 FROM destinations WHERE name = 'Kenya'
UNION ALL
SELECT id, 'Diani Beach', 4 FROM destinations WHERE name = 'Kenya';

-- Insert attractions for Tanzania
INSERT INTO destination_attractions (destination_id, name, display_order)
SELECT id, 'Serengeti Migration', 1 FROM destinations WHERE name = 'Tanzania'
UNION ALL
SELECT id, 'Ngorongoro Crater', 2 FROM destinations WHERE name = 'Tanzania'
UNION ALL
SELECT id, 'Mount Kilimanjaro', 3 FROM destinations WHERE name = 'Tanzania'
UNION ALL
SELECT id, 'Zanzibar', 4 FROM destinations WHERE name = 'Tanzania';

-- Insert attractions for Burundi
INSERT INTO destination_attractions (destination_id, name, display_order)
SELECT id, 'Lake Tanganyika', 1 FROM destinations WHERE name = 'Burundi'
UNION ALL
SELECT id, 'Kibira National Park', 2 FROM destinations WHERE name = 'Burundi'
UNION ALL
SELECT id, 'Rusizi Reserve', 3 FROM destinations WHERE name = 'Burundi'
UNION ALL
SELECT id, 'Gitega Culture', 4 FROM destinations WHERE name = 'Burundi';
