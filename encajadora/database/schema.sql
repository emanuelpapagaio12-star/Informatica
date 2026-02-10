CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    boxes_count INTEGER DEFAULT 0,
    errors_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS system_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    mode TEXT DEFAULT 'paused', -- 'running', 'paused'
    simulation_active BOOLEAN DEFAULT 0
);

INSERT OR IGNORE INTO system_state (id, mode, simulation_active) VALUES (1, 'paused', 0);
