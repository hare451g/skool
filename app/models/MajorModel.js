const mongoose = require('../configs/mongoose');

const MajorModel = mongoose.model(
  'majors',
  new mongoose.Schema(
    {
      name: {
        type: String,
        unique: true
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

module.exports = MajorModel;
