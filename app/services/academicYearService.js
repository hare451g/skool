const router = require('express').Router();

const AcademicYearModel = require('../models/AcademicYearModel');

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
    const academicYears = await getAll(AcademicYearModel);
    res.status(200).json({
      message: `fetched ${academicYears.length} academic years`,
      list: academicYears
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

    const academicYear = await getById(AcademicYearModel, id);

    if (academicYear) {
      res.status(200).json({
        message: `fetched one academic year`,
        data: academicYear
      });
    } else {
      res.status(404).json({
        message: `there's no stored academic year with id ${id}`
      });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// create new academicYear
router.post('/', async (req, res) => {
  try {
    const { name, date_start: dateStart, date_end: dateEnd } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    if (!dateStart) {
      throw { message: 'date_start is required !' };
    }

    if (!dateEnd) {
      throw { message: 'date_end is required !' };
    }

    const academicYear = await createNew(AcademicYearModel, {
      name,
      dateStart,
      dateEnd
    });

    res.status(201).json({
      message: `created new academic year: ${academicYear.name}`,
      data: academicYear
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// patch academicYear by id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const { name, date_start: dateStart, date_end: dateEnd } = req.body;

    if (!name) {
      throw { message: 'name is required !' };
    }

    if (!dateStart) {
      throw { message: 'date_start is required !' };
    }

    if (!dateEnd) {
      throw { message: 'date_end is required !' };
    }

    const academicYear = await update(AcademicYearModel, {
      id,
      name,
      dateStart,
      dateEnd
    });

    res.status(200).json({
      message: `updated academic year ${academicYear.name}`,
      data: academicYear
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

// remove academicYear by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw { message: 'id is required !' };
    }

    const removedAcademicYears = await remove(AcademicYearModel, id);

    res.status(200).json({
      message: `academic year ${removedAcademicYears.name} removed`,
      data: removedAcademicYears
    });
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
