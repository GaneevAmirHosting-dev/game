// script.js
import { newItem } from '../Player/inventory.js';

// Сделаем newItem доступной глобально
window.newItem = newItem;
// Функция для закрытия всех окон
window.closeALlWindows = function() {
    document.querySelector(".inventoryWin").style.display = 'none';
    document.querySelector(".workbenchWin").style.display = 'none';  
    document.querySelector(".mapWin").style.display = 'none';
    document.querySelector(".digWin").style.display = 'none';  
    document.querySelector(".settingsWin").style.display = 'none';
    document.querySelector(".cheatMenu").style.display = 'none';

// Останавливаем сбор ресурсов при закрытии окон
document.dispatchEvent(new CustomEvent('windowsClosed'));

}

window.inventoryOpen = function() {
    closeALlWindows();
    document.querySelector(".inventoryWin").style.display = 'grid';
}

window.workbenchOpen = function() {
    closeALlWindows();
    document.querySelector(".workbenchWin").style.display = 'grid';
}

window.mapOpen = function() {
    closeALlWindows();
    document.querySelector(".mapWin").style.display = 'grid';
}

window.digOpen = function() {
    closeALlWindows(); 
    document.querySelector(".digWin").style.display = 'grid';
}

window.settingsOpen = function() {
    closeALlWindows(); 
    document.querySelector(".settingsWin").style.display = 'grid';
}

window.cheatMenuOpen = function() {
    closeALlWindows();
    document.querySelector(".cheatMenu").style.display = 'grid';
}

window.addSelectedItem = function() {
    const itemName = document.getElementById('itemSelect').value;
    const itemCount = parseInt(document.getElementById('itemCount').value);
    newItem(itemName, itemCount);
}
  closeALlWindows();