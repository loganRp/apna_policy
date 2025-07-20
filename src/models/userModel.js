const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : [true,'Please enter name']
    },
    lastname : {
        type : String,
        required : [true,'Please enter last name']
    },
    dob :{
        type : Date,
        required : [true,'Please enter date of birth']
    },
    mobileNumber : {
        type : Number,
        required : [true,'Please enter mobile number'],
        unique : true
    },
    countryCode : {
        type : Number,
        required : [true,'Please enter country code']
    },
    state : {
        type : String,
        required : [true,'Please enter state'],
    },
    emailId :{
        type : String,
        required : [true,'Please enter email id'],
        unique :[true,"This Emial is already register with us."],
    },
    zipCode :{
        type : Number,
        required : [true,'Please enter email id'],
    },
    gender :{
        type :String,
        required :[true,'Please enter Gender']
    },
    userType :{
        type :String,
        required :[true,'Please enter user type']
    },
    isDelete : {
        type : Boolean,
        default : false
    }
},{
    timestamps: { createdAt: 'createdOn', updatedAt: false },
    versionKey: false
  })

exports.UserModel = conn.model('users',userSchema)