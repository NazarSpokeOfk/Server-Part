//Создаем таблицу с товарами 
async function createTables(pool) {
    try{
        const createGoodsTable = `CREATE TABLE IF NOT EXISTS goods (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        //Выше создаем таблицу с товарами 

        const createBasketTable = `
        CREATE TABLE IF NOT EXISTS basket (
        id SERIAL PRIMARY KEY,
        good_id INTEGER REFERENCES goods(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        //Выше создаем таблицу с корзиной.

        await pool.query(createGoodsTable)
        console.log('Goods table created');

        await pool.query(createBasketTable);
        console.log('Basket table Created')
    }
        catch(error){
            console.error('Error creating tables :' , error.message)
        }
    }

    module.exports = createTables;