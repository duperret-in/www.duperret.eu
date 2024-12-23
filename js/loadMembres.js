document.addEventListener('DOMContentLoaded', function() {
    fetch('json/membres.json')
        .then(response => response.json())
        .then(data => {
            // Trier les membres par ordre alphabétique
            data.sort((a, b) => a.nom.localeCompare(b.nom));

            const container = document.getElementById('membre-container');
            data.forEach(membre => {
                const membreDiv = document.createElement('div');
                membreDiv.classList.add('membre');
                const imageUrl = 'images/default-avatar.png';
                membreDiv.innerHTML = `
                    <img src="${imageUrl}" alt="${membre.prenom}" loading="lazy">
                    <h3>${membre.prenom}</h3>
                `;
                container.appendChild(membreDiv);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des membres:', error));
});