const GenresModel = require('../models/genre_model');

class GenresController{
  get_genres = async (req, res) => {
    try{
      const genres = await GenresModel.getGenres();
      if(!genres.length) return res.status(404).json({ msg: 'No genres found' });
      return res.status(200).json(genres);
    }catch(err){
      return console.log(err);
    }
  }
  new_genre = async (req, res) => {
    const data = {
      ...req.body,
      createdAt: new Date()
    }
    try{
      const genre = await GenresModel.new_genre(data);
      if(!genre) return res.status(500).json({ msg: 'Could not post the new genre' });
      return res.status(200).json({
        msg: 'Genre posted :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
  delete_genre = async (req, res) => {
    const {genre} = req.body;
    if(typeof genre === 'undefined')
      return res.status(400).json({
        msg: 'Please specify the genre to be deleted'
      });
    try{
      const get_genre = await GenresModel.get_genre_by_name(genre);
      if(!get_genre.length) return res.status(404).json({
        msg: "Could not find the genre"
      });
      const del = await GenresModel.delete_genre(get_genre[0].genre_id);
      if(!del) return res.status(500).json({
        msg: 'Error deleting the genre'
      });
      return res.status(200).json({
        msg: 'Genre deleted :)'
      });
    }catch(err){
      return console.log(err);
    }
  }
  update_genre = async (req, res) => {
    const {genre} = req.body;
    
    if(typeof genre === 'undefined')
      return res.status(400).json({
        msg: 'Please specify the genre to be updated'
      });
    if(typeof req.body.new === 'undefined')
      return res.status(200).json({
        msg: 'Nothing was updated :)'
      });
    const data = {
      ...req.body.new,
      updatedAt: new Date()
    }
    try{
      const get_genre = await GenresModel.get_genre_by_name(genre);
      if(!genre.length) return res.status(404).json({
        msg: 'Could not find the genre to be updated.'
      });
      const update = await GenresModel.update_genre(get_genre[0].genre_id, data);
      if(!update)
        return res.status(500).json({
          msg: 'Error updating the genre'
        });
      return res.status(200).json({
        msg: 'Genre updated'
      });
    }catch(err){
      return console.log(err);
    }
  }
}

module.exports = new GenresController();