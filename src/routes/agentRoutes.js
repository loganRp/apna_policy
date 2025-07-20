const express = require('express')
const router = express.Router()
const {
    updateAgent,
    deleteAgent,
    getAgentList,
    createAgent
} = require('../controller/agentController');

router.post('/createAgent', createAgent);
router.put('/updateAgent', updateAgent);
router.delete('/deleteAgent', deleteAgent);
router.get('/getAgentList', getAgentList);

module.exports = router;