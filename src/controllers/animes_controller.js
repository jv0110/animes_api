const AnimesModel = require('../models/animes_model');
const GenresModel = require('../models/genre_model');

class AnimesController{
  get_animes = async (req, res) => {
    try{
      const animes = await AnimesModel.get_animes();
      if(!animes.length) return res.status(404).json({ msg: 'No animes found' });
      return res.status(200).json({ animes });
    }catch(err){
      return console.log(err);
    }
  }
  new_anime = async (req, res) => {
    const data = {
      ...req.body,
      createdAt: new Date()
    }
    try{
      const genre = await GenresModel.get_genre_by_name(data.genre);
      if(!genre) return res.status(404).json({ msg: 'No Genres found' });

      data.genre = genre[0].genre_id;
      const new_anime = await AnimesModel.new_anime(data);
      if(!new_anime) return res.status(500).json({
        msg: 'Could not insert new anime'
      });
      return res.status(200).json({
        msg: 'Anime posted :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
  update_anime = async (req, res) => {
    const { anime_name } = req.body;
    if(typeof anime_name === 'undefined')
      return res.status(404).json({ msg: 'Please especify the anime to be updated.' });
    if(typeof req.body.new === 'undefined')
      return res.status(200).json({ msg: 'Nothing was updated :)' });

    const data = {
      ...req.body.new,
      updatedAt: new Date()
    }
    try{
      const anime = await AnimesModel.get_anime_by_name(anime_name);
      if(!anime.length) return res.status(404).json({ msg: 'Could not find the anime to be updated.' });

      if(typeof data.genre !== 'undefined'){
        let genre = await GenresModel.get_genre_by_name(data.genre);
        if(!genre.length) return res.status(404).json({ msg: 'Could not find the genre specified' });
        data.genre = genre[0].genre_id
      }
      const update = await AnimesModel.update_anime(anime[0].anime_id, data);
      if(!update) return res.status(500).json({ msg: 'Error updating the anime. '});

      return res.status(200).json({
        msg: 'Anime updated :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
  delete_anime = async (req, res) => {
    const {anime_name} = req.body;
    if(typeof anime_name === 'undefined')
      return res.status(400).json({
        msg: 'Please, especify the anime to be deleted'
      });
    try{
      const anime = await AnimesModel.get_anime_by_name(anime_name);
      if(!anime) return res.status(404).json({ msg: 'No anime found' });
      
      const del = await AnimesModel.delete_anime(anime[0].anime_id);
      if(!del) return res.status(500).json({ msg: 'Could no delete the anime' });

      return res.status(200).json({
        msg: 'Anime deleted :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
}
module.exports = new AnimesController();