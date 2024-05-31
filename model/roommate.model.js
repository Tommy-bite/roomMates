import { pool } from "../database/connection.database.js";

const createRoomMateModel = async (nombreCompleto) => {
    try {

        if(!nombreCompleto){
            return null;
        }

        const query = {
          text: "INSERT INTO roommates (nombre) VALUES ($1) RETURNING *",
          values : [nombreCompleto]
        };

        const { rows } = await pool.query(query);
    
        return rows[0];
      } catch (error) {
        throw error;
      }
}

export default {
    createRoomMateModel
}