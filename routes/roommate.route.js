import { Router } from "express";
import roommateController from "../controllers/roommate.controller.js";

const router = Router();


//PATH /roommate

router.post('/', roommateController.createRoomMateController)
router.get('/', roommateController.getRoomMateController)

export default router;