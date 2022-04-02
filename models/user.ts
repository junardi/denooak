// @ts-ignore
import client from "../db/client.ts";
// config
// @ts-ignore
import { TABLE } from "../db/config.ts";


export default {

	addUser: async (
      { username, password, first_name, last_name, position, role, gender}: any,
   ) => {

      return await client.query(
         `INSERT INTO ${TABLE.USERS}(username, password, first_name, last_name, position, role, gender) values(?, ?, ?, ?, ?, ?, ?)`,
         [
            username,
            password,
            first_name,
            last_name,
            position,
            role,
            gender,
         ],
      );

   },
   doLogin: async(
      { username, password }: any
   ) => {

      console.log(username);
      console.log(password);

      return await client.query(
         `select * from ${TABLE.USERS} where username = ? and password = ?`,
         [username, password],
      )

   },
   insertFile: async(
      { content_type, original_name, user_id }: any
   ) => {

      return await client.query(
         `INSERT INTO ${TABLE.FILES}(content_type, original_name, user_id) values(?, ?, ?)`,
         [
            content_type,
            original_name,
            user_id
         ],
      );

   },
   getFiles: async(
      { user_id }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.FILES} where user_id = ?`,
         [user_id]
      )
   },
   getFileByid: async(
      { id }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.FILES} where id = ?`,
         [id]
      )
   },
   deleteFileById: async(
      { id }: any
   ) => {
      return await client.query(
         `delete from ${TABLE.FILES} where id = ?`,
         [id]
      )
   }

}











