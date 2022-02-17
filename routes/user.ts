// @ts-ignore
import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();
// controller
// @ts-ignore
import userController from "../controllers/user.ts";


router
   .post("/user", userController.createUser);

export default router;