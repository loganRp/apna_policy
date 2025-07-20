const { AgentModel } = require("../models/agentModel");


exports.createAgent = async (data) => {
    try {
        let result = await AgentModel.create(data);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

exports.updateAgent = async (data) => {
    try {
        let result = await AgentModel.findByIdAndUpdate(data._id, data, { new: true });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}