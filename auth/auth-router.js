const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const atuthenticate = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(403)
      .json({ message: 'invalid username or password' })
  } else {
    Users.add({ username, password: bcrypt.hashSync(password, 4) })
      .then(user => {
        res.status(200)
          .json({ message: 'register successful', username: username })
      })
      .catch(err => {
        console.log(err)
        res.status(500)
          .json({ message: 'failed to register' })
      })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  if(!username || !password) {
    res.status(403)
    .json({ message: "invalid usernam or password" })
  }else {
    Users.findByUsername(username)
      .then(user =>{
        if(user && bcrypt.compareSync(password, user.password)){
          const token = createToken(user)

          res.status(200)
            .json({ message: "login successful", username: username, token })
        } else {
          res.status(401)
          .json({ message: "incorrect login info" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500)
          .json({ message: "error logging in user" })
      })
  }
});

function createToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  }
  const options = {
    expiresIn: '1d'
  }

  const secret = process.env.JWT_SECRET || "issasecret";

  return jwt.sign(payload, secret, options);
}

module.exports = router;
