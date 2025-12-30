// CONFIGURATION SUPABASE
const SUPABASE_URL = "https://setjcztrwlqjlcxofvet.supabase.co";
const SUPABASE_KEY = "sb_publishable_nlZSrPnuxJQxy8GccGNkjA_eV6zG87O";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('topfight-form');
const successMessage = document.getElementById('success-message');
const adminView = document.getElementById('admin-view');
const adminList = document.getElementById('admin-list');
const loginView = document.getElementById('login-view');
const adminPassword = document.getElementById('admin-password');
const loginBtn = document.getElementById('login-btn');
const cancelLoginBtn = document.getElementById('cancel-login');

// 1. GESTION DE L'INSCRIPTION
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = form.querySelector('.burn-btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'TRANSMISSION_SQL...';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const { error } = await supabaseClient
        .from('pilotes')
        .insert([data]);

    if (error) {
        alert("ERREUR CRITIQUE : ÉCHEC DE L'ENREGISTREMENT");
        console.error(error);
        btn.textContent = originalText;
        btn.disabled = false;
    } else {
        // Désactiver tous les champs du formulaire
        const inputs = form.querySelectorAll('input, textarea, button');
        inputs.forEach(input => input.disabled = true);
        
        form.style.display = 'none';
        document.querySelector('.admin-trigger-zone').style.display = 'none';
        successMessage.classList.remove('hidden');
        window.scrollTo(0, 0);
        
        // Démarrer le compteur à rebours
        startCountdown();
    }
});

// Compteur à rebours jusqu'au 16 mars 2026
function startCountdown() {
    const targetDate = new Date('2026-03-16T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<p class="countdown-finished">DISCORD_OUVERT</p>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Mettre à jour immédiatement
    updateCountdown();
    
    // Mettre à jour chaque seconde
    setInterval(updateCountdown, 1000);
}

// Lancer le compteur sur la page contact aussi
function startCountdownForm() {
    const targetDate = new Date('2026-03-16T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown-form').innerHTML = '<p class="countdown-finished">DISCORD_OUVERT</p>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days-form').textContent = String(days).padStart(2, '0');
        document.getElementById('hours-form').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes-form').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds-form').textContent = String(seconds).padStart(2, '0');
    }
    
    // Mettre à jour immédiatement
    updateCountdown();
    
    // Mettre à jour chaque seconde
    setInterval(updateCountdown, 1000);
}

// Démarrer les deux compteurs au chargement
window.addEventListener('load', () => {
    startCountdownForm();
});

// 2. ACCÈS DASHBOARD ADMIN
document.getElementById('access-admin').addEventListener('click', () => {
    window.location.href = 'admin.html';
});
