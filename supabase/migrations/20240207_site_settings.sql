-- Site Settings Table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  logo_letter TEXT DEFAULT 'M',
  company_name TEXT DEFAULT 'Messiah Safari',
  company_tagline TEXT DEFAULT '& Tours',
  company_description TEXT DEFAULT 'East Africa''s premier safari operator, crafting unforgettable wildlife and cultural experiences across Rwanda, Uganda, Kenya, Tanzania, and Burundi since 2009.',
  phone TEXT DEFAULT '+250 123 456 789',
  email TEXT DEFAULT 'info@messiahsafari.com',
  address TEXT DEFAULT 'KG 123 St, Kigali, Rwanda',
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (logo_letter, company_name, company_tagline, company_description, phone, email, address) VALUES
('M', 'Messiah Safari', '& Tours', 'East Africa''s premier safari operator, crafting unforgettable wildlife and cultural experiences across Rwanda, Uganda, Kenya, Tanzania, and Burundi since 2009.', '+250 123 456 789', 'info@messiahsafari.com', 'KG 123 St, Kigali, Rwanda');
