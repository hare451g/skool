const mongoose = require('../configs/mongoose');

const AttendanceModel = mongoose.model(
  'attendances',
  new mongoose.Schema(
    {
      schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedules'
      },

      attendances: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
        }
      ],

      abcenses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users'
        }
      ]
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    }
  )
);

module.exports = AttendanceModel;
