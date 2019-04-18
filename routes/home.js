const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// 列出全部 restaurant 頁面
router.get('/', (req, res) => {
  Restaurants.find((err, data) => {
    if (err) return console.error(err);
    return res.render('index', { data })
  })
})



module.exports = router