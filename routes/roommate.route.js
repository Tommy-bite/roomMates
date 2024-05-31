import { Router } from "express";
import roommateController from "../controllers/roommate.controller.js";

const router = Router();


//PATH /roommate

router.post('/', roommateController.createRoomMateController)
router.get('/', (req, res) => {
    res.json({ok : true})
})

export default router;