import { Router } from "express";
import gastoController from "../controllers/gasto.controller.js";

const router = Router();

//PATH /gasto

router.get('/', gastoController.getGastosController)
router.post('/', gastoController.createGastoController)
router.delete('/:id', gastoController.deleteGastoController)
router.put('/:id', gastoController.updateGastoController)

export default router;