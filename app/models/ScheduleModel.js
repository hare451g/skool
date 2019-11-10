const mongoose = require('../configs/mongoose');

const ScheduleModel = mongoose.model(
  'schedules',
  new mongoose.Schema(
    {
      academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicYears'
      },
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes'
      },
      dayIndex: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true
      },
      timeStart: {
        type: String,
        required: true
      },
      timeEnd: {
        type: String,
        required: true
      },
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes'
      },
      type: {
        type: String,
        enum: ['class', 'outdoor', 'exam', 'day-off', 'finals'],
        required: true
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

module.exports = ScheduleModel;
