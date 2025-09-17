import { storage } from '../utility/storage.js';

export default class KanbanAPI {
    static getTasks() {
        return storage.get('kanban-tasks') || [];
    }

    static saveTasks(tasks) {
        storage.set('kanban-tasks', tasks);
    }
    
    static getTasksByColumn(columnId) {
        return this.getTasks()
            .filter(task => task.columnId === columnId)
            .sort((a, b) => a.position - b.position);
    }

    static insertTask(columnId, title, description) {
        const tasks = this.getTasks();
        const newTask = {
            id: Date.now().toString(),
            columnId,
            title,
            description,
            position: this.getTasksByColumn(columnId).length
        };
        
        tasks.push(newTask);
        this.saveTasks(tasks);
        return newTask;
    }

    static updateTask(taskId, updates) {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            Object.assign(task, updates);
            this.saveTasks(tasks);
        }
    }

    static reorderColumn(columnId) {
        const tasks = this.getTasks();
        const dropzone = document.querySelector(`.kanban__column[data-id="${columnId}"] .kanban__dropzone`);
        
        Array.from(dropzone.querySelectorAll('.kanban__task')).forEach((element, index) => {
            const task = tasks.find(t => t.id === element.dataset.id);
            if (task) task.position = index;
        });

        this.saveTasks(tasks);
    }
}