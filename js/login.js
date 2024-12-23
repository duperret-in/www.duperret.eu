document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifiez les informations d'identification (vous pouvez remplacer cette partie par une vérification réelle)
    if (username === 'admin' && password === 'password') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('annuaire-detail').style.display = 'block';
        loadMembresDetail();
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
});