const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// 新增一筆 Restaurant 頁面
router.get('/new', (req, res) => {
  Restaurants.find((err, data) => {
    if (err) return console.error(err);
    return res.render('new', { data })
  })
})
// 新增一筆  Restaurant
router.post('', (req, res) => {
  const restaurant = Restaurants(req.body)
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 顯示一筆 Restaurant 的詳細內容
router.get('/:id', (req, res) => {
  Restaurants.findById(req.params.id, (err, data) => {
    if (err) return console.log(err)
    return res.render('show', { data })
  })
})

// 修改 Restaurant 頁面
router.get('/:id/edit', (req, res) => {
  Restaurants.findById(req.params.id, (err, data) => {
    if (err) return console.log(err)
    return res.render('edit', { data })
  })
})

// 修改 Restaurant
router.put('/:id/', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router