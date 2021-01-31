const Joi = require('joi');

module.exports = (req, res, next) => {
  const anime_schema = Joi.object({
    anime_name: Joi.string()
    .required(),
    episodes: Joi.number()
    .required(),
    genre: Joi.string()
    .required()
  });
  const validate = anime_schema.validate(req.body);
  if(validate.error){
    return res.status(400).json({
      err: validate.error.details[0].message
    });
  }
  next();
}