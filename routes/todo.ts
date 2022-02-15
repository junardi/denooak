/* Routes */


// @ts-ignore
import { Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();
// controller
// @ts-ignore
import todoController from "../controllers/todo.ts";

router
   .get("/", ({ response }: { response:any }) =>{
      response.body = {
         message: "Hello Mastermind"
      };
   })
   .get("/todos", todoController.getAllTodos)
   .post("/todos", todoController.createTodo)
   .get("/todos/:id", todoController.getTodoById)
   .put("/todos/:id", todoController.updateTodoById)
   .delete("/todos/:id", todoController.deleteTodoById)
   .post("/user", todoController.createUser);

export default router;