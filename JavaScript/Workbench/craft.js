import { loadInventory, loadResources, newItem, removeItem, updateInventoryDisplay } from '../Player/inventory.js';

let crafts; // Глобальная переменная для хранения крафтов

export const loadCrafts = () => {
  return fetch('../JSON/crafts.json')
    .then(response => response.json())
    .then(craftsData => {
      crafts = craftsData.crafts; // Сохраняем крафты
      // updateWorkbenchDisplay(); // Обновляем отображение воркбенча (убрали)
      return { crafts }; // Возвращаем crafts
    });
};

// Функция для крафта предмета
window.craftItem = function(craftName) { // Добавили window. перед craftItem
  const craft = crafts.find(c => c.name === craftName);
  if (craft) {
    // Проверяем,  достаточно  ли  ингредиентов
    let hasAllIngredients = true;
    craft.ingredients.forEach(ingredient => {
      if (!removeItem(ingredient.name, ingredient.count)) {
        hasAllIngredients = false;
      }
    });

    if (hasAllIngredients) {
      // Если все ингредиенты есть,  добавляем  результат  крафта
      newItem(craft.result.name, craft.result.count);
    } else {
      // Выводим  сообщение  об  отсутствии  ингредиентов
      alert("Недостаточно  ингредиентов  для  крафта:  " + craftName);
    }
  } else {
    // Рецепт  не  найден
    alert("Рецепт  не  найден:  " + craftName);
  }
};

function updateWorkbenchDisplay() {
  const workbenchContainer = document.querySelector('.workbenchWin');
  workbenchContainer.innerHTML = ''; // Очищаем содержимое

  crafts.forEach(craft => {
    // Создаем  элемент  для  крафта
    const craftElement = document.createElement('div');
    craftElement.classList.add('craft');

    // Добавляем  информацию  о  крафте
    craftElement.innerHTML = `
        <h3>${craft.name}</h3>
        <ul>
            ${craft.ingredients.map(ingredient => `<li>${ingredient.count} ${ingredient.name}</li>`).join('')}
        </ul>
        <button class="craft-button" onclick="craftItem('${craft.name}')">Скрафтить</button>
    `;

    workbenchContainer.appendChild(craftElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadCrafts()
    .then(() => {
      updateWorkbenchDisplay();
    });
});
