class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.loadTasks();
        this.initElements();
        this.initEventListeners();
        this.renderTasks();
    }

    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.descInput = document.getElementById('descInput');
        this.dateInput = document.getElementById('dateInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
    }

    initEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTask());
        
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });

        this.exportBtn.addEventListener('click', () => this.exportToJSON());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.importFromJSON(e));
    }

    addTask() {
        const title = this.taskInput.value.trim();
        const description = this.descInput.value.trim();
        const dueDate = this.dateInput.value;
        
        if (!title) return;

        const newTask = {
            id: Date.now(),
            title,
            description,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        
        // Clear inputs
        this.taskInput.value = '';
        this.descInput.value = '';
        this.dateInput.value = '';
        this.taskInput.focus();
    }

    deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.add('deleting');
            setTimeout(() => {
                this.tasks = this.tasks.filter(task => task.id !== id);
                this.saveTasks();
                this.renderTasks();
            }, 300);
        }
    }

    toggleComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    editTask(id, newTitle, newDesc, newDate) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.title = newTitle || task.title;
            task.description = newDesc || task.description;
            task.dueDate = newDate || task.dueDate;
            this.saveTasks();
            this.renderTasks();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    }

    renderTasks() {
        this.taskList.innerHTML = '';

        const filteredTasks = this.tasks.filter(task => {
            if (this.currentFilter === 'active') return !task.completed;
            if (this.currentFilter === 'completed') return task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = this.currentFilter === 'all' 
                ? 'No tasks yet. Add one above!' 
                : this.currentFilter === 'active' 
                    ? 'No active tasks!' 
                    : 'No completed tasks!';
            this.taskList.appendChild(emptyMsg);
            return;
        }

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.dataset.id = task.id;

            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    ${task.description ? `<div class="task-desc">${task.description}</div>` : ''}
                    ${task.dueDate ? `<div class="task-date">Due: ${new Date(task.dueDate).toLocaleDateString()}</div>` : ''}
                </div>
                <div class="task-actions">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;

            const checkbox = taskElement.querySelector('.task-checkbox');
            const editBtn = taskElement.querySelector('.edit-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');
            const titleElement = taskElement.querySelector('.task-title');
            const descElement = taskElement.querySelector('.task-desc');

            checkbox.addEventListener('change', () => this.toggleComplete(task.id));
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
            
            editBtn.addEventListener('click', () => {
                const newTitle = prompt('Edit task title:', task.title);
                const newDesc = prompt('Edit task description:', task.description);
                const newDate = prompt('Edit due date (YYYY-MM-DD):', task.dueDate);
                
                if (newTitle !== null) {
                    this.editTask(task.id, newTitle, newDesc, newDate);
                }
            });

            this.taskList.appendChild(taskElement);
        });
    }

    async exportToJSON() {
        try {
            if (this.tasks.length === 0) {
                alert('No tasks to export!');
                return;
            }

            const dataStr = JSON.stringify(this.tasks, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `todo-tasks-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export tasks. See console for details.');
        }
    }

    async importFromJSON(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.name.endsWith('.json')) {
                alert('Please select a JSON file.');
                return;
            }

            const fileText = await this.readFileAsText(file);
            const importedTasks = JSON.parse(fileText);
            
            if (!Array.isArray(importedTasks)) {
                throw new Error('Invalid file format - expected an array of tasks');
            }

            if (confirm(`Import ${importedTasks.length} task(s)? This will replace your current tasks.`)) {
                this.tasks = importedTasks;
                this.saveTasks();
                this.renderTasks();
                alert('Tasks imported successfully!');
            }
        } catch (error) {
            console.error('Import failed:', error);
            alert('Failed to import tasks. The file may be corrupted or in the wrong format.');
        } finally {
            
            event.target.value = '';
        }
    }

    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = error => reject(error);
            reader.readAsText(file);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});