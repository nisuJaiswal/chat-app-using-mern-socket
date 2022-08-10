const jwt = require('jsonwebtoken');

const genToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    return token
}

module.exports = genToken