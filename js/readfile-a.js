const fs = require('fs');

// error-first callback
// fs.readFile('test.txt', 'utf-8', (err, data) => {
//   if (err) {
//     // 如果 err 有值，表示有錯誤發生
//     // 這裡應該要處理錯誤
//     console.error('發生錯誤了', err);
//   } else {
//     // 進來這裡，表示 err 是空的 (可能是 null)
//     console.log('成功讀到資料:', data);
//   }
// });

let p = new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf-8', (err, data) =>{
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
});

// async function doJob(){
//     let data = await p
// }
// //函式名稱() -> 呼叫
// doJob();


/-----------IIEF------------/

//let test = function() {};
//test()
//----上下一樣------
//let test = () => {};
//test();

//function test(a, b){};   test();  -> 呼叫一般寫法
//(function test(a, b){})(); -> 立即呼叫
//((a, b) => {})() ->立即呼叫的縮寫 -> 最後一個() 就是上上一條的test()
(async ()=>{
    try{
        let data = await p 
        //回去上面 console.log抓resolve(data) data 是test.txt的內容
        console.log('用 await 拿到的結果', data)
    }catch(e){
        console.log('catch 到的錯誤', e)
    }
})();