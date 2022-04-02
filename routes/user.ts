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
   .post("/do-login", userController.doLogin)
   .post("/file-upload", userController.uploadFile)
   .post("/get-files", userController.getFiles)
   .get("/download-file/:id", userController.downloadFile)
   .delete("/delete-file/:id", userController.deleteFile);



export default router; 












