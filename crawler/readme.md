1. 安裝 npm i dotenv
2. 建立 .env 檔案 裡面要加 DB_HOST DB_XXX....
3. 把 .env 加進去.gitignore
4. 改寫 test.js，讓他用環境變數的方式設定  EX:host: process.env.DB_HOST
4. 建立 .env.example -> 密碼一定要拿掉，這個只是一個範例，給其他人看自己打了什麼