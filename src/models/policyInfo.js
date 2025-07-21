const { conn, mongoose } = require("../middleware/connection");
const policyInfoSchema = new mongoose.Schema(
  {
    policy_number: {
      type: String,
      required: [true, "Please enter policy number"],
      trim: true,
    },
    policy_type: {
      type: String,
      required: [true, "Please enter policy type"],
    },
    policy_mode: {
      type: Number,
      required: [true, "Please enter policy mode"],
    },
    policy_start_date: {
      type: Date,
      required: [true, "Please enter policy start date"],
    },

    policy_end_date: {
      type: Date,
      required: [true, "Please enter policy end date"],
    },

    policyCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PolicyCategory",
      required: false, // Set to true if it's always linked
    },

    policyCompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PolicyCompany",
      required: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    hasActive_clientPolicy: {
      type: Boolean,
      default: false,
    },
    premium_amount_written: {
      type: String,
      required: false,
    },
    premium_amount: {
      type: Number,
      required: [true, "Please enter premium amount"],
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: false,
    },
    producer: {
      type: String,
      required: [true, "Please enter producer name"],
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAccount",
      required: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: false },
    versionKey: false,
  }
);

exports.PolicyInfoModel = conn.model(
  "policy_Info",
  policyInfoSchema
);
