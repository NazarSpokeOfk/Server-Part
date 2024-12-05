const Router = require("express") // Импортируем Router из библиотеки express

const router = new Router() // Создаем новый экземпляр маршрутизатора
const basketController = require("../controllers/basketController") // Импортируем контроллер постов

// Определяем маршрут для создания нового поста
router.post("/basket", basketController.addGoodToBasket) // Обрабатываем POST-запрос на создание поста с использованием метода createPost контроллера

// Определяем маршрут для получения поста по идентификатору пользователя
router.get("basket/:id", basketController.getAllBasket) // Обрабатываем GET-запрос для получения поста по ID пользователя с использованием метода getPostByUser контроллера

module.exports = router; // Экспортируем маршрутизатор для использования в других частях приложения
