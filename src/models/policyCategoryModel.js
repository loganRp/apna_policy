const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var policyCategorySchema = mongoose.Schema({
    category_name : {
        type : String,
        required : [true,'Please enter category name']
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps: { createdAt: 'createdOn', updatedAt: false },
    versionKey: false
  })

exports.PolicyCategoryModel = conn.model('policy_Category',policyCategorySchema)