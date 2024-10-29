let resources = []; // Массив для хранения всех ресурсов

// Загрузка инвентаря
const loadInventory = () => {
  return fetch('../../JSON/inventory.json')
    .then(response => response.json())
    .then(data => {
      return { inventory: data.inventory };
    });
};

// Загрузка ресурсов
const loadResources = () => {
  return fetch('../../JSON/resources.json')
    .then(response => response.json())
    .then(data => {
      // Переводим ресурсы в массив
      resources = Object.values(data); 
      return { resources: resources };
    });
};

// Добавление нового ресурса в инвентарь
const newItem = (itemName, count) => {
  const resource = resources.find(item => item.name === itemName); 
  if (resource) {
    return fetch('../../JSON/inventory.json')
      .then(response => response.json())
      .then(data => {
        const inventory = data.inventory;
        const existingItem = inventory.find(item => item.name === itemName);

        if (existingItem) {
          existingItem.count += count;
        } else {
          inventory.push({ name: itemName, count: count, stack: resource.stack }); 
        }

        return fetch('../../JSON/inventory.json', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inventory: inventory }) 
        });
      })
      .then(response => {
        if (response.ok) {
          console.log('Инвентарь сохранен!');
          updateInventoryDisplay(); 
        } else {
          console.error('Ошибка при сохранении инвентаря.');
        }
      })
      .catch(error => {
        console.error('Ошибка при сохранении инвентаря:', error);
      });
  } else {
    console.error(`Ресурс "${itemName}" не найден в списке ресурсов.`);
  }
};

// Удаление ресурса из инвентаря
const removeItem = (itemName, count) => {
  return loadInventory()
    .then(data => {
      const inventory = data.inventory;
      const itemIndex = inventory.findIndex(item => item.name === itemName);
      if (itemIndex !== -1) {
        const item = inventory[itemIndex];
        if (item.count >= count) {
          item.count -= count;
          if (item.count === 0) {
            inventory.splice(itemIndex, 1); 
          }
          saveInventory(inventory); 
          updateInventoryDisplay();
          return true;
        }
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
      data.inventory.forEach((item, index) => {
        const cell = document.createElement("cell");
        cell.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-count">${item.count} / ${item.stack}</span>
        `;
        inventoryContainer.appendChild(cell);
      });
    });
};

// Сохранение инвентаря
const saveInventory = (inventory) => {
  fetch('../../JSON/inventory.json', {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inventory: inventory }) 
  })
    .then(response => {
      if (response.ok) {
        console.log('Инвентарь сохранен!');
      } else {
        console.error('Ошибка при сохранении инвентаря.');
      }
    })
    .catch(error => {
      console.error('Ошибка при сохранении инвентаря:', error);
    });
};

// Изменение максимального размера инвентаря
const changeMaxInventorySize = (newSize) => {
  if (newSize >= 1 && newSize <= 3200) { // Установка разумных ограничений
    maxInventorySlots = newSize;
    // Если новый размер меньше текущего инвентаря, удаляем предметы
    if (newSize < inventory.length) {
      inventory.splice(newSize, inventory.length - newSize); 
    }
    saveInventory();
    updateInventoryDisplay();
  }
};

const showInventoryFullNotification = () => {
  const now = Date.now();
  if (now - lastNotificationTime >= 1000) { 
    lastNotificationTime = now;
    Toastify({
      text: "ваш инвентарь заполнен, просим вас очистить его",
      duration: 4000,
      gravity: "top",
      position: "center",
      className: "toast-success", //  Добавляем  класс  для  стилей  по  умолчанию
      stopOnFocus: true,
      progress: false //  Включаем  прогресс-бар
    }).showToast(); 
  }
};

// Экспорт функций
export { 
  loadResources, 
  loadInventory, 
  newItem, 
  removeItem, 
  updateInventoryDisplay, 
  changeMaxInventorySize 
};

// Инициализация при загрузке
loadResources()
  .then(() => {
    //  Теперь  вы  можете  использовать  `newItem()`  или  `resources`
    newItem("oak_wood", 100); 
  });