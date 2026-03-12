-- =============================================
-- BIN — Seed Categories
-- =============================================
INSERT INTO public.categories (name, slug, icon, description) VALUES
  ('Electronics',     'electronics',    'Zap',         'TVs, cameras, audio, accessories'),
  ('Mobiles',         'mobiles',        'Smartphone',  'Phones, tablets, smartwatches'),
  ('Bikes',           'bikes',          'Bike',        'Motorcycles, bicycles, scooters'),
  ('Furniture',       'furniture',      'Sofa',        'Chairs, tables, beds, storage'),
  ('Computers',       'computers',      'Monitor',     'Laptops, desktops, peripherals'),
  ('Fashion',         'fashion',        'Shirt',       'Clothing, shoes, bags, jewellery'),
  ('Home Appliances', 'home-appliances','WashingMachine','Kitchen, laundry, cooling, heating'),
  ('Books',           'books',          'BookOpen',    'Textbooks, novels, magazines'),
  ('Gaming',          'gaming',         'Gamepad2',    'Consoles, games, accessories'),
  ('Others',          'others',         'Package',     'Anything else')
ON CONFLICT (slug) DO NOTHING;