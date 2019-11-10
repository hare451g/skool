require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middlewares
const auth = require('../middleware/auth');

// models
const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');

const {
  getAll,
  getById,
  getDocument,
  createNew,
  update,
  remove
} = require('../functions/crud');

const { SALT_ROUNDS, JWT_SECRET } = process.env;

// Get All
router.get('/', auth, async (req, res) => {
  try {
    const users = await getAll(UserModel, ['role']);
    res.status(200).json({
      message: `fetched ${users.length} users`,
      list: users
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// get logged user info via token
router.get('/me', auth, async (req, res) => {
  try {
    if (!req.user) {
      throw { message: 'You must be logged in' };
    }

    const { _id } = req.user;

    const user = await getById(UserModel, _id, ['role']);

    res.status(201).json({
      data: user
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get by id
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const user = await getById(UserModel, id, ['role']);

    if (user) {
      res.status(200).json({
        message: `fetched one user`,
        data: user.populate('profiles')
      });
    } else {
      res.status(404).json({
        message: `there's no stored user with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role_id: roleId } = req.body;

    const role = await getById(RoleModel, roleId);

    // encrypt password
    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(SALT_ROUNDS)
    );

    const user = await createNew(UserModel, {
      role: role._id,
      username,
      password: encryptedPassword
    });

    res.status(201).json({
      message: `created new user: ${user.username}`,
      data: user
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// obtain jwt token
router.post('/obtain-token', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getDocument(UserModel, { username });

    if (!user) {
      throw { message: `user ${username} is not registered !` };
    }

    if (!password) {
      throw { message: 'password is required!' };
    }

    // compare password hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw { message: 'username and password did not match' };
    }

    // generate token
    const token = jwt.sign({ user }, JWT_SECRET);

    res.status(201).json({
      message: 'Login success',
      data: {
        username: user.username,
        _id: user._id,
        type: 'JWT',
        token
      }
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch user by id
router.patch('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const { username, role_id: roleId } = req.body;

    const user = await update(UserModel, id, { username, role: roleId });

    res.status(200).json({
      message: `updated user ${user.username}`,
      data: user
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove user by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedUser = await remove(UserModel, id);

    res.status(200).json({
      message: `user ${removedUser.username} removed`,
      data: removedUser
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
