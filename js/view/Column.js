import KanbanAPI from '../api/KanbanAPI.js';
import Task from './Task.js';

export default class Column {
    constructor(id) {
        this.id = id;
        this.element = document.querySelector(`.kanban__column[data-id="${id}"]`);
        this.dropzone = this.element.querySelector('.kanban__dropzone');

        this.renderTasks();
        this.setupDropzone();
    }

    renderTasks() {
        const tasks = KanbanAPI.getTasksByColumn(this.id);
        this.dropzone.innerHTML = '';
        tasks.forEach(task => this.addTask(task));
    }

    addTask(task) {
        const taskView = new Task(task.id, task.title, task.description);
        this.dropzone.appendChild(taskView.element);
    }

    setupDropzone() {
        this.dropzone.addEventListener('dragover', e => {
            e.preventDefault();
            this.dropzone.classList.add('kanban__dropzone--over');
        });

        this.dropzone.addEventListener('dragleave', () => {
            this.dropzone.classList.remove('kanban__dropzone--over');
        });

        this.dropzone.addEventListener('drop', e => {
            e.preventDefault();
            this.dropzone.classList.remove('kanban__dropzone--over');

            const taskId = e.dataTransfer.getData('text/plain');
            const task = document.querySelector(`.kanban__task[data-id="${taskId}"]`);
            const oldColumn = task.closest('.kanban__column').dataset.id;

            this.dropzone.appendChild(task);
            KanbanAPI.updateTask(taskId, { columnId: this.id });

            if (oldColumn !== this.id) {
                KanbanAPI.reorderColumn(oldColumn);
            }
            KanbanAPI.reorderColumn(this.id);
        });
    }
}