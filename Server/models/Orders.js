let mongoose = require('mongoose')
let Orderchema = new mongoose.Schema( { 
  Products:[{ id: String, count: Number}],
  Username: String,
  State: Number
})
module.exports = mongoose.model('Orders', Orderchema)