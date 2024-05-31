import { pool } from "../database/connection.database.js";

const createGastoModel = async (gasto) => {
  try {
    if (!gasto) {
      return null;
    }

    const { roommate, descripcion, monto } = gasto;

    // Obtener el ID del RoomMate
    const idRoomMate = await getRoomMateByNombre(roommate);
    console.log("ID del RoomMate:", idRoomMate);

    // Insertar el gasto en la tabla 'gastos'
    const query = {
      text: "INSERT INTO gastos (idRoomMate, descripcion, monto) VALUES ($1, $2, $3) RETURNING *",
      values: [idRoomMate, descripcion, monto],
    };
    const { rows } = await pool.query(query);
    const newGasto = rows[0];
    console.log("Nuevo gasto:", newGasto);

    // Actualizar la tabla 'roommates'
    await updateGastosRoomMate(idRoomMate, monto);

    return newGasto;
  } catch (error) {
    throw error;
  }
};


const updateGastosRoomMate = async (idRoomMate, monto) => {
  try {
    // Obtener el valor actual del campo 'debe' para el RoomMate
    const query = {
      text: "SELECT debe FROM roommates WHERE id = $1",
      values: [idRoomMate],
    };
    const { rows } = await pool.query(query);
    const debeActual = rows[0].debe;

    // Calcular el nuevo valor del campo 'debe'
    const nuevoDebe = debeActual + monto;

    // Actualizar el campo 'debe' en la tabla 'roommates'
    const updateQuery = {
      text: "UPDATE roommates SET debe = $1 WHERE id = $2",
      values: [nuevoDebe, idRoomMate],
    };
    await pool.query(updateQuery);

    console.log(`El campo 'debe' para el RoomMate con ID ${idRoomMate} se actualizó correctamente.`);

    // Opcional: Puedes devolver el nuevo valor del campo 'debe' si lo necesitas
    return nuevoDebe;
  } catch (error) {
    throw error;
  }
};
const getGastosModel = async () => {
  const rowsGastos = [];
  try {
    const query = {
      text: "SELECT * FROM gastos ",
    };

    const { rows } = await pool.query(query);

    for (const item of rows) {
      const nombreRoommate = await getRoomMateById(item.idroommate);

      const gasto = {
        id: item.id,
        monto: item.monto,
        descripcion: item.descripcion,
        idroommate: item.idroommate,
        nombreRoommate,
      };

      rowsGastos.push(gasto);
    }

    console.log(rowsGastos);
    return rowsGastos;
  } catch (error) {
    throw error;
  }
};

const getRoomMateById = async (id) => {
  try {
    const query = {
      text: "SELECT nombre FROM roommates WHERE id =  $1",
      values: [id],
    };
    const { rows } = await pool.query(query);
    console.log(rows[0].nombre);
    return rows[0].nombre;
  } catch (error) {
    throw error;
  }
};

const getRoomMateByNombre = async (nombre) => {
  try {
    const query = {
      text: "SELECT id FROM roommates WHERE nombre =  $1",
      values: [nombre],
    };
    const { rows } = await pool.query(query);
    return rows[0].id;
  } catch (error) {
    throw error;
  }
};

export default {
  createGastoModel,
  getGastosModel,
};
