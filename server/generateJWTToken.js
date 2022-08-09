const jwt = require('jsonwebtoken');

const genToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token
}

module.exports = genToken