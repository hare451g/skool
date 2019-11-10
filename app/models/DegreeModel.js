const mongoose = require('../configs/mongoose');

const DegreeModel = mongoose.model(
  'degrees',
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

module.exports = DegreeModel;
