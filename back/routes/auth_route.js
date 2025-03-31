const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth_ctrl");
const auth = require("../middlewares/auth");

router.get("/getMyInfo", auth, authCtrl.getMyInfo);
router.get("/disconnect", auth, authCtrl.disconnect);
router.get("/getFriendRequests/:senderEmail", auth, authCtrl.getFriendRequests);
router.get("/getMyFriends/:myId", auth, authCtrl.getMyFriends);
router.get("/getFriendInfo/:friendId", auth, authCtrl.getFriendInfo);
router.post("/signUp", authCtrl.signUp);
router.post("/logIn", authCtrl.logIn);
router.post("/friendRequest", auth, authCtrl.friendRequest);
router.post("/acceptFriend", auth, authCtrl.acceptFriend);
router.put("/update", auth, authCtrl.update);
router.put("/updateImg", auth, authCtrl.updateImg);

module.exports = router;