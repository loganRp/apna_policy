const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var userAccountSchema = mongoose.Schema({
    acc_name : {
        type : String,
        required : [true,'Please enter name']
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps: { createdAt: 'createdOn', updatedAt: false },
    versionKey: false
  })

exports.UserAccountModel = conn.model('userAccount',userAccountSchema)