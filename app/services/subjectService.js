const router = require('express').Router();

const SubjectModel = require('../models/SubjectModel');
const DegreeModel = require('../models/DegreeModel');
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
    const subjects = await getAll(SubjectModel, ['degree', 'major']);
    res.status(200).json({
      message: `fetched ${subjects.length} subjects`,
      list: subjects
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

    const subject = await getById(SubjectModel, id, ['degree', 'major']);

    if (subject) {
      res.status(200).json({
        message: `fetched one subject`,
        data: subject.populate('degrees')
      });
    } else {
      res.status(404).json({
        message: `there's no stored subject with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new subject
router.post('/', async (req, res) => {
  try {
    const { name, major_id: majorId, degree_id: degreeId } = req.body;

    const major = await getById(MajorModel, majorId);
    const degree = await getById(DegreeModel, degreeId);

    const subject = await createNew(SubjectModel, {
      name,
      major: major._id,
      degree: degree._id
    });

    res.status(201).json({
      message: `created new subject: ${subject.name}`,
      data: subject
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch subject by id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const subject = await update(SubjectModel, id, req.body);

    res.status(200).json({
      message: `updated subject ${subject.name}`,
      data: subject
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove subject by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedSubject = await remove(SubjectModel, id);

    res.status(200).json({
      message: `subject ${removedSubject.name} removed`,
      data: removedSubject
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
