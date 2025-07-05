fetch('json/projet.json')
    .then(response => response.json())
    .then(data => {
        const projectGrid = document.getElementById('project-grid');
        data.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <h3>${project.title}</h3>
            `;
            projectGrid.appendChild(projectItem);
        });
    })
    .catch(error => console.error('Erreur lors du chargement des projets:', error));
