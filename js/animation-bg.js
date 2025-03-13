const canvas = document.getElementById('animated-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function generateLine() {
    const points = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    const segments = 3 + Math.floor(Math.random() * 3);
    let angleBase = Math.random() * Math.PI * 2;

    for (let i = 0; i < segments; i++) {
        const angle = angleOffset + i * (Math.PI / segments) + (Math.random() - 0.5);
        const distance = 50 + Math.random() * 150;
        const lastPoint = points[points.length - 1];

        const newX = lastPoint.x + Math.cos(angle) * distance;
        const newY = lastPoint.y + Math.sin(angle) * distance;

        points.push({ x: newX, y: newY });
    }

    return { points, progress: 0, opacity: 1, fading: false };
}

const lines = [];

function generateLine() {
    const segments = 3 + Math.floor(Math.random() * 3);
    const points = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    let angle = Math.random() * Math.PI * 2;

    for (let i = 0; i < segments; i++) {
        angle += (Math.PI / segments) + (Math.random() - 0.5);
        const distance = 50 + Math.random() * 150;
        const lastPoint = points[points.length - 1];

        points.push({
            x: lastPoint.x + Math.cos(angle) * distance,
            y: lastPoint.y + Math.sin(angle) * distance,
        });
    }

    return { points, progress: 0, opacity: 1, fading: false };
}

function drawLine(line) {
    ctx.strokeStyle = `rgba(255,255,255,${line.opacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(line.points[0].x, line.points[0].y);

    const maxIndex = Math.floor(line.progress);
    for (let i = 1; i <= maxIndex; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
    }
    ctx.stroke();

    // Nœuds
    for (let i = 1; i <= maxIndex; i++) {
        ctx.beginPath();
        ctx.arc(line.points[i].x, line.points[i].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${line.opacity})`;
        ctx.fill();
    }

    if (line.progress < line.points.length) {
        line.progress += 0.03; // vitesse de pousse modérée
    } else if (!line.fading) {
        setTimeout(() => line.fading = true, 8000); // reste affichée 8 secondes avant disparition
    } else {
        line.opacity -= 0.01;
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Maintien à 5 lignes maximum
    if (lines.length < 5 && Math.random() < 0.05) {
        lines.push(generateLine(), generateLine());
    }

    lines.forEach((line, index) => {
        drawLine(line);
        if (line.opacity <= 0) lines.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

animate();
