const mongoose = require('../configs/mongoose');

const AcademicYearModel = mongoose.model(
  'academicYears',
  new mongoose.Schema(
    {
      name: {
        type: String,
        unique: true
      },
      dateStart: {
        type: Date,
        required: true
      },
      dateEnd: {
        type: Date,
        require: true
      }
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
  )
);

module.exports = AcademicYearModel;
