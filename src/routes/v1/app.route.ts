import { Router } from "express";
const router: Router = Router();

import {
  getAppName,
  updateAppName,
} from "../../controllers/app.controller";

router.get("/app/appName", getAppName);
router.patch("/app/changeAppName", updateAppName);

export default router;
