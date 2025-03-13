const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const lines = [];
const MAX_LINES = 5;
const SEGMENTS_MIN = 4;
const SEGMENTS_MAX = 6;

// Fonction de génération d'une ligne avec des courbes douces
function generateLine() {
    const points = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    let angle = Math.random() * Math.PI * 2;

    const segments = SEGMENTS_MIN + Math.floor(Math.random() * (SEGMENTS_MAX - SEGMENTS_MIN));
    
    for (let i = 0; i < segments; i++) {
        angle += (Math.random() - 0.5) * Math.PI / 2; // Variabilité des angles
        const distance = 80 + Math.random() * 120; // Distance entre segments

        const lastPoint = points[points.length - 1];

        points.push({
            x: lastPoint.x + Math.cos(angle) * distance,
            y: lastPoint.y + Math.sin(angle) * distance,
        });
    }

    return { points, progress: 0, opacity: 1, fading: false };
}

// Fonction de dessin avec interpolation pour courbes plus fluides
function drawLine(line) {
    ctx.strokeStyle = `rgba(255,255,255,${line.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(line.points[0].x, line.points[0].y);

    const maxIndex = Math.floor(line.progress);
    for (let i = 1; i <= maxIndex; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
    }

    ctx.stroke();

    // Dessin des nœuds (petits cercles)
    for (let i = 1; i <= maxIndex; i++) {
        ctx.beginPath();
        ctx.arc(line.points[i].x, line.points[i].y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${line.opacity})`;
        ctx.fill();
    }

    // Progression douce du tracé
    if (line.progress < line.points.length - 1) {
        line.progress += 0.02;
    } else if (!line.fading) {
        setTimeout(() => line.fading = true, 5000); // Attente avant disparition
    } else {
        line.opacity -= 0.02;
    }
}

// Animation
function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; // Assombrit légèrement le fond pour un effet plus propre
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ajout progressif de nouvelles lignes
    if (lines.length < MAX_LINES && Math.random() < 0.02) {
        lines.push(generateLine());
    }

    // Dessin et suppression des lignes disparues
    lines.forEach((line, index) => {
        drawLine(line);
        if (line.opacity <= 0) lines.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

animate();

// Forcer le canvas à rester en background
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "-10";  // Assurer qu'il reste en arrière-plan
canvas.style.pointerEvents = "none"; // Empêcher les interactions
