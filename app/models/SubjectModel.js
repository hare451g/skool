const mongoose = require('../configs/mongoose');

const SubjectModel = mongoose.model(
  'subjects',
  new mongoose.Schema(
    {
      name: {
        type: String,
        unique: true
      },
      degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'degrees'
      },
      major: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors'
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

module.exports = SubjectModel;
