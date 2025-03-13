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