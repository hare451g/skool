const mongoose = require('../configs/mongoose');

const RoleModel = mongoose.model(
  'roles',
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

module.exports = RoleModel;
