const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const { verifyStates, getStatesJSON } = require('../../middleware/verifyStates');

router.route('/')
    .get(getStatesJSON, statesController.getAllStates);

router.route('/:state')
    .get(verifyStates, getStatesJSON, statesController.getState);

router.route('/:state/funfact')
    .get(verifyStates, getStatesJSON, statesController.getFunFact)
    .post(verifyStates, getStatesJSON, statesController.postFunFact)
    .patch(verifyStates, getStatesJSON, statesController.updateFunFact)
    .delete(verifyStates, getStatesJSON, statesController.deleteFunFact);

router.route('/:state/capital')
    .get(verifyStates, getStatesJSON, statesController.getStateCapital);

router.route('/:state/nickname')
    .get(verifyStates, getStatesJSON, statesController.getStateNickname);

router.route('/:state/population')
    .get(verifyStates, getStatesJSON, statesController.getStatePopulation);

router.route('/:state/admission')
    .get(verifyStates, getStatesJSON, statesController.getStateAdmission);


module.exports = router;