const bcrypt = require('bcrypt');
const saltRounds = 10;

 genPassword=(password)=> {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return {
    hash: hash
  };
}
validPassword=(password, storedHash) =>{
  return bcrypt.compareSync(password, storedHash);
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;