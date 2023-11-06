import { admin } from "../models/admin.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await admin.findAll();
        res.json(admins);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const createAdmin = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo
    } = req.body;
    try{
        const newAdmin = await admin.create({
            nombre,
            apellido,
            dni,
            telefono,
            correo
        });
        res.json(newAdmin);
    }catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateAdmin = async (req, res) => {
    const idAdmin = req.params.id;
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo
    } = req.body;
    try {
        const actualizarAdmin = await admin.findByPk(idAdmin);

        if (!actualizarAdmin) {
            return res.status(404).json({
                message: 'Admin no encontrado'
            });
        }

        actualizarAdmin.nombre = nombre;
        actualizarAdmin.apellido = apellido;
        actualizarAdmin.dni = dni;
        actualizarAdmin.telefono = telefono;
        actualizarAdmin.correo = correo;

        await actualizarAdmin.save();
        res.json(actualizarAdmin);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteAdmin = async (req, res) => {
    const idAdmin = req.params.id;
    try {
        const result = await admin.destroy({
            where: {idAdmin}
        });
        console.log(result);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}