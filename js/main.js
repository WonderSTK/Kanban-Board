import KanbanAPI from './api/KanbanAPI.js';
import Column from './view/Column.js';
import { notify } from './utility/notifications.js';

// Initialize the kanban board when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create the three main columns
    const columns = {
        todo: new Column('todo'),
        inprogress: new Column('inprogress'),
        done: new Column('done')
    };

    // Handle new task form submission
    const addForm = document.querySelector('.kanban__add-form');
    
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const title = addForm.querySelector('input[name="title"]').value.trim();
        const description = addForm.querySelector('textarea[name="description"]').value.trim();
        
        if (title) {
            const task = KanbanAPI.insertTask('todo', title, description);
            columns.todo.addTask(task);
            notify(`New task "${title}" created`, 'info');
            addForm.reset();
        }
    });
});