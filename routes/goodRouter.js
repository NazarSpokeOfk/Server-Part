const Router = require('express') // Импортируем Router из библиотеки express
const router = new Router() // Создаем новый экземпляр маршрутизатора
const goodController = require ('../controllers/goodController') // Импортируем контроллер пользователей

// Определяем маршрут для получения всех товаров
router.get('/goods', goodController.getAllGoods) // Обрабатываем GET-запрос на получение всех пользователей с использованием метода getAllUsers контроллера

// Определяем маршрут для создания нового пользователя
router.post('/good', goodController.addGood) // Обрабатываем POST-запрос на создание нового пользователя с использованием метода createUser контроллера


// Определяем маршрут для удаления пользователя по его идентификатору
router.delete('/good/:id', goodController.deleteGood) // Обрабатываем DELETE-запрос для удаления пользователя по ID с использованием метода deleteUser контроллера

module.exports = router // Экспортируем маршрутизатор для использования в других частях приложения
