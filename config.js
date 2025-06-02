// Configurações do ambiente
const config = {
    SUPABASE_URL: 'https://slnyyxutbgpbqcfzjyxi.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbnl5eHV0YmdwYnFjZnpqeXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MjI5NDgsImV4cCI6MjA2NDM5ODk0OH0.4C0wHwQih8NDWKVIAzoByZRe5HXQPlcvCwUgwTrqq0s'
}

// Exporta apenas o necessário
export const getSupabaseConfig = () => ({
    url: config.SUPABASE_URL,
    key: config.SUPABASE_KEY
}) 