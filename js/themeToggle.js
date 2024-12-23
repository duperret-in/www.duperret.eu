document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('nav').classList.toggle('dark-mode');

    // Basculer l'icône
    if (document.body.classList.contains('dark-mode')) {
        this.classList.remove('fa-moon');
        this.classList.add('fa-sun');
    } else {
        this.classList.remove('fa-sun');
        this.classList.add('fa-moon');
    }

    // Basculer les tuiles en mode sombre
    document.querySelectorAll('.membre').forEach(function(membre) {
        membre.classList.toggle('dark-mode');
    });
});