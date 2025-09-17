import { storage } from '../utility/storage.js';

// Handles all task data operations
export default class KanbanAPI {
    // Get all tasks from storage
    static getTasks() {
        return storage.get('kanban-tasks') || [];
    }

    // Save tasks to local storage
    static saveTasks(tasks) {
        storage.set('kanban-tasks', tasks);
    }
    
    // Get tasks for a specific column and sort by position
    static getTasksByColumn(columnId) {
        return this.getTasks()
            .filter(task => task.columnId === columnId)
            .sort((a, b) => a.position - b.position);
    }

    // Add a new task to a column
    static insertTask(columnId, title, description) {
        const tasks = this.getTasks();
        const newTask = {
            id: Date.now().toString(), // Use timestamp as unique ID
            columnId,
            title,
            description,
            position: this.getTasksByColumn(columnId).length
        };
        
        tasks.push(newTask);
        this.saveTasks(tasks);
        return newTask;
    }

    // Update task properties (used when moving tasks)
    static updateTask(taskId, updates) {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === taskId);
        
        if (task) {
            Object.assign(task, updates);
            this.saveTasks(tasks);
        }
    }

    // Fix task positions after drag and drop
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