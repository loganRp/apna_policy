const express = require('express');
const router = express.Router();
const {
    searchPolicyByUsername,
    getPolicyCountByUser
} = require('../controller/policyController');

// Define routes for policy-related operations
router.get('/searchByUsername', searchPolicyByUsername);
router.get('/getPolicyCountByUser', getPolicyCountByUser);

module.exports = router;
