import {paciente} from '../models/paciente.js';

export const getPacientes = async (req, res) => {
    const pacientes = await paciente.findAll(); 
    
    res.json(pacientes);
};

export const createPaciente = async (req, res) => {
    const {nombre, apellido, dni, localidad, provincia, sexo, embarazo, fecha_nac, correo_electronico, telefono, obra_social, num_afiliado} = req.body;

    const newPaciente = await paciente.create({
        nombre,
        apellido,
        dni,
        localidad,
        provincia,
        sexo,
        embarazo,
        fecha_nac,
        correo_electronico,
        telefono,
        obra_social,
        num_afiliado
    });
    
    res.json(newPaciente);
};

