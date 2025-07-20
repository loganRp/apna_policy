const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
const mongoose = require('mongoose');

const policyCompanySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, 'Please enter the company name'],
      trim: true,
      minlength: [2, 'Company name must be at least 2 characters long'],
      maxlength: [100, 'Company name must be less than 100 characters']
    },

    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: { createdAt: 'createdOn', updatedAt: false },
    versionKey: false
  }
);


exports.PolicyCompanyModel = conn.model('policyCompany',policyCompanySchema)