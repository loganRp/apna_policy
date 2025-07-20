const jwt = require('jsonwebtoken')
const {EmployeeModel} = require('../models/agentModel')
const jwtToken = require('../middleware/auth')

exports.searchPolicyByUsername = async(data)=>{

    if (!data) {
      return res.status(400).json({ message: "Username is required." });
    }
    
    const policies = await Policy.find({ username: { $regex: data, $options: 'i' } });

    if (!policies.length) {
      return res.status(404).json({ message: "No policy found for this username." });
    }

    res.status(200).json(policies);
}


exports.getPolicyCountByUser = async() => {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPolicies: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          username: "$userInfo.username",
          totalPolicies: 1,
        },
      },
    ]);

    res.status(200).json(result);
};
