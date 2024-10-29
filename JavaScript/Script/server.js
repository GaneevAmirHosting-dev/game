const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Путь к JSON файлам
const inventoryPath = path.join(__dirname, 'JSON', 'inventory.json');
const resourcesPath = path.join(__dirname, 'JSON', 'resources.json');

// Получение инвентаря
app.get('/api/inventory', async (req, res) => {
  try {
    const data = await fs.readFile(inventoryPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Ошибка при чтении инвентаря:', error);
    res.status(500).json({ error: 'Ошибка при чтении инвентаря' });
  }
});

// Получение ресурсов
app.get('/api/resources', async (req, res) => {
  try {
    const data = await fs.readFile(resourcesPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Ошибка при чтении ресурсов:', error);
    res.status(500).json({ error: 'Ошибка при чтении ресурсов' });
  }
});

// Обновление инвентаря
app.post('/api/inventory', async (req, res) => {
  try {
    await fs.writeFile(inventoryPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при сохранении инвентаря:', error);
    res.status(500).json({ error: 'Ошибка при сохранении инвентаря' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});