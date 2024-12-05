const { json } = require('express'); // Импортируем метод json из express для работы с JSON
const pool = require("../db"); // Импортируем пул соединений с базой данных

class basketController {
    // Метод для создания нового поста
    async addGoodToBasket(req, res) {
            const { id , good_id , title} = req.body; // Извлекаем имя и email из тела запроса
            try {
                // Выполняем SQL-запрос на вставку нового пользователя в таблицу users
                const goodForBasket = await pool.query(
                    'INSERT INTO basket (id, title) VALUES ($1, $2) RETURNING *', 
                    [id, good_id , title] // Параметры запроса
                );
                // Отправляем созданного пользователя в ответ
                res.json(goodForBasket.rows[0]);
            } catch (error) {
                console.error('error', error); // Логируем ошибку в консоль
            }
        }

    // Метод для получения постов пользователя по его ID
    async getAllBasket(req, res) {
            try {
                // Выполняем SQL-запрос для получения всех записей из таблицы users
                const goodsFromBasket = await pool.query('SELECT * FROM basket');
                // Отправляем найденные записи в ответ
                res.json(goodsFromBasket.rows);
            } catch (error) {
                console.log(error); // Логируем ошибку в консоль
            }
        }
}

// Экспортируем экземпляр PostController для использования в других частях приложения
module.exports = new basketController();


