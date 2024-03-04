const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();




router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
// router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id',  userController.deleteUser)
router.get('/getAll',  userController.getAllUser)
router.get('/get-details/:id', userController.getDetailsUser)

// router.put('/update-user/:id', authUserMiddleWare, userController.updateUser)
// router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
// router.get('/getAll', authMiddleWare, userController.getAllUser)
// router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)
module.exports = router;