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
                const imageUrl = membre.image ? membre.image : 'images/default-avatar.png';
                membreDiv.innerHTML = `
                    <img src="${imageUrl}" alt="${membre.prenom} ${membre.nom}" loading="lazy">
                    <h3>${membre.prenom} ${membre.nom}</h3>
                    <p>${membre.description}</p>
                    <p>Téléphone : ${membre.telephone}</p>
                    <p>Email : <a href="mailto:${membre.email}">${membre.email}</a></p>
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