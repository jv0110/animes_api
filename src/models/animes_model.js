const db = require('../database/database');

class AnimesModel{
  get_animes = async () => {
    try{
      return await db
      .select(['anime_id', 'anime_name', 'episodes'])
      .from('animes');
    }catch(err){
      return console.log(err);
    }
  }
  get_anime_by_name = async (anime_name) => {
    try{
      return await db
      .select(['anime_id'])
      .from('animes')
      .where({ anime_name });
    }catch(err){
      return console.log(err);
    }
  }
  new_anime = async (data) => {
    try{
      return await db
      .insert(data)
      .into('animes');
    }catch(err){
      return console.log(err);
    }
  }
  delete_anime = async (anime_id) => {
    try{
      return await db
      .table('animes')
      .where({ anime_id })
      .del();
    }catch(err){
      return console.log(err);
    }
  }
  update_anime = async (anime_id, data) => {
    try{
      return await db
      .table('animes')
      .update(data)
      .where({ anime_id });
    }catch(err){
      return console.log(err);
    }
  }
}
module.exports = new AnimesModel();