import { newItem } from '../Player/inventory.js';

let isCollecting = false;
let collectionInterval = null;

window.collectWood = function() {
    if (isCollecting) {
        // Если сбор уже идет, останавливаем его
        stopCollecting();
    } else {
        // Если сбор не идет, начинаем его
        startCollecting();
    }
};

function startCollecting() {
    isCollecting = true;
    const button = document.querySelector('.digWin button');
    button.textContent = 'Остановить добычу';
    button.style.backgroundColor = '#FF6B6B';

    // Добавляем дерево каждые 2 секунды
    collectionInterval = setInterval(() => {
        newItem('oak_wood', 1)
            .then(() => {
                // Создаем уведомление о добыче
                showCollectionNotification('Добыто дерево (+1)');
            })
            .catch(error => {
                console.error('Ошибка при добыче дерева:', error);
                showCollectionNotification('Ошибка при добыче!', true);
            });
    }, 2000); // 2000 миллисекунд = 2 секунды
}

function stopCollecting() {
    isCollecting = false;
    const button = document.querySelector('.digWin button');
    button.textContent = 'Добыть дерево';
    button.style.backgroundColor = '#8B4513';
    
    if (collectionInterval) {
        clearInterval(collectionInterval);
        collectionInterval = null;
    }
}

function showCollectionNotification(message, isError = false) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: isError ? "#FF6B6B" : "#4CAF50",
        stopOnFocus: true
    }).showToast();
}

// Останавливаем сбор при закрытии окна
document.addEventListener('windowsClosed', stopCollecting);

// Удаляем прямой обработчик с кнопки закрытия
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.btnClose');
    if (closeButton) {
        closeButton.removeEventListener('click', stopCollecting);
    }
});
