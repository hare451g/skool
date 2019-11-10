const router = require('express').Router();

const DegreeModel = require('../models/DegreeModel');

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
    const degree = await getAll(DegreeModel);
    res.status(200).json({
      message: `fetched ${degree.length} degree`,
      list: degree
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

    const degree = await getById(DegreeModel, id);

    if (degree) {
      res.status(200).json({
        message: `fetched one degree`,
        data: degree
      });
    } else {
      res.status(404).json({
        message: `there's no stored degree with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new degree
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    const degree = await createNew(DegreeModel, { name });

    res.status(201).json({
      message: `created new degree: ${degree.name}`,
      data: degree
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch degree by id
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

    const degree = await update(DegreeModel, id, { name });

    res.status(200).json({
      message: `updated degree ${degree.name}`,
      data: degree
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove degree by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedDegree = await remove(DegreeModel, id);

    res.status(200).json({
      message: `degree ${removedDegree.name} removed`,
      data: removedDegree
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
