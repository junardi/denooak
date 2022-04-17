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
   .delete("/delete-file/:id", userController.deleteFile)
   .post("/add-student", userController.addStudent)
   .post("/get-courses", userController.getCourses)
   .post("/get-year-levels", userController.getYearLevels)
   .post("/get-sections", userController.getSections)
   .post("/get-students", userController.getStudents)
   .delete("/delete-student/:id", userController.deleteStudent)
   .put("/update-student/:id", userController.updateStudentById)
   .post("/get-organizations", userController.getOrganizations);



export default router; 












