const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

require('dotenv').config();
const mysql2 = require('mysql2/promise');

let pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    // 限制 pool 連線數的上限
    connectionLimit: 10,
  });

// 允許跨源存取
// 預設是全部開放
// 也可以做部分限制，參考 npm cors 的文件
  const cors = require('cors')
  app.use(cors());
//   aoo.use(
//     cors({
//         // origin: '*',  // * 的部分可以直接打網址   * -> 允許所有來源
//     })
//   );

//middlewaew => pipeline pattern

// 設定 express 處理靜態檔案
// -> express 內建 -> 不需要安裝任何東西
// localhost:3001/
// app.use(express.static('./static'))
// localhost:3001/2048/
app.use('/2048', express.static('./static'));

//中間件
app.use((req, res, next) => {
    console.log('這裡是一個中間件A');
    req.mfee31 = '水母班';
    next(); //拿掉網頁會一直轉圈圈
});

app.use((req, res, next) => {
    console.log('這裡是一個中間件B');
    req.dt = new Date().toISOString();
    next();
});



// app.[Method]
// get, post, put, patch, delete, option, head
//路由中間件
app.get('/', (req, res, next) => {
    console.log('這裡是首頁2', req.mfee31, req.dt);
    res.send('Hello Express 9'); //拿掉網頁會一直轉圈圈
});

app.get('/api', (req, res, next) => {

    res.json({
        "name" : "John",
        "age": 18
    })
});


app.get('/api/stocks', async (req, res, next) => {
    // let results = await connection.query('SELECT * FROM stocks');
    // let data = results[0];
  
    let [data] = await pool.query('SELECT * FROM stocks');
    res.json(data);
  });


app.get('/api/stocks/:stockId',async(req, res, next) => {
    console.log('/api/stocks/:stockId=>',req.params.stockId);
    let [data] = await pool.query('SELECT * FROM stock_prices WHERE stock_id=?',[req.params.stockId]);
    res.json(data);
});

app.use((req, res, next) => {
    console.log('這裡是的一個中間件 C');
    next();
  });
  


app.get('/test', (req, res, next) => {
    console.log('這裡是 test 頁面');
    res.send('Hello Test 1');
});

//放在所有的路由中間件的後面
//前面所有的路由都比不到隊的網址時，就會掉到這裡來
//--> 這裡是一個 404 的情況
//利用了中間件會依照程式碼順序來執行的特性來達成
app.use((req, res, next) => {
    console.log('這裡是 404');
    res.send('這裡沒有這個網頁啦')
})

app.listen(3001, () => {
  console.log('Server running at port 3001');
});