// 載入 express
const express = require('express')
// 啟用 express
const app = express()
// 啟用 express-handlebars
const exphbs = require('express-handlebars')
// 啟用 body-parser
const bodyParser = require('body-parser')
// 載入 mongoose
const mongoose = require('mongoose')
// 設定連線到 mongoDB
// 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

// mongoose連線後拿到 Connection 的物件
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 restaurant model
const Restaurants = require('./models/restaurants')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Setting static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 列出全部 restaurant 頁面
app.get('/', (req, res) => {
  Restaurants.find((err, data) => {
    if (err) return console.error(err);
    return res.render('index', { data })
  })
})

// 新增一筆 Restaurant 頁面
app.get('/Restaurants/new', (req, res) => {
  Restaurants.find((err, data) => {
    if (err) return console.error(err);
    return res.render('new', { data })
  })
})
// 新增一筆  Restaurant
app.post('/Restaurants', (req, res) => {
  const restaurant = Restaurants(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 顯示一筆 Restaurant 的詳細內容
app.get('/Restaurants/:id', (req, res) => {
  Restaurants.findById(req.params.id, (err, data) => {
    if (err) return console.log(err)
    return res.render('show', {data})
  })
})

// 修改 Restaurant 頁面
app.get('/Restaurants/:id/edit', (req, res) => {
  Restaurants.findById(req.params.id, (err, data) => {
    if (err) return console.log(err)
    return res.render('edit', {data})
  })
})

// 修改 Restaurant
app.post('/Restaurants/:id/', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    Object.assign(restaurant, req.body)

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 刪除 Restaurant
app.post('/Restaurants/:id/delete', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})