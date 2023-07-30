let mongoose = require('mongoose')
const bcrypt = require("bcrypt")
let UserSchema = new mongoose.Schema( { 
  Username:String,
  PasswordHash: String
})

UserSchema.pre("save", async function (next) {
  try {
    const Salt = await bcrypt.genSalt(10)
    const HashedPassword = await bcrypt.hash(this.PasswordHash, Salt)
    this.PasswordHash = HashedPassword
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Users', UserSchema)