const pool = require('../db'); // Импортируем пул соединений с базой данных

class GoodController {
    // Метод для получения всех пользователей
    async getAllGoods(req, res) {
        try {
            // Выполняем SQL-запрос для получения всех записей из таблицы users
            const goods = await pool.query('SELECT * FROM users');
            // Отправляем найденные записи в ответ
            res.json(goods.rows);
        } catch (error) {
            console.log(error); // Логируем ошибку в консоль
        }
    }

    // Метод для создания нового товара
    async addGood(req, res) {
        const { id, title } = req.body; // Извлекаем имя и email из тела запроса
        try {
            // Выполняем SQL-запрос на вставку нового пользователя в таблицу users
            const good = await pool.query(
                'INSERT INTO goods (id, title) VALUES ($1, $2) RETURNING *', 
                [id, title] // Параметры запроса
            );
            // Отправляем созданного пользователя в ответ
            res.json(good.rows[0]);
        } catch (error) {
            console.error('error', error); // Логируем ошибку в консоль
        }
    }


    // // Метод для обновления данных пользователя по его ID
    // async updateUser(req, res) {
    //     const id = parseInt(req.params.id, 10); // Извлекаем ID пользователя из параметров запроса и преобразуем в число
    //     const { name, email } = req.body; // Извлекаем обновленные имя и email из тела запроса
    //     try {
    //         // Выполняем SQL-запрос для обновления данных пользователя в таблице users
    //         const user = await pool.query(
    //             'UPDATE goods SET title = $1 WHERE id = $2 RETURNING *', 
    //             [name, email, id] // Параметры запроса
    //         );
    //         // Отправляем обновленного пользователя в ответ
    //         res.json(user.rows[0]);
    //     } catch (error) {
    //         console.log('error', error); // Логируем ошибку в консоль
    //     }
    // }

    // Метод для удаления пользователя по его ID
    async deleteGood(req, res) {
        const id = req.params.id; // Извлекаем ID пользователя из параметров запроса
        try {
            // Выполняем SQL-запрос для удаления пользователя из таблицы users
            const good = await pool.query(
                'DELETE FROM users WHERE id = $1 RETURNING *', 
                [id] // Параметры запроса
            );
            // Отправляем удаленного пользователя в ответ
            res.json(good.rows[0]);
        } catch (error) {
            console.log('error', error); // Логируем ошибку в консоль
        }
    }
}

// Экспортируем экземпляр UserController для использования в других частях приложения
module.exports = new GoodController();
