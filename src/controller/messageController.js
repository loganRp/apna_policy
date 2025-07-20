const {scheduleMessage } = require("../services/messageService");

exports.scheduleMessage = async(req, res)=>{
    try{
        let data = req.body
        let result = await scheduleMessage(data)
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