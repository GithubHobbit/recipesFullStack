import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { DishController } from "../controllers/index.js";

router.post("/dishes", authMiddleware, DishController.create);
router.get("/dishes", DishController.getAllDishes);
router.get("/dishes/:id", DishController.getOne);
router.put("/dishes", authMiddleware, DishController.update);
router.delete("/dishes/:id", authMiddleware, DishController.delete);

router.get("/measures", DishController.getMeasures);
router.get("/ingredients", DishController.getIngredients);
router.get("/dishes_count", DishController.getCountDishes);



export default router;
