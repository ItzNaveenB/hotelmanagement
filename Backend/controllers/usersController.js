const Users = require("../models/User")

exports.getUsers= async(req,res)=>{
const users = await Users.find({
     
})
}