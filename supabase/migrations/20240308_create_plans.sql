-- Create plans table
CREATE TABLE plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 30,
    is_monthly BOOLEAN NOT NULL DEFAULT true,
    pix_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access to plans
CREATE POLICY "Plans are viewable by everyone" ON plans
    FOR SELECT
    USING (true);

-- Only allow authenticated users with admin role to modify plans
CREATE POLICY "Only admins can modify plans" ON plans
    FOR ALL
    USING (auth.role() = 'admin');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_plans_updated_at
    BEFORE UPDATE ON plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default plans
INSERT INTO plans (name, description, price, duration_days, is_monthly, pix_code) VALUES
    ('Básico', 'Ideal para começar a organizar suas assinaturas', 25.80, 30, true, 'PIX123456789'),
    ('Pro', 'Para quem tem várias assinaturas', 49.90, 30, true, 'PIX987654321'),
    ('Business', 'Para empresas e equipes', 99.90, 30, true, 'PIX456789123'); 