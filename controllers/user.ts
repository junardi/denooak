// interfaces
// @ts-ignore
import Todo from "../interfaces/Todo.ts";
// models
// @ts-ignore
import UserModel from "../models/user.ts";


export default {

	createUser: async (
	   { request, response }: { request: any; response: any },
	) => {

	   try {

	      try {
	         const body = await request.body();
	         const values = await body.value;

	         await UserModel.addUser(
	           { username: values.username, password: values.password, first_name: values.firstName, last_name: values.lastName, position: values.position, role: values.role, gender: values.gender },                         
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


	   } catch(error) {
	      
	      if (!request.hasBody) {
	         response.status = 400;
	         response.body = {
	            success: false,
	            message: "No data provided",
	         };
	      }


	   }

	},

}
















