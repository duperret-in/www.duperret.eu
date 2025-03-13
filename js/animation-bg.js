const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');

// Redimensionne le canvas pour qu'il couvre toute la fenêtre
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Fonction pour générer une ligne avec des points aléatoires
function generateLine() {
    const points = [];
    const numPoints = 3 + Math.floor(Math.random() * 5); // Entre 3 et 7 points
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }
    return points;
}

// Fonction pour dessiner une ligne
function drawLine(points, opacity) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Tableau pour stocker les lignes actuelles
const lines = [];

// Fonction principale d'animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajoute une nouvelle ligne à des intervalles aléatoires
    if (Math.random() < 0.05) {
        lines.push({
            points: generateLine(),
            opacity: 1.0
        });
    }

    // Dessine chaque ligne et réduit son opacité
    for (let i = lines.length - 1; i >= 0; i--) {
        drawLine(lines[i].points, lines[i].opacity);
        lines[i].opacity -= 0.01; // Diminue progressivement l'opacité
        if (lines[i].opacity <= 0) {
            lines.splice(i, 1); // Supprime la ligne une fois invisible
        }
    }

    requestAnimationFrame(animate);
}

animate();
