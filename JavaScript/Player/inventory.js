let resources = {}; // Объект для хранения всех ресурсов

// Загрузка инвентаря
const loadInventory = () => {
  return fetch('http://localhost:3000/api/inventory')
    .then(response => response.json())
    .then(data => {
      return { inventory: data.inventory };
    });
};

// Загрузка ресурсов
const loadResources = () => {
  return fetch('http://localhost:3000/api/resources')
    .then(response => response.json())
    .then(data => {
      resources = data; // Сохраняем ресурсы в виде объекта
      return { resources: resources };
    });
};

// Добавление нового ресурса в инвентарь
const newItem = (itemKey, count) => {
  if (resources[itemKey]) {
    return loadInventory()
      .then(data => {
        const inventory = data.inventory;
        const existingItem = inventory.find(item => item.key === itemKey);

        if (existingItem) {
          // Если предмет уже существует, обновляем его количество
          existingItem.count += count;
          return fetch('http://localhost:3000/api/inventory', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventory: inventory })
          });
        } else {
          // Если предмет не существует, добавляем его в инвентарь
          inventory.push({ 
            key: itemKey, 
            count: count, 
            stack: resources[itemKey].stack,
            name: resources[itemKey].name
          });
          return fetch('http://localhost:3000/api/inventory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventory: inventory })
          });
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Инвентарь сохранен!');
          return updateInventoryDisplay();
        } else {
          console.error('Ошибка при сохранении инвентаря.');
        }
      })
      .catch(error => {
        console.error('Ошибка при сохранении инвентаря:', error);
      });
  } else {
    console.error(`Ресурс с ключом "${itemKey}" не найден в списке ресурсов.`);
  }
};

// Удаление ресурса из инвентаря
const removeItem = (itemKey, count) => {
  return loadInventory()
    .then(data => {
      const inventory = data.inventory;
      const itemIndex = inventory.findIndex(item => item.key === itemKey);
      if (itemIndex !== -1) {
        const item = inventory[itemIndex];
        if (item.count >= count) {
          item.count -= count;
          if (item.count === 0) {
            inventory.splice(itemIndex, 1);
          }
          return fetch('http://localhost:3000/api/inventory', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventory: inventory })
          });
        }
      }
      return false;
    })
    .then(response => {
      if (response && response.ok) {
        updateInventoryDisplay();
        return true;
      }
      return false;
    });
};

// Обновление отображения инвентаря
const updateInventoryDisplay = () => {
  return loadInventory()
    .then(data => {
      const inventoryContainer = document.querySelector(".inventoryWin");
      inventoryContainer.innerHTML = "";
      data.inventory.forEach((item) => {
        const cell = document.createElement("cell");
        cell.innerHTML = `
          <span class="item-name">${item.name}</span>
          <span class="item-count">${item.count} / ${item.stack}</span>
        `;
        inventoryContainer.appendChild(cell);
      });
    });
};

// Экспорт функций
export { 
  loadResources, 
  loadInventory, 
  newItem, 
  removeItem, 
  updateInventoryDisplay 
};