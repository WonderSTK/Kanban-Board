export const notify = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('notification--fadeout');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
};
