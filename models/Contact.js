const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    surname: { type: String, required: true, index: true},
    name: { type: String, required: true, index: true},
    area: { type: String, required: true },
    address: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
    },
    organisation: { type: String },
  },
  { timestamps: true }
);

// Example method to get full name
contactSchema.methods.getFullName = function () {
  return `${this.name} ${this.surname}`;
};

module.exports = mongoose.model('Contact', contactSchema);
