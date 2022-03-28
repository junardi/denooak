// @ts-ignore
import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();
// controller
// @ts-ignore
import userController from "../controllers/user.ts";
// @ts-ignore


router
   .post("/user", userController.createUser)
   .post("/test-upload", userController.testUpload)
   .get("/test-download", userController.testDownload)
   .post("/do-login", userController.doLogin);


export default router;












