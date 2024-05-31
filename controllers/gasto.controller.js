import gastoModel from "../model/gasto.model.js";

const createGastoController = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    console.log(roommate);
    console.log(descripcion);
    console.log(monto);

    if (!roommate || !descripcion || !monto) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const gasto = {
      roommate,
      descripcion,
      monto,
    };

    if (!gasto) {
      return res
        .status(400)
        .json({ message: "Error al traer al crear objeto gasto" });
    }

    const result = await gastoModel.createGastoModel(gasto);

    if (result) {
      return res.status(201).json(result); // No necesitas JSON.stringify
    } else {
      return res
        .status(400)
        .json({ message: "Error al crear el gasto en la base de datos" });
    }
  } catch (error) {
    console.error("Error al  crear gasto 500", error);
    return res.status(500).json({ message: "Error al  crear gasto 500" });
  }
};

const getGastosController = async (req, res) => {
  try {
    const gastos = await gastoModel.getGastosModel();

    if (!gastos) {
      return res.status(400).json({ message: "No hay gastos para mostrar" });
    }

    return res.status(200).json({ gastos });
  } catch (error) {
    console.error("No fue posible obtener a los gastos", error);
    return res
      .status(500)
      .json({ message: "No fue posible obtener a los gastos" });
  }
};

const deleteGastoController = async (req, res) => {
  const { id } = req.params;

  console.log('gasto id', id)

  if (!id) {
    return res.status(400).json({ message: "El ID es obligatorio" });
  }

  try {

    await gastoModel.deleteGastoModel(id);

    return res.status(200).json({ message: "Gasto eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar al gasto" });
  }
};

const updateGastoController = async (req, res) => {
    const { id } = req.params;
    const { roommate, descripcion, monto } = req.body;

    console.log(roommate);
    console.log(descripcion);
    console.log(monto);
  
    if (!roommate || !descripcion || !monto) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
  
      const editGasto = {
        roommate,
        descripcion,
        monto
      };
  
      await gastoModel.updateGastoModel(id, editGasto);
  
      return res
        .status(200)
        .json({ message: "Usuario actualizada exitosamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar al Usuario" });
    }
  
  };

export default {
  createGastoController,
  getGastosController,
  deleteGastoController,
  updateGastoController
};
