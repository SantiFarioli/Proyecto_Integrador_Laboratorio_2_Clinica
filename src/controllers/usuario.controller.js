import { usuario } from '../models/usuario.js';

export const getUsuarios = async (req, res) => {
    try{
        const usuarios = await usuario.findAll();
        res.json(usuarios);
    }catch {
        return res.status(500).json({
            message: error.message
        });
    }
}


export const getUsuario = async (req, res) => {
    try{
        const {id} = req.params;
        const usuario = await usuario.findOne({
            where: {id}
        });
        res.json(usuario);
    }catch {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const createUsuario = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        correo,
        contraseña,
        fecha_nacimiento,
        genero,
        rol
    } = req.body;
    try{
        const newUsuario = await usuario.create({
            nombre,
            apellido,
            dni,
            correo,
            fecha_nacimiento,
            genero,
            rol
        });
        res.json(newUsuario);
    } catch {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateUsuario = async (req, res) => {
    const idUsuario = req.params;
    const {
        nombre,
        apellido,
        dni,
        correo,
        fecha_nacimiento,
        genero,
        rol
    } = req.body;
    try{
        const updateUsuario = await usuario.findByPk(idUsuario);

        if(!updateUsuario){
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        updateUsuario.nombre = nombre;
        updateUsuario.apellido = apellido;
        updateUsuario.dni = dni;
        updateUsuario.correo = correo;
        updateUsuario.fecha_nacimiento = fecha_nacimiento;
        updateUsuario.genero = genero;
        updateUsuario.rol = rol;

        await updateUsuario.save();
        res.json(updateUsuario);
    } catch {
        return res.status(500).json({
            message: error.message
        });
    }
}


export const deleteUsuario = async (req, res) => {
    const idAdmin = req.params.id;
    try {
        await usuario.destroy({
            where: {id: idAdmin}
        });
        res.sendStatus(204);
    } catch {
        return res.status(500).json({
            message: error.message
        });
    }
}