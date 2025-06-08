-- Cria a tabela de configurações do usuário
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_reminders BOOLEAN DEFAULT true,
    promotions BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Habilita RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Cria políticas de segurança
CREATE POLICY "Usuários podem ver suas próprias configurações"
    ON user_settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias configurações"
    ON user_settings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias configurações"
    ON user_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Cria função para atualizar o timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Cria trigger para atualizar o timestamp
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 