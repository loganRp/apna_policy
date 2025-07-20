const {createImployee,updateImployee, deleteImployee } = require("../services/policyService");
const {EmployeeModel} = require('../models/agentModel')

exports.createImployee = async(req, res)=>{
    try{
        let data = req.body
        let result = await createImployee(data)
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
exports.updateImployee = async(req, res)=>{
    try{
        let data = req.body
        let result = await updateImployee(data)
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
exports.deleteImployee= async(req, res)=>{
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
exports.getEmployeeList = async(req, res)=>{
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