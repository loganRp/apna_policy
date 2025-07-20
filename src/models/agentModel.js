const {conn, mongoose} = require('../middleware/connection')
// const validator = require('validator')
var agentSchema = mongoose.Schema({
    name : {
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

exports.AgentModel = conn.model('agent',agentSchema)