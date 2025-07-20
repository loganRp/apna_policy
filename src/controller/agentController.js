const {createAgent, updateAgent} = require("../services/agentService");

exports.createAgent = async(req, res)=>{
    try{
        let data = req.body
        let result = await createAgent(data)
        return res.status(200).json({
            message : 'success',
            data : result
        })
    }catch(err){
        res.status(403).json({
            message : err.message
        })
    }
}
exports.updateAgent = async(req, res)=>{
    try{
        let data = req.body
        let result = await updateAgent(data)
        return res.status(200).json({
            message : 'success',
            data : result
        })
    }catch(err){
        res.status(403).json({
            message : err.message
        })
    }
}
exports.deleteAgent= async(req, res)=>{
    try{
        let {_id} = req.query
        let result = await deleteImployee(_id)
        return res.status(200).json({
            message : 'success',
            data : result
        })
    }catch(err){
        res.status(403).json({
            message : err.message
        })
    }
}
exports.getAgentList = async(req, res)=>{
    try{
        let result = await EmployeeModel.find({isDelete : false}).sort({"createdOn" : -1})
        return res.status(200).json({
            message : 'success',
            data : result
        })
    }catch(err){
        res.status(403).json({
            message : err.message
        })
    }
}