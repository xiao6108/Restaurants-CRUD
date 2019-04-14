// 載入 express
const express = require('express')
// 啟用 express
const app = express()
// 載入 mongoose
const mongoose = require('mongoose')
// 設定連線到 mongoDB
// 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/restaurant',{ useNewUrlParser: true })

// mongoose連線後拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', ()=>{
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 restaurant model
const Restaurants = require('./models/restaurants')

// 設定第一個首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})