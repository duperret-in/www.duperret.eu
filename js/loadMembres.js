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
                membreDiv.innerHTML = `
                    <img src="${membre.image}" alt="${membre.nom}" loading="lazy">
                    <h3>${membre.nom}</h3>
                    <p>${membre.description}</p>
                `;
                container.appendChild(membreDiv);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des membres:', error));
});