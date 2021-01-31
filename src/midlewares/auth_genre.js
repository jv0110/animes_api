const Joi = require('joi');

module.exports = (req, res, next) => {
  const genre_schema = Joi.object({
    genre: Joi.string()
    .required()
  });
  const validate = genre_schema.validate(req.body);
  if(validate.error){
    return res.status(400).json({
      msg: validate.error.details[0].message
    });
  }
  next();
}