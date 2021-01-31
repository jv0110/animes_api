const db = require('../database/database');

class UsersModel{
  get_users = async () => {
    try{
      return await db
      .select(['user_id', 'user_name', 'email'])
      .from('users');
    }catch(err){
      return console.log(err);
    }
  }
  get_user_by_email = async (email) => {
    try{
      return await db
      .select(['user_id', 'email'])
      .from('users')
      .where({ email });
    }catch(err){
      return console.log(err);
    }
  }
  get_email_password = async (email) => {
    try{
      return await db
      .select(['user_id', 'email', 'password'])
      .from('users')
      .where({ email });
    }catch(err){
      return console.log(err);
    }
  }
  new_user = async (data) => {
    try{
     return await db
     .insert(data)
     .into('users');
    }catch(err){
      return console.log(err);
    }
  }
  delete_user = async (user_id) => {
    try{
      return await db
      .table('users')
      .where({ user_id })
      .del();
    }catch(err){
      return console.log(err);
    }
  }
  update_user = async(user_id, data) => {
    try{
      return await db
      .table('users')
      .update(data)
      .where({ user_id });
    }catch(err){
      return console.log(err);
    }
  }
}
module.exports = new UsersModel();