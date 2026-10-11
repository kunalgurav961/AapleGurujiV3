import { Router } from "express";
import {
  createAdminUser,
  createAdminPuja,
  deleteAdminUser,
  deleteAdminPuja,
  getAdminPujas,
  getAdminSamagri,
  getAdminUsers,
  updateAdminPuja,
  updateAdminSamagri,
  updateAdminUser,
} from "../controller/adminController.js";
import { requireAdminKey } from "../middleware/adminAuth.js";

const adminRouter = Router();

adminRouter.use(requireAdminKey);

adminRouter.get("/users", getAdminUsers);
adminRouter.post("/users", createAdminUser);
adminRouter.patch("/users/:id", updateAdminUser);
adminRouter.delete("/users/:id", deleteAdminUser);

adminRouter.get("/pujas", getAdminPujas);
adminRouter.post("/pujas", createAdminPuja);
adminRouter.patch("/pujas/:id", updateAdminPuja);
adminRouter.delete("/pujas/:id", deleteAdminPuja);

adminRouter.get("/samagri", getAdminSamagri);
adminRouter.patch("/pujas/:id/samagri", updateAdminSamagri);

export default adminRouter;
