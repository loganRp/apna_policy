const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var userAccountSchema = mongoose.Schema({
    account_name : {
        type : String,
        required : [true,'Please enter name']
    },
    account_type :{
        type : String,
        default: 'Personal',
        required : [true,'Please enter account type']
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps: { createdAt: 'createdOn', updatedAt: false },
    versionKey: false
  })

exports.UserAccountModel = conn.model('user_Account',userAccountSchema)