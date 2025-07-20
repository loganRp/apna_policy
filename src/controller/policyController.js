const { searchPolicyByUsername, getPolicyCountByUser } = require("../services/policyService");

exports.searchPolicyByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    let result = await searchPolicyByUsername(username);
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPolicyCountByUser = async (req, res) => {
  try {
    let result = await getPolicyCountByUser();
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
