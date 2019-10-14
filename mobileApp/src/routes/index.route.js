const express = require("express");
const authRoutes = require("./auth.route");
const petdetailsRoutes = require("./petdetails.route");
const cmsRoutes = require("./cmsdetails.route");
const lookupRoutes = require("./lookup.route");


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/petdetails", petdetailsRoutes);
router.use("/cmsdetails", cmsRoutes);
router.use("/lookup", lookupRoutes);



module.exports = router