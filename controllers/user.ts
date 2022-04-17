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

			console.log(Date.now());

			try {

				let name = Date.now() + data.files[0]['originalName'];
				await Deno.writeFile(`uploaded-files/${name}`, data.files[0]['content']);
				
				await UserModel.insertFile(
	         	{ content_type: data.files[0]['contentType'], original_name: data.files[0]['originalName'], name: name, user_id: parseInt(data.fields.user_id)}                   
	        	);

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

    
      const text = await Deno.readFile(`uploaded-files/${fileData[0].name}`);
	
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

			await Deno.remove(`uploaded-files/${fileData[0].name}`);

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

	},
	addStudent: async(
		{ request, response }: { request: any; response: any },
	) => {

		try {
	      try {
	         const body = await request.body();
	         const values = await body.value;
	         console.log();

	         console.log(values);

	         await UserModel.addStudent(values);
	        

	        //  await UserModel.addStudent({

			      // last_name: values.lastName, 
		       //   first_name: values.firstName,
		       //   middle_name: values.middleName, 
		       //   id_number: values.idNumber, 
		       //   lrn: values.lrn, 
		       //   course: values.course, 
		       //   current_year_level: values.currentYearLevel, 
		       //   section: values.section, 
		       //   sex: values.sex, 
		       //   gender: values.gender, 
		       //   civil_status: values.civilStatus, 
		       //   address: values.address, 
		       //   mothers_maiden_name: values.mothersMaidenName, 
		       //   fathers_name: values.fathersName, 
		       //   is_member_of_ips: values.isMemberOfIps, 
		       //   tribe: values.tribe, 
		       //   with_disability: values.withDisability, 
		       //   user_id: values.userId 
	        //   });

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
	getCourses: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const courses = await UserModel.getCourses({});

				response.body = {
	            success: true,
	            data: courses,
	         };


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
	getYearLevels: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const yearlevels = await UserModel.getYearLevels({});

				response.body = {
	            success: true,
	            data: yearlevels,
	         };


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
	getSections: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const sections = await UserModel.getSections({});

				response.body = {
	            success: true,
	            data: sections,
	         };


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
	getStudents: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const students = await UserModel.getStudents({});

				response.body = {
	            success: true,
	            data: students,
	         };


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
	deleteStudent: async(
		{ params, response }: { params: { id: string }; response: any },
	) => {

		try {


			await UserModel.deleteStudentById(
	        { id: Number(params.id) },                         
	      );

         response.body = {
            success: true,
            message: "Deleted student",
         };


		} catch(error) {

			response.status = 500;
         response.body = {
            success: false,
            message: "Error deleting student",
         };


		}

	},
	updateStudentById: async (
      { params, request, response }: {
         params: { id: string };
         request: any;
         response: any;
      },
   ) => {


      try {
      
         
         // if todo found then update todo
         const body = await request.body();
         const values = await body.value;
         
         const updatedRows = await UserModel.updateStudentById({
            ...values,
            id: Number(params.id)
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
   getOrganizations: async(
		{ request, response }: {request: any, response: any}
	) => {


		try {

			try {

				const body = await request.body();
				const values = await body.value;

				const organizations = await UserModel.getOrganizations({});

				response.body = {
	            success: true,
	            data: organizations,
	         };


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


	}



}
















