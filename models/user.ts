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
      { content_type, original_name, name, user_id }: any
   ) => {

      return await client.query(
         `INSERT INTO ${TABLE.FILES}(content_type, original_name, name, user_id) values(?, ?, ?, ?)`,
         [
            content_type,
            original_name,
            name,
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
   }, 
   addStudent: async (
      { 
         last_name, 
         first_name,
         middle_name, 
         id_number, 
         lrn, 
         course, 
         current_year_level, 
         section, 
         sex, 
         gender, 
         civil_status, 
         address, 
         mothers_maiden_name, 
         fathers_name, 
         is_member_of_ips, 
         tribe, 
         with_disability, 
         organization,
         user_id 
      }: any,          
   ) => {

      return await client.query(
         `INSERT INTO ${TABLE.STUDENTS}(last_name, first_name, middle_name, id_number, lrn, course, current_year_level, section, sex, gender, civil_status, address, mothers_maiden_name, fathers_name, is_member_of_ips, tribe, with_disability, organization, user_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,         
         [
            last_name, 
            first_name,
            middle_name, 
            id_number,
            lrn, 
            course,
            current_year_level,
            section,
            sex,
            gender,
            civil_status,
            address,
            mothers_maiden_name,
            fathers_name,
            is_member_of_ips,
            tribe,
            with_disability,
            organization,
            user_id
         ],
      );

   },
   getCourses: async(
      { }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.COURSES}`
        
      )
   },
   getYearLevels: async(
      { }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.YEARLEVELS}`
        
      )
   },
   getSections: async(
      { }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.SECTIONS}`
      )
   },
   getStudents: async(
      { }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.STUDENTS}`
      )
   },
   deleteStudentById: async(
      { id }: any
   ) => {
      return await client.query(
         `delete from ${TABLE.STUDENTS} where id = ?`,
         [id]
      )
   },
   updateStudentById: async (
      { 
         last_name, 
         first_name,
         middle_name, 
         id_number, 
         lrn, 
         course, 
         current_year_level, 
         section, 
         sex, 
         gender, 
         civil_status, 
         address, 
         mothers_maiden_name, 
         fathers_name, 
         is_member_of_ips, 
         tribe, 
         with_disability,
         organization,
         id
      }: any
   ) => {

      const result = await client.query(
         `UPDATE ${TABLE.STUDENTS} SET last_name=?, first_name=?, middle_name=?, id_number=?, lrn=?, course=?, current_year_level=?, section=?, sex=?, gender=?, civil_status=?, address=?, mothers_maiden_name=?, fathers_name=?, is_member_of_ips=?, tribe=?, with_disability=?, organization=? WHERE id=?`,
         [
            last_name, 
            first_name,
            middle_name, 
            id_number, 
            lrn, 
            course, 
            current_year_level, 
            section, 
            sex, 
            gender, 
            civil_status, 
            address, 
            mothers_maiden_name, 
            fathers_name, 
            is_member_of_ips, 
            tribe, 
            with_disability,
            organization,
            id
         ],
      );
      // return count of rows updated
      return result.affectedRows;
   
   },
   getOrganizations: async(
      { }: any
   ) => {
      return await client.query(
         `select * from ${TABLE.ORGANIZATIONS}`
        
      )
   },

}











