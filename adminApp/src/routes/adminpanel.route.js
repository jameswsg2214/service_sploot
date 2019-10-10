const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../config/param-validation");
const adminpanelCtrl = require("../controllers/adminpanel.controller");
const router = express.Router();

router.route("/getTable").post(adminpanelCtrl.getTable);
router.route("/createTable").post(adminpanelCtrl.createTable);
router.route("/updateTable ").put(adminpanelCtrl.updateTable );
router.route("/addContent").post(adminpanelCtrl.addContent);
router.route("/getTableaction").post(adminpanelCtrl.getTableaction);
router.route("/deleteTable").put(adminpanelCtrl.deleteTable);
module.exports = router;