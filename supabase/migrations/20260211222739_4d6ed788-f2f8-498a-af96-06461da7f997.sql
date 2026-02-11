
-- Create orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  delivery_address text,
  phone text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all orders
CREATE POLICY "Admins can manage all orders"
ON public.orders FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
