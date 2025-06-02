// Exemplo de arquivo de configuração
// Copie este arquivo para config.js e preencha com suas credenciais

// Configurações do ambiente
const config = {
    SUPABASE_URL: 'sua_url_do_supabase',
    SUPABASE_KEY: 'sua_chave_do_supabase'
}

// Exporta apenas o necessário
export const getSupabaseConfig = () => ({
    url: config.SUPABASE_URL,
    key: config.SUPABASE_KEY
}) 