/* Controller */

// @ts-ignore
import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interface
// @ts-ignore
import Todo from '../interfaces/Todo.ts';
// stubs 
// @ts-ignore
import todos from "../stubs/todos.ts";


export default {
   
   getAllTodos: ({ response }: { response:any }) => {

      response.status = 200;
      response.body = {
         success: true,
         data: todos,
      };
   },
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

      // const values = await body.value;

      // console.log(values);

     
      // let newTodo: Todo = {
      //    id: v4.generate(),
      //    todo: values.todo,
      //    isCompleted: true,
      // };
      // let data = [...todos, newTodo];
      // response.body = {
      //    success: true,
      //    data,
      // };


      try{
         
         const body = await request.body();
         const values = await body.value;

         let newTodo: Todo = {
            id: v4.generate(),
            todo: values.todo,
            isCompleted: true,
         };

         let data = [...todos, newTodo];

         response.body = {
            success: true,
            data,
         };

      } catch(err) {

         response.status = 400;
         response.body = {
            success: false,
            message: "No data provided",
         };

      }

   },
   getTodoById: (
      { params, response }: { params: { id: string }; response: any },
   ) => {

      
      const todo: Todo | undefined = todos.find((t) => {
         return t.id === params.id;
      });

    
      if (!todo) {
         response.status = 404;
         response.body = {
            success: false,
            message: "No todo found",
         };
         return;
      }

      // If todo is found
      response.status = 200;
      response.body = {
         success: true,
         data: todo,
      };


   },
   updateTodoById: async (
     
      { params, request, response }: {
         params: { id: string },
         request: any,
         response: any,
      },
   
   ) => {

      
      const todo: Todo | undefined = todos.find((t) => t.id === params.id);
      // if (!todo) {
      //    response.status = 404;
      //    response.body = {
      //       success: false,
      //       message: "No todo found",
      //    };
      //    return;
      // }

      // // if todo found then update todo
      // const body = await request.body();
      // const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
      // let newTodos = todos.map((t) => {
      //    return t.id === params.id ? { ...t, ...updatedData } : t;
      // });
      
      // response.status = 200;
      // response.body = {
      //    success: true,
      //    data: newTodos,
      // };


      try {

         // if todo found then update todo
         const body = await request.body();

         const values = await body.value;
         
         const updatedData: { todo?: string; isCompleted?: boolean } = values;
         let newTodos = todos.map((t) => {
            return t.id === params.id ? { ...t, ...updatedData } : t;
         });
         
         response.status = 200;
         response.body = {
            success: true,
            data: newTodos,
         };

      } catch(err) {

         response.status = 404;
         response.body = {
            success: false,
            message: "No todo found",
         };

      }


   },
   deleteTodoById: (
      { params, response }: { params: { id: string }; response: any },
   ) => {

      const allTodos = todos.filter((t) => t.id !== params.id);

      // remove the todo w.r.t id & return
      // remaining todos
      response.status = 200;
      response.body = {
         success: true,
         data: allTodos,
      };

   },

};




















