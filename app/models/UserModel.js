const mongoose = require('../configs/mongoose');

const UserModel = mongoose.model(
  'users',
  new mongoose.Schema(
    {
      role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
      },
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles'
      },
      username: {
        type: String,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      isActive: {
        type: Boolean,
        required: true,
        default: false
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

module.exports = UserModel;
