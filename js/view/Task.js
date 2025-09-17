export default class Task {
    constructor(id, title, description) {
        this.element = document.createElement('div');
        this.element.className = 'kanban__task';
        this.element.dataset.id = id;
        this.element.draggable = true;
        
        this.element.innerHTML = `
            <h3 class="kanban__task-title">${title}</h3>
            <p class="kanban__task-description">${description}</p>
        `;
        
        this.element.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', id);
            this.element.classList.add('kanban__task--dragging');
        });
        
        this.element.addEventListener('dragend', () => {
            this.element.classList.remove('kanban__task--dragging');
        });
    }
}