const router = require('express').Router();

const RoleModel = require('../models/RoleModel');

const {
  getAll,
  getById,
  createNew,
  update,
  remove
} = require('../functions/crud');

// Get All
router.get('/', async (req, res) => {
  try {
    const roles = await getAll(RoleModel);
    res.status(200).json({
      message: `fetched ${roles.length} roles`,
      list: roles
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const role = await getById(RoleModel, id);

    if (role) {
      res.status(200).json({
        message: `fetched one role`,
        data: role
      });
    } else {
      res.status(404).json({
        message: `there's no stored role with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new role
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    const role = await createNew(RoleModel, { name });

    res.status(201).json({
      message: `created new role: ${role.name}`,
      data: role
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch role by id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const { name } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    const role = await update(RoleModel, id, { name });

    res.status(200).json({
      message: `updated role ${role.name}`,
      data: role
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove role by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedRole = await remove(RoleModel, id);

    res.status(200).json({
      message: `role ${removedRole.name} removed`,
      data: removedRole
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
