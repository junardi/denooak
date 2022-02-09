// interfaces
import Todo from "../interfaces/Todo.ts";
// models
import TodoModel from "../models/todo.ts";

export default {
   /**
   * @description Get all todos
   * @route GET /todos
   */
   getAllTodos: async ({ response }: { response: any }) => {

      try {
         const data = await TodoModel.getAll();
         response.status = 200;
         response.body = {
            success: true,
            data,
         };
      } catch (error) {
         response.status = 400;
         response.body = {
            success: false,
            message: `Error: ${error}`,
         };
      }

   },
   /**
   * @description Add a new todo
   * @route POST /todos
   */
   createTodo: async (
      { request, response }: { request: any; response: any },
   ) => {

      // const body = await request.body();
      // if (!request.hasBody) {
      //    response.status = 400;
      //    response.body = {
      //       success: false,
      //       message: "No data provided",
      //    };
      //    return;
      // }

      // try {
      //    await TodoModel.add(
      //       { todo: body.value.todo, isCompleted: false },
      //    );
      //    response.body = {
      //       success: true,
      //       message: "The record was added successfully",
      //    };
      // } catch (error) {
      //    response.status = 400;
      //    response.body = {
      //       success: false,
      //       message: `Error: ${error}`,
      //    };
      // }


      try {
         const body = await request.body();
         const values = await body.value;

         try {
            
            await TodoModel.add(
              { todo: values.todo, isCompleted: false },
            );

            response.body = {
               success: true,
               message: "The record was added successfully",
            };

         } catch (error) {
            response.status = 400;
            response.body = {
               success: false,
               message: `Error: ${error}`,
            };
         }

      } catch (error) {

         if (!request.hasBody) {
            response.status = 400;
            response.body = {
               success: false,
               message: "No data provided",
            };
         }

      } 


   },
   /**
   * @description Get todo by id
   * @route GET todos/:id
   */
   getTodoById: async (
      { params, response }: { params: { id: string }; response: any },
   ) => {


      try {

         const isAvailable = await TodoModel.doesExistById(
            { id: Number(params.id) },
         );

         if (!isAvailable) {
            response.status = 404;
            response.body = {
               success: false,
               message: "No todo found",
            };
            return;
         }

         const todo = await TodoModel.getById({ id: Number(params.id) });
         response.status = 200;
         response.body = {
            success: true,
            data: todo,
         };

      } catch (error) {

         response.status = 400;
         response.body = {
            success: false,
            message: `Error: ${error}`,
         };

      }



   },
   /**
   * @description Update todo by id
   * @route PUT todos/:id
   */
   updateTodoById: async (
      { params, request, response }: {
         params: { id: string };
         request: any;
         response: any;
      },
   ) => {


      try {
      
         const isAvailable = await TodoModel.doesExistById(
            { id: Number(params.id) },
         );

         if (!isAvailable) {
            
            response.status = 404;
            response.body = {
               success: false,
               message: "No todo found",
            };

            return;
         }

         // if todo found then update todo
         const body = await request.body();
         const values = await body.value;
         const updatedRows = await TodoModel.updateById({
            id: Number(params.id),
            ...values,
         });

         response.status = 200;
         response.body = {
            success: true,
            message: `Successfully updated ${updatedRows} row(s)`,
         };
      

      } catch (error) {

         response.status = 400;
         response.body = {
            success: false,
            message: `Error: ${error}`,
         };

      }


   },
   /**
   * @description Delete todo by id
   * @route DELETE todos/:id
   */
   deleteTodoById: async (
      { params, response }: { params: { id: string }; response: any },
   ) => {

      try {
      
         const updatedRows = await TodoModel.deleteById({
            id: Number(params.id),
         });

         response.status = 200;
         response.body = {
            success: true,
            message: `Successfully updated ${updatedRows} row(s)`,
         };

      } catch (error) {

         response.status = 400;
         response.body = {
            success: false,
            message: `Error: ${error}`,
         };
      
      }




   },


};




















