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


}