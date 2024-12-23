function loadMembresDetail() {
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
                    <p>Téléphone : ${membre.telephone}</p>
                    <p>Email : ${membre.email}</p>
                `;
                container.appendChild(membreDiv);
            });

            // Ajouter la fonctionnalité de recherche
            document.getElementById('search').addEventListener('input', function() {
                let filter = this.value.toLowerCase();
                let members = document.querySelectorAll('.membre');

                members.forEach(function(member) {
                    let name = member.querySelector('h3').textContent.toLowerCase();
                    if (name.includes(filter)) {
                        member.style.display = '';
                    } else {
                        member.style.display = 'none';
                    }
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des membres:', error));
}