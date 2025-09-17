import KanbanAPI from './api/KanbanAPI.js';
import Column from './view/Column.js';

document.addEventListener('DOMContentLoaded', () => {
    const columns = {
        todo: new Column('todo'),
        inprogress: new Column('inprogress'),
        done: new Column('done')
    };

    const addForm = document.querySelector('.kanban__add-form');
    
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const title = addForm.querySelector('input[name="title"]').value.trim();
        const description = addForm.querySelector('textarea[name="description"]').value.trim();
        
        if (title) {
            const task = KanbanAPI.insertTask('todo', title, description);
            columns.todo.addTask(task);
            addForm.reset();
        }
    });
});