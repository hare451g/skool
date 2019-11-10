const mongoose = require('../configs/mongoose');

const ClassModel = mongoose.model(
  'classes',
  new mongoose.Schema(
    {
      academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicYears'
      },
      name: {
        type: String,
        required: true
      },
      degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'degrees'
      },
      major: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors'
      },
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
        }
      ],
      pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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

module.exports = ClassModel;
