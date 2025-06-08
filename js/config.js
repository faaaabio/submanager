// Configuração do Supabase
const SUPABASE_CONFIG = {
    url: 'https://slnyyxutbgpbqcfzjyxi.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbnl5eHV0YmdwYnFjZnpqeXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MjI5NDgsImV4cCI6MjA2NDM5ODk0OH0.4C0wHwQih8NDWKVIAzoByZRe5HXQPlcvCwUgwTrqq0s'
};

// Função para inicializar o cliente Supabase
function initSupabase() {
    return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

// Função para verificar autenticação
async function checkAuth() {
    const supabase = initSupabase();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
        console.error('Erro ao verificar autenticação:', error);
        return false;
    }
    
    return !!session;
}

// Função para redirecionar se não estiver autenticado
async function requireAuth() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        window.location.href = '/login.html';
    }
}

// Função para fazer logout
async function logout() {
    const supabase = initSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Erro ao fazer logout:', error);
    } else {
        window.location.href = '/login.html';
    }
}

// Função para obter assinaturas do usuário
async function getUserSubscriptions() {
    const supabase = initSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
        .from('assinaturas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar assinaturas:', error);
        return null;
    }

    return data;
}

// Função para obter configurações do usuário
async function getUserSettings() {
    const supabase = initSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
        .from('configuracoes')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error) {
        console.error('Erro ao buscar configurações:', error);
        return null;
    }

    return data;
}

// Função para obter ofertas ativas
async function getActiveOffers() {
    const supabase = initSupabase();
    const { data, error } = await supabase
        .from('ofertas')
        .select('*')
        .eq('status', 'Ativo')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar ofertas:', error);
        return null;
    }

    return data;
}

// Função para obter planos disponíveis
async function getAvailablePlans() {
    const supabase = initSupabase();
    const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('price', { ascending: true });

    if (error) {
        console.error('Erro ao buscar planos:', error);
        return null;
    }

    return data;
} 