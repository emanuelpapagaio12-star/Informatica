async function updateUI() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();

        document.getElementById('boxesCount').innerText = data.boxes_per_hour;
        document.getElementById('errorsCount').innerText = data.errors_per_hour;

        const indicator = document.getElementById('statusIndicator');
        indicator.innerText = data.mode === 'running' ? 'EN MARCHA' : 'PAUSADO';
        indicator.className = `indicator ${data.mode}`;

        document.getElementById('simToggle').checked = data.simulation;
        document.getElementById('simStatus').innerText = data.simulation ? 'ACTIVO' : 'INACTIVO';
        document.getElementById('simStatus').style.color = data.simulation ? 'var(--primary)' : '#666';

    } catch (e) {
        console.error("Error actualizando UI", e);
    }
}

async function sendControl(mode, simulation) {
    await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, simulation })
    });
    updateUI();
}

document.getElementById('startBtn').onclick = () => sendControl('running', null);
document.getElementById('pauseBtn').onclick = () => sendControl('paused', null);
document.getElementById('simToggle').onchange = (e) => sendControl(null, e.target.checked);

// Polling cada 2 segundos
setInterval(updateUI, 2000);
updateUI();
