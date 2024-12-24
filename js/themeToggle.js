document.addEventListener('DOMContentLoaded', function() {
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        document.querySelector('header').classList.add(savedTheme);
        document.querySelector('footer').classList.add(savedTheme);
        document.querySelector('nav').classList.add(savedTheme);

        // Basculer l'icône
        const themeToggle = document.getElementById('theme-toggle');
        if (savedTheme === 'dark-mode') {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        } else {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        }

        // Basculer les tuiles en mode sombre
        document.querySelectorAll('.membre').forEach(function(membre) {
            membre.classList.add(savedTheme);
        });
    }

    // Ajouter l'événement de basculement de thème
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelector('nav').classList.toggle('dark-mode');

        // Basculer l'icône
        if (document.body.classList.contains('dark-mode')) {
            this.classList.remove('fa-moon');
            this.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            this.classList.remove('fa-sun');
            this.classList.add('fa-moon');
            localStorage.setItem('theme', 'light-mode');
        }

        // Basculer les tuiles en mode sombre
        document.querySelectorAll('.membre').forEach(function(membre) {
            membre.classList.toggle('dark-mode');
        });
    });
});