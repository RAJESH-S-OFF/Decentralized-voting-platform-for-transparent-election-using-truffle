const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    aadhaar: { type: String, required: true, unique: true }, // Aadhar number, must be unique
    name: { type: String, required: true },                 // Name of the person
    age: { type: Number, required: true },                  // Age of the person
    email: { type: String, required: true },                // Email ID
    contact_no: { type: String, required: true },           // Contact number
    address: { type: String, required: true },              // Address
    constituency: { type: String, required: true }          // Constituency name
});

module.exports = mongoose.model('Aadhaar', peopleSchema,'Aadhaar');
