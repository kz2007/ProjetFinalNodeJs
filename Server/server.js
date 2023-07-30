require('dotenv').config(({path: __dirname + '/config/.env'}))

let mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();

let UserModel = require('./models/User')
let OrderModel = require('./models/Orders')

const bcrypt = require("bcrypt")
const saltRounds = 10
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});
app.use(require('body-parser').urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.get('*', function(req, res){
  OrderModel.find({}).then((resp)=>{
    res.send(resp);
    return resp;
  }).catch((err) => console.log(err));
});

app.use(express.json());
app.put('*', (req, res) => {
  let newOrder = new OrderModel(req.body.order);
  newOrder.save();
  res.json( req.body.order.Username+" just added an order \n");
}
);


app.post('*', (req, res) => {
  console.log(req.body)
  if(req.body.Operation == 1)
  {
    let newUser = new UserModel(req.body);
    newUser.save();
    res.json( req.body.Username+" has been added to the users database");
  }
  else if(req.body.Operation == 2)
  {
    UserModel.find({Username: req.body.Username}).then((resp)=>{
      bcrypt.compare( req.body.PasswordHash, resp[0].PasswordHash, function( err, res2 ) {
        if( res2 ) {
          res.json( req.body.Username + " has logged on");
        } else {
          res.json("Password is incorrect");
        } 
      });

      return resp;
    }).catch((err) => console.log(err));

  }
  else if(req.body.Operation == 3)
  {
    let newOrder = new OrderModel(req.body.order);
    newOrder.save();
    res.json( req.body.order.Username+" just added an order \n");
  }

}
);

app.delete('*', (req, res) => {  
  let id = req.body._id
  UserModel.findByIdAndRemove(id).then(
    UserModel.find({_id: id}).then((resp)=>{
      console.log(resp);
      return resp;
    }).catch((err) => console.log(err)));
  res.json("Updated");
});

app.listen(3000, () => console.log('Example app is listening on port http://localhost:3000'));