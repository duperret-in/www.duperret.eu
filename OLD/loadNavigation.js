document.addEventListener('DOMContentLoaded', function() {
    fetch('json/navigation.json')
        .then(response => response.json())
        .then(data => {
            const navList = document.querySelector('nav ul');
            navList.innerHTML = ''; // Clear existing content
            data.forEach(item => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.text;
                listItem.appendChild(link);
                navList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de la navigation:', error));
});