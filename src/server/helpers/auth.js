const bcrypt = require('bcrypt');


async function getHash(plaintextPassword) {

	return await bcrypt.hash(plaintextPassword, 10);
}

async function comparePassword(plaintextPassword,passwordHash) {

	return await bcrypt.compare(plaintextPassword, passwordHash);
}


module.exports = {
  getHash,
  comparePassword
};
