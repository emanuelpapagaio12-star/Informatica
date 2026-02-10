import sqlite3
import os
import time
import threading
import random
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.path.join(BASE_DIR, 'database', 'encajadora.db')
SCHEMA = os.path.join(BASE_DIR, 'database', 'schema.sql')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db_dir = os.path.join(BASE_DIR, 'database')
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)
    conn = get_db_connection()
    with open(SCHEMA, 'r') as f:
        conn.executescript(f.read())
    conn.close()

# Lógica de Simulación
def simulation_worker():
    while True:
        try:
            conn = get_db_connection()
            state = conn.execute('SELECT * FROM system_state WHERE id = 1').fetchone()
            
            if state and state['mode'] == 'running' and state['simulation_active']:
                # Generar datos aleatorios si está en marcha y simulación activa
                boxes = random.randint(10, 50)
                errors = random.randint(0, 3)
                conn.execute('INSERT INTO metrics (boxes_count, errors_count) VALUES (?, ?)', (boxes, errors))
                conn.commit()
            
            conn.close()
        except Exception as e:
            print(f"Error en simulación: {e}")
        time.sleep(5) # Cada 5 segundos genera un registro

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['GET'])
def get_status():
    conn = get_db_connection()
    state = conn.execute('SELECT * FROM system_state WHERE id = 1').fetchone()
    # Obtener últimas métricas (última hora aprox)
    metrics = conn.execute('SELECT SUM(boxes_count) as total_boxes, SUM(errors_count) as total_errors FROM metrics WHERE timestamp >= datetime("now", "-1 hour")').fetchone()
    conn.close()
    
    return jsonify({
        'mode': state['mode'],
        'simulation': bool(state['simulation_active']),
        'boxes_per_hour': metrics['total_boxes'] or 0,
        'errors_per_hour': metrics['total_errors'] or 0
    })

@app.route('/api/control', methods=['POST'])
def control_system():
    data = request.json
    mode = data.get('mode') # 'running' or 'paused'
    simulation = data.get('simulation') # boolean
    
    conn = get_db_connection()
    if mode:
        conn.execute('UPDATE system_state SET mode = ? WHERE id = 1', (mode,))
    if simulation is not None:
        conn.execute('UPDATE system_state SET simulation_active = ? WHERE id = 1', (int(simulation),))
    conn.commit()
    conn.close()
    return jsonify({'status': 'updated'})

if __name__ == '__main__':
    if not os.path.exists(DATABASE):
        init_db()
    
    # Iniciar hilo de simulación
    thread = threading.Thread(target=simulation_worker, daemon=True)
    thread.start()
    
    app.run(debug=True, port=5001)
