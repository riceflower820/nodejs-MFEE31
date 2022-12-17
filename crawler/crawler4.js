// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require('axios');
const fs = require('fs/promises');
const moment = require('moment/moment');
const mysql2 = require('mysql/promise');
require('dotenv').config();
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
//2618, 2330, 2412




(async () => {
  let connection;
  try {
    connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
  });
    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    //console.log('await 來的', number);
    let date = moment().format('YYYYMMDD');
    console.log(date);
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    let rawData = response.data.data;

    let [result] = await connection.query('INSERT INTO stock_mfee31(')
  } catch (e) {
    console.error(e);
  } finally{
    if(connection){
      connection.end();
    }
  }
})();