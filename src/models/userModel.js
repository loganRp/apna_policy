const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var userSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : [false,'Please enter name']
    },
    dob :{
        type : Date,
        required : [false,'Please enter date of birth']
    },
    phone : {
        type : String,
        required : [false,'Please enter mobile number'],
        unique : false
    },
    countryCode : {
        type : String,
        default : "91",
        required : [false,'Please enter country code']
    },
    state : {
        type : String,
        required : [false,'Please enter state'],
    },
    city :{
        type : String,
        required : [false,'Please enter city']
    },
    email :{
        type : String,
        required : [false,'Please enter email id'],
        unique :[false,"This Emial is already register with us."],
    },
    zip :{
        type : String,
        required : [false,'Please enter zip code'],
    },
    gender :{
        type :String,
        default : "Not Specified",
        required :[false,'Please enter Gender']
    },
    userType :{
        type :String,
        required :[false,'Please enter user type']
    },
    address:{
        type : String,
        required : [false,'Please enter address']
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