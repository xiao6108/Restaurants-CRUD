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
// 引用 method-override
const methodOverride = require('method-override')

// 設定連線到 mongoDB 加上 { useNewUrlParser: true }
// mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
// 設定 method-override
app.use(methodOverride('_method'))


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

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/sort', require('./routes/sort'))

// 設定 express port 3000
// app.listen(3000, () => {
//   console.log('App is running')
// })

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})