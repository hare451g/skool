const mongoose = require('../configs/mongoose');

const ProfileModel = mongoose.model(
  'profiles',
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: Date,
        required: true
      },
      placeOfBirth: {
        type: String,
        required: true
      },
      contacts: {
        type: [
          {
            type: {
              type: String,
              enum: ['Phone Number', 'Email', 'Home Phone Number']
            },
            value: {
              type: String
            }
          }
        ]
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      relatedPerson: [
        {
          person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
          },
          relation: {
            type: String,
            enum: ['Parent', 'Children']
          }
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

module.exports = ProfileModel;
