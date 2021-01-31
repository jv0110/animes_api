const bcrypt = require('bcryptjs');
class Validate{
  validate_email = async (email) => {
    const validator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return await validator.test(email) ? true : false;
  }
  validate_password = async (password) => {
    const validate = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8, 255}$/);
    return await validate.test(password) ? true : false;
  }
  hash_password = (password, res) => {
    const salt = bcrypt.genSaltSync(11);
    if(!salt)
      return res.status(500).json({
        err: 'Error saving password'
      })
    const hash = bcrypt.hashSync(password, salt);
    if(!hash)
      return res.status(500).json({
        err: 'Error sabing password'
      })
    return hash;
  }
}
module.exports = Validate;