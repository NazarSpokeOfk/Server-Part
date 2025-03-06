

const express = require('express') // Импортируем библиотеку express для создания веб-приложения
const createTables = require('./db/setup'); // Импортируем функцию для создания таблиц в базе данных
const pool = require('./db/index'); // Импортируем пул соединений с базой данных

const basketRouter = require('./routes/basketRouter'); // Импортируем маршрутизатор для работы с пользователями
const goodRouter = require('./routes/goodRouter'); // Импортируем маршрутизатор для работы с постами

const app = express(); // Создаем экземпляр приложения express
const PORT = process.env.port || 5001; // Устанавливаем порт для сервера (используем переменную окружения или 5001 по умолчанию)

app.use(express.json()); // Подключаем middleware для обработки JSON-тел запросов

// Подключаем маршрутизаторы для обработки API-запросов
app.use('/api', basketRouter) // Все маршруты из userRouter будут доступны по префиксу /api
app.use('/api', goodRouter) // Все маршруты из postRouter будут доступны по префиксу /api

// Асинхронная функция для инициализации приложения
async function initializeApp() {
    try {
        await createTables(pool); // Создаем таблицы в базе данных, если это необходимо
        app.listen(PORT,  () => { // Запускаем сервер на указанном порту
            console.log(`Server is running on port ${PORT}`); // Выводим сообщение о том, что сервер запущен
        });
    } catch (error) {
        console.error(`Error initializing app:`, error.message); // Логируем ошибку, если инициализация не удалась
    }
}

initializeApp(); // Вызываем функцию инициализации приложения
