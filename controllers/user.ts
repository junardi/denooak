// interfaces
// @ts-ignore
import Todo from "../interfaces/Todo.ts";
// models
// @ts-ignore
import UserModel from "../models/user.ts";
// @ts-ignore
import { MultipartReader } from "https://deno.land/std@0.102.0/mime/mod.ts";
// @ts-ignore
import * as R from 'https://cdn.skypack.dev/ramda@^0.27.1'
// @ts-ignore
import { exists } from 'https://deno.land/std@0.102.0/fs/exists.ts'
// @ts-ignore 
import { readerFromStreamReader} from "https://deno.land/std/io/mod.ts";


const { compose, nth, split } = R
const TMP_DIR = '/tmp/hyper/uploads'

const getBoundary = compose(
  nth(1),
  split('='),
  nth(1),
  split(';')
)


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
	testUpload: async(
		{ request, response }: { request: any; response: any },
	) => {
	

		try {

			const body = await request.body({ type: 'form-data'})
			const data = await body.value.read({maxSize: 5000000})
			console.log(data);
			console.log(data.files[0]);

			console.log(data.files[0]['content']);


			try {
				await Deno.writeFile(`images/${data.files[0]['originalName']}`, data.files[0]['content']);
			
				console.log('success upload');
			} catch (e) {
				console.error(e)
			}


	
			response.body = {
				success: true,
				message: "okay",
			};
		} catch(error) {
			response.body = {
				success: false,
				message: "No data provided",
			};
		}


	},
	testDownload: async({response}: { response: any }) => {

		console.log("Test download.");
		
		// const rsp = await fetch('http://localhost:8000/images/deploying.png');
		// const rdr=rsp.body?.getReader();
		// if(rdr) {
	 //    const r = readerFromStreamReader(rdr);
	 //    const f = await Deno.open('images/deploying.png', {create: true, write: true});
	 //    await Deno.copy(r, f);
	 //    f.close();
		// }

		// response.status = 200;
		// response.body = await Deno.readFile('./deploying.png');
		// response.headers.set("Content-Type", "image/png");


		const text = await Deno.readFile(`images/Angular Developer Roadmap.pdf`);
		console.log(text);


		response.status = 200;
		response.body = text;
		response.headers.set("Content-Type", "application/pdf");




		// response.body = {
		// 	success: true,
		// 	message: "okay",
		// };
	},
	doLogin: async(
		{ request, response }: {request: any, response: any}
	) => {

		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const loginData = await UserModel.doLogin(
	           { username: values.username, password: values.password },                         
	         );

				if(loginData.length) {
					response.body = {
		            success: true,
		            data: loginData,
		         };
				} else {
					response.body = {
		            success: false,
		            data: loginData,
		         };
				}

			} catch(e) {
				//console.log(e);

				response.status = 400;
				response.body = {
					success: false,
					message: `Error: ${e}`,
				};
			
			}

		} catch(e) {

			if (!request.hasBody) {
	         response.status = 400;
	         response.body = {
	            success: false,
	            message: "No data provided",
	         };
	      }
		

		}

	},	
	uploadFile: async(
		{ request, response }: { request: any; response: any },
	) => {

		try {

			const body = await request.body({ type: 'form-data'})
			const data = await body.value.read({maxSize: 5000000})
			console.log(data);
			
			// console.log(data.files[0]);
			// console.log(data.files[0]['content']);

			try {
				await Deno.writeFile(`uploaded-files/${data.files[0]['originalName']}`, data.files[0]['content']);
				
				await UserModel.insertFile(
          { content_type: data.files[0]['contentType'], original_name: data.files[0]['originalName'], user_id: parseInt(data.fields.user_id)}                   
        );


				console.log('success upload');
			
			} catch (e) {
				console.error(e)
			}

			response.body = {
				success: true,
				message: "okay",
			};


		} catch(error) {
			response.body = {
				success: false,
				message: "No data provided",
			};
		}

	},
	getFiles: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const fileData = await UserModel.getFiles(
	           { user_id: values.user_id },                         
	         );

				if(fileData.length) {
					response.body = {
		            success: true,
		            data: fileData,
		         };
				} else {
					response.body = {
		            success: false,
		            data: fileData,
		         };
				}

			} catch(e) {
				//console.log(e);

				response.status = 400;
				response.body = {
					success: false,
					message: `Error: ${e}`,
				};
			
			}

		} catch(e) {

			if (!request.hasBody) {
	         response.status = 400;
	         response.body = {
	            success: false,
	            message: "No data provided",
	         };
	      }
		

		}


	},
	downloadFile: async(
		{ params, response }: { params: { id: string }; response: any },
	) => {


		const fileData = await UserModel.getFileByid(
        { id: Number(params.id) },                         
      );

    
      const text = await Deno.readFile(`uploaded-files/${fileData[0].original_name}`);
	
		response.status = 200;
		response.body = text;
		response.headers.set("Content-Type", fileData[0].content_type);

	},
	deleteFile: async(
		{ params, response }: { params: { id: string }; response: any },
	) => {

		try {

			const fileData = await UserModel.getFileByid(
	        { id: Number(params.id) },                         
	      );

			await Deno.remove(`uploaded-files/${fileData[0].original_name}`);

			await UserModel.deleteFileById(
	        { id: Number(params.id) },                         
	      );


	      response.status = 200;
         response.body = {
            success: true,
            message: "Deleted file",
         };


		} catch(error) {

			response.status = 500;
         response.body = {
            success: false,
            message: "Error deleting file",
         };


		}

	}


}
















