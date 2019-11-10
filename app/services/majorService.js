const router = require('express').Router();

const MajorModel = require('../models/MajorModel');

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
    const major = await getAll(MajorModel);
    res.status(200).json({
      message: `fetched ${major.length} major`,
      list: major
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

    const major = await getById(MajorModel, id);

    if (major) {
      res.status(200).json({
        message: `fetched one major`,
        data: major
      });
    } else {
      res.status(404).json({
        message: `there's no stored major with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new major
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    const major = await createNew(MajorModel, { name });

    res.status(201).json({
      message: `created new major: ${major.name}`,
      data: major
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch major by id
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

    const major = await update(MajorModel, id, { name });

    res.status(200).json({
      message: `updated major ${major.name}`,
      data: major
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove major by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedMajor = await remove(MajorModel, id);

    res.status(200).json({
      message: `major ${removedMajor.name} removed`,
      data: removedMajor
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
