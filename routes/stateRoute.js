
const express = require("express");
const router = express();
const stateController = require("../controller/stateFromData");
// const stateController = require("../controller/stateFromMongo");

router
    .route("/")
    .get(stateController.getAllStates)
    .post(stateController.createNewState)
    .put(stateController.updateState)
    .delete(stateController.deleteState);

router.route("/:stateCode").get(stateController.getState);
router.route("/:stateCode/capital").get(stateController.getCapital);
router.route("/:stateCode/nickname").get(stateController.getNickName);
router.route("/:stateCode/population").get(stateController.getPopulation);
router.route("/:stateCode/admission").get(stateController.getAdmission);
router.route("/:stateCode/funfact").get(stateController.getFunFact);


module.exports = router;