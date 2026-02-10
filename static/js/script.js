document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskTitle');
    const addBtn = document.getElementById('addTaskBtn');

    const fetchTasks = async () => {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task.title}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    };

    const addTask = async () => {
        const title = taskInput.value.trim();
        if (!title) return;

        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        taskInput.value = '';
        fetchTasks();
    };

    window.deleteTask = async (id) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    fetchTasks();
});
