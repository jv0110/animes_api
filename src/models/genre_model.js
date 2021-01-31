const db = require('../database/database');

class GenreModel{
  getGenres = async () => {
    try{
      return await db
      .select(['genre_id', 'genre'])
      .from('genres'); 
    }catch(err){
      return console.log(err);
    }
  }
  get_genre_by_name = async (genre) => {
    try{
      return await db
      .select(['genre_id', 'genre'])
      .from('genres')
      .where({ genre })
    }catch(err){
      return console.log(err);
    }
  }
  new_genre = async (data) => {
    try{
      return await db
      .insert(data)
      .into('genres');
    }catch(err){
      return console.log(err);
    }
  }
  delete_genre = async (genre_id) => {
    try{
      return await db
      .table('genres')
      .where({ genre_id })
      .del();
    }catch(err){
      return console.log(err);
    }
  }
  update_genre = async (genre_id, data) => {
    try{
      return await db
      .table('genres')
      .update(data)
      .where({ genre_id });
    }catch(err){
      return console.log(err);
    }
  }
}
module.exports = new GenreModel();