const {conn, mongoose} = require('../middleware/connection')
const policyCategorySchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: [true, 'Please enter policy number'],
      trim: true
    },

    policyStartDate: {
      type: Date,
      required: [true, 'Please enter policy start date']
    },

    policyEndDate: {
      type: Date,
      required: [true, 'Please enter policy end date']
    },

    policyCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PolicyCategory',
      required: false // Set to true if it's always linked
    },

    policyCompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PolicyCompany',
      required: false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
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


exports.PolicyCategoryModel = conn.model('policyCategory',policyCategorySchema)