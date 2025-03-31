const express = require("express");
const router = express.Router();
const sound_ctrl = require("../controllers/sound_ctrl");
const auth = require("../middlewares/auth");

router.get("/:soundName", sound_ctrl.playSound);


module.exports = router;