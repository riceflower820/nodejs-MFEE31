// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require('axios');
const fs = require('fs/promises');
const moment = require('moment/moment');
const mysql2 = require('mysql');
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
//2618, 2330, 2412




(async () => {
  try {
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

    console.log('await', response.data);
  } catch (e) {
    console.error(e);
  }
})();