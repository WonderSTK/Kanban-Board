import KanbanAPI from '../api/KanbanAPI.js';
import Task from './Task.js';
import { notify } from '../utility/notifications.js';

// Manages a single column in the kanban board
export default class Column {
    constructor(id) {
        // Setup column elements and initial tasks
        this.id = id;
        this.element = document.querySelector(`.kanban__column[data-id="${id}"]`);
        this.dropzone = this.element.querySelector('.kanban__dropzone');

        this.renderTasks();
        this.setupDropzone();
    }

    // Load and display all tasks in this column
    renderTasks() {
        const tasks = KanbanAPI.getTasksByColumn(this.id);
        this.dropzone.innerHTML = '';
        tasks.forEach(task => this.addTask(task));
    }

    // Create and add a new task element
    addTask(task) {
        const taskView = new Task(task.id, task.title, task.description);
        this.dropzone.appendChild(taskView.element);
    }

    // Handle drag and drop functionality
    setupDropzone() {
        // Highlight dropzone when task is dragged over
        this.dropzone.addEventListener('dragover', e => {
            e.preventDefault();
            this.dropzone.classList.add('kanban__dropzone--over');
        });

        // Remove highlight when task leaves dropzone
        this.dropzone.addEventListener('dragleave', () => {
            this.dropzone.classList.remove('kanban__dropzone--over');
        });

        // Handle task being dropped into column
        this.dropzone.addEventListener('drop', e => {
            e.preventDefault();
            this.dropzone.classList.remove('kanban__dropzone--over');

            const taskId = e.dataTransfer.getData('text/plain');
            const task = document.querySelector(`.kanban__task[data-id="${taskId}"]`);
            const taskTitle = task.querySelector('.kanban__task-title').textContent;
            const oldColumn = task.closest('.kanban__column').dataset.id;

            this.dropzone.appendChild(task);
            KanbanAPI.updateTask(taskId, { columnId: this.id });

            // Show notification when task is moved
            if (oldColumn !== this.id) {
                const columnName = this.element.querySelector('.kanban__column-title').textContent;
                notify(`Moved "${taskTitle}" to ${columnName}`, 'success');
                KanbanAPI.reorderColumn(oldColumn);
            }
            
            KanbanAPI.reorderColumn(this.id);
        });
    }
}