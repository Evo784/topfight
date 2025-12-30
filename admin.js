// CONFIGURATION SUPABASE
const SUPABASE_URL = "https://setjcztrwlqjlcxofvet.supabase.co";
const SUPABASE_KEY = "sb_publishable_nlZSrPnuxJQxy8GccGNkjA_eV6zG87O";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginPage = document.getElementById('login-page');
const adminPage = document.getElementById('admin-page');
const adminPassword = document.getElementById('admin-password');
const loginBtn = document.getElementById('login-btn');
const backBtn = document.getElementById('back-btn');
const logoutBtn = document.getElementById('logout-btn');
const adminList = document.getElementById('admin-list');

// Focus sur le champ password au chargement
window.addEventListener('load', () => {
    adminPassword.focus();
});

// Validation du login
loginBtn.addEventListener('click', async () => {
    const code = adminPassword.value;
    
    if (code === "TOUGE2025") {
        const { data, error } = await supabaseClient
            .from('pilotes')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) {
            loginPage.classList.add('hidden');
            adminPage.classList.remove('hidden');
            
            adminList.innerHTML = data.map(p => `
                <div class="pilot-card">
                    <h3>PILOTE : ${p.instagram}</h3>
                    <p><span class="tag">EMAIL :</span> ${p.email}</p>
                    <p><span class="tag">MISSION :</span> ${p.interet}</p>
                    <p><span class="tag">EXP :</span> ${p.experience_touge || 'N/C'}</p>
                    
                    <div class="tech-specs">
                        <p><span class="tag">MACHINE :</span> ${p.modele_voiture || 'N/C'}</p>
                        <p><span class="tag">MOTEUR :</span> ${p.prep_moteur || 'ORIGINE'}</p>
                        <p><span class="tag">CHÂSSIS :</span> ${p.prep_chassis || 'ORIGINE'}</p>
                        <p><span class="tag">ESTHÉTIQUE :</span> ${p.prep_esthetique || 'ORIGINE'}</p>
                    </div>
                </div>
            `).join('');
        }
    } else {
        // Erreur visuellement
        adminPassword.style.borderColor = 'var(--neon-red)';
        adminPassword.value = '';
        adminPassword.placeholder = '❌ CODE_INCORRECT...';
        setTimeout(() => {
            adminPassword.style.borderColor = '';
            adminPassword.placeholder = 'ENTREZ LE CODE D\'ACCÈS...';
            adminPassword.focus();
        }, 2000);
    }
});

// Retourner au formulaire principal
backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Déconnexion
logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Appuyer sur Entrée pour valider
adminPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});
