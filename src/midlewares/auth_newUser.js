const Joi = require('joi');

module.exports = (req, res, next) => {
  const user_schema = Joi.object({
    user_name: Joi.string()
    .required(),
    email: Joi.string()
    .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .required(),
    password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .required()
  });
  const validate = user_schema.validate(req.body);
  if(validate.error){
    return res.status(400).json({
      error: validate.error.details[0].message
    });
  }
  next();
}