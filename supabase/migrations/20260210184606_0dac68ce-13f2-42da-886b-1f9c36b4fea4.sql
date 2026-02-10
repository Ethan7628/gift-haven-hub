
-- Create categories table
CREATE TABLE public.categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL DEFAULT '🎁',
  count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create occasions table
CREATE TABLE public.occasions (
  id text PRIMARY KEY,
  name text NOT NULL,
  emoji text NOT NULL DEFAULT '🎉',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.occasions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Occasions are publicly readable"
  ON public.occasions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage occasions"
  ON public.occasions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  original_price integer,
  image_url text NOT NULL DEFAULT '/placeholder.svg',
  category text NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  occasion text[] NOT NULL DEFAULT '{}',
  recipient text[] NOT NULL DEFAULT '{}',
  rating numeric(2,1) NOT NULL DEFAULT 0,
  reviews integer NOT NULL DEFAULT 0,
  badge text,
  description text NOT NULL DEFAULT '',
  variants jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed categories
INSERT INTO public.categories (id, name, icon, count) VALUES
  ('flowers', 'Flowers & Bouquets', '🌸', 24),
  ('hampers', 'Gift Hampers', '🎁', 18),
  ('jewelry', 'Jewelry & Accessories', '💎', 32),
  ('chocolates', 'Chocolates & Sweets', '🍫', 15),
  ('perfumes', 'Perfumes & Scents', '🌹', 20),
  ('custom', 'Personalized Gifts', '✨', 28);

-- Seed occasions
INSERT INTO public.occasions (id, name, emoji) VALUES
  ('birthday', 'Birthday', '🎂'),
  ('anniversary', 'Anniversary', '💕'),
  ('wedding', 'Wedding', '💒'),
  ('graduation', 'Graduation', '🎓'),
  ('valentines', 'Valentine''s Day', '❤️'),
  ('mothers-day', 'Mother''s Day', '👩');

-- Seed products
INSERT INTO public.products (id, name, price, original_price, image_url, category, occasion, recipient, rating, reviews, badge, description, variants) VALUES
  (gen_random_uuid(), 'Royal Rose Bouquet', 85000, 120000, '/placeholder.svg', 'flowers', ARRAY['anniversary','valentines','birthday'], ARRAY['her','mom'], 4.8, 124, 'Bestseller', 'A stunning arrangement of 24 premium red roses wrapped in luxury gold paper with a satin ribbon finish.', '[{"type":"Size","options":["12 Roses","24 Roses","36 Roses"]},{"type":"Wrap","options":["Gold","Cream","Rose Pink"]}]'::jsonb),
  (gen_random_uuid(), 'Luxury Gift Hamper', 150000, NULL, '/placeholder.svg', 'hampers', ARRAY['birthday','graduation'], ARRAY['him','her'], 4.9, 87, 'Premium', 'Curated collection of premium chocolates, wine, and artisanal treats in an elegant wooden box.', '[{"type":"Size","options":["Standard","Deluxe","Grand"]}]'::jsonb),
  (gen_random_uuid(), 'Gold Pearl Necklace', 250000, 320000, '/placeholder.svg', 'jewelry', ARRAY['anniversary','wedding','birthday'], ARRAY['her','mom'], 4.7, 56, NULL, 'Elegant 18K gold-plated necklace with freshwater pearl pendant. Perfect for special occasions.', '[{"type":"Length","options":["16 inch","18 inch","20 inch"]}]'::jsonb),
  (gen_random_uuid(), 'Artisan Chocolate Box', 45000, NULL, '/placeholder.svg', 'chocolates', ARRAY['birthday','valentines','mothers-day'], ARRAY['her','him','kids'], 4.6, 203, 'Popular', 'Hand-crafted Belgian chocolates in 12 exquisite flavors, beautifully presented in a keepsake box.', NULL),
  (gen_random_uuid(), 'Personalized Photo Frame', 35000, NULL, '/placeholder.svg', 'custom', ARRAY['wedding','anniversary','graduation'], ARRAY['him','her','mom'], 4.5, 98, NULL, 'Custom engraved wooden photo frame with your personal message. A timeless keepsake for loved ones.', NULL),
  (gen_random_uuid(), 'Signature Perfume Set', 180000, NULL, '/placeholder.svg', 'perfumes', ARRAY['birthday','valentines'], ARRAY['her'], 4.8, 67, 'New', 'Exclusive collection of three signature fragrances in elegant mini bottles. A luxurious gift for her.', '[{"type":"Collection","options":["Floral","Oriental","Fresh"]}]'::jsonb);
