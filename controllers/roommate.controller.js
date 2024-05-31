import axios from "axios";
import roommateModel from "../model/roommate.model.js";

const createRoomMateController =  async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api');
        const nombreUsuario = response.data.results[0].name.first;
        const apellidoUsuario = response.data.results[0].name.last; 

        const nombreCompleto = nombreUsuario + ' ' + apellidoUsuario;
        console.log(nombreCompleto)

        if(!nombreCompleto){
            return res.status(400).json({ message: 'Error al traer al usuario ramdom' });
        }

        const result = await roommateModel.createRoomMateModel(nombreCompleto);

        if(result){
            return res.status(201).json(result); // No necesitas JSON.stringify
        }else{
            return res.status(400).json({ message: 'Error al crear el usuario en la base de datos' });
        }

    } catch (error) {
        console.error('Error al consultar la api de ramdom usuarios', error);
        return res.status(500).json({ message: 'Error al consultar la api de ramdomuser.me' });
    }
}

export default {
    createRoomMateController
};
  