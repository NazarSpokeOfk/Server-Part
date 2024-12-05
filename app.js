// // const express = require('express')
// // const app = express()
// // const PORT = 5001

// app.use(express.json());


// let usersData = [{"name":'dwdw',"age":'dwdw',"surname":'dwdw'}]


// // app.get('/' , (req , res) => {
// //     res.send('Hello world!')
// // })

// // app.listen(PORT ,() => {
// //     console.log(`Server is running on port ${PORT}`)
// // })
// //1 аздание
// app.get(`/greet/:name` , (req,res) => {
//     const name = req.params.name
//     res.send(`Hello ${name}`)
// })

// //2 задание 
// app.get(`/users` , (req,res) => {
    
//     res.send(usersData)
//     })

// //1 вариант
// app.post('/users/add',(req,res) => {
//     const {name,age,surname} = req.body;

//     if(!name || !age || !surname){
//         return res.status(400).json({message : 'все поля обязательны'})
//     }
//     const newUser = {name,age,surname};
//     usersData.push(newUser)
//     res.status(201).json(usersData)
// })

// app.listen(PORT,()=>{
//     console.log('hello')
// })
// // http://localhost:5001/users/add

// //2 вариант

// app.post('/users/add/more',(req,res) => {
//     const {name,age,surname,email,adress} = req.body;

//     if(!name || !age || !surname || !email || !adress){
//         return res.status(400).json({message : 'все поля обязательны'})
//     }
//     const newUser = {name,age,surname,adress,email};
//     usersData.push(newUser)
//     res.status(201).json(usersData)
// })

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