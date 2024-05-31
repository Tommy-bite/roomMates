import axios from "axios";
import roommateModel from "../model/roommate.model.js";

const createRoomMateController = async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api');
        const nombreUsuario = response.data.results[0].name.first;
        const apellidoUsuario = response.data.results[0].name.last;

        const nombreCompleto = `${nombreUsuario} ${apellidoUsuario}`;
        console.log(nombreCompleto);

        if (!nombreCompleto) {
            return res.status(400).json({ message: 'Error al traer al usuario random' });
        }

        const result = await roommateModel.createRoomMateModel(nombreCompleto);

        if (result) {
            return res.status(201).json(result); // No necesitas JSON.stringify
        } else {
            return res.status(400).json({ message: 'Error al crear el usuario en la base de datos' });
        }

    } catch (error) {
        console.error('Error al consultar la api de random usuarios:', error.message);

        // Añadimos más detalles del error para la respuesta
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un estado que no es 2xx
            return res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            return res.status(500).json({ message: 'No se recibió respuesta de la api de randomuser.me' });
        } else {
            // Algo sucedió al preparar la solicitud que lanzó un Error
            return res.status(500).json({ message: 'Error al configurar la solicitud a randomuser.me', error: error.message });
        }
    }
}

const getRoomMateController = async (req, res) => {
    try {

        const roommates = await roommateModel.getRoomMateModel();

        if (!roommates) {
          return res.status(400).json({ message: "No hay roommates para mostrar" });
        }
    
        return res.status(200).json({ roommates });

        
    } catch (error) {
        console.error('No fue posible obtener a los roommates', error);
        return res.status(500).json({ message: 'No fue posible obtener a los roommates' });
    }
}

export default {
    createRoomMateController,
    getRoomMateController
};
  