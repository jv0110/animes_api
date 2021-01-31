const Validate = require('../modules/validate');
const UsersModel = require('../models/users_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsersController extends Validate{
  constructor(){
    super()
  }
  get_users = async (req, res) => {
    try{
      const users = await UsersModel.get_users();
      if(!users.length) return res.status(404).json({
        msg: 'No users found'
      });
      return res.status(200).json(users);
    }catch(err){
      return console.log(err);
    }
  }
  new_user = async (req, res) => {
    const data = {
      ...req.body,
      createdAt: new Date()
    }
    try{
      const user = UsersModel.get_user_by_email(data.email);
      if(user.length) return res.status(401).json({
        msg: 'Email already exists'
      });
      data.password = this.hash_password(data.password, res);
      
      const new_user = UsersModel.new_user(data);
      if(!new_user) return res.status(500).json({
        msg: 'Could create the new user. An error has ocurred'
      });
      return res.status(200).json({
        msg: 'User Created :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
  login = async (req, res) => {
    const { email, password } = req.body;

    if(!this.validate_email(email))
      return res.status(400).json({
        msg: 'Invalid email'
      });
    try{
      const user = await UsersModel.get_email_password(email);
      if(!user.length) return res.status(404).json({
        msg: 'User not found'
      });
      const val_password = bcrypt.compareSync(password, user[0].password);
      if(!val_password) return res.status(400).json({
        msg: 'Wrong password'
      });

      const access_token = await jwt.sign({
        user_id: user[0].user_id
      }, process.env.JWT_PASS, { expiresIn: '2h' });
      if(!access_token)
        return res.status(500).json({
          msg: 'Error loggin in'
        });
      return res.status(200).json({
        access: access_token
      })
    }catch(err){
      return console.log(err);
    }
  }
  delete_user = async (req, res) => {
    const { email } = req.body;
    
    if(!this.validate_email(email))
      return res.status(400).json({
        msg: 'Invalid Email'
      });
    try{
      const user = await UsersModel.get_user_by_email(email);
      if(!user.length) return res.status(404).json({
        msg: 'No user found'
      });
      const del_user = await UsersModel.delete_user(user[0].user_id);
      if(!del_user) return res.status(500).json({
        msg: 'Error deleting the user'
      });
      return res.status(200).json({
        msg: 'User deleted'
      });
    }catch(err){
      return console.log(err);
    }
  }
  update_user = async (req, res) => {
    const { email } = req.body;
    if(!this.validate_email(email))
      return res.status(400).json({
        msg: 'Invalid email'
      });
    if(!req.body.new)
      return res.status(200).json({
        msg: 'Nothing was updated :)'
      });
    const data = {
     ...req.body.new,
     updatedAt: new Date()
    }
    try{
      const user = await UsersModel.get_email_password(email);
      if(!user.length) return res.status(404).json({
        msg: 'No user found'
      })
      if(data.email && !this.validate_email(data.email))
        return res.status(400).json({
          msg: 'The new email is invalid'
        });
      if(data.password && !this.validate_password(data.password))
        return res.status(400).json({
          msg: 'invalid password'
        });
      
      data.password = this.hash_password(data.password, res);
      const update = await UsersModel.update_user(user[0].user_id, data);
      if(!update)
        return res.status(500).json({
          err: 'Error updating the user'
        });
      return res.status(200).json({
        msg: 'User updated :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
}
module.exports = new UsersController();