document.addEventListener('DOMContentLoaded', function() {
    fetch('json/footer.json')
        .then(response => response.json())
        .then(data => {
            const footerList = document.querySelector('footer ul');
            footerList.innerHTML = ''; // Clear existing content
            data.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add(index === 0 ? 'left' : 'right');
                if (item.href !== "#") {
                    const link = document.createElement('a');
                    link.href = item.href;
                    link.textContent = item.text;
                    listItem.appendChild(link);
                } else {
                    listItem.textContent = item.text;
                }
                footerList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du footer:', error));
});