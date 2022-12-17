const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

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
    console.log('這裡是首頁', req.mfee31, req.dt);
    res.send('Hello Express 10'); //拿掉網頁會一直轉圈圈
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