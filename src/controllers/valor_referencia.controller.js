import {valor_referencia} from '../models/valor_referencia.js';

export const getValorReferencia = async (req, res) => {
    try {
        const valorReferencia = await valor_referencia.findAll();
        res.json(valorReferencia);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createValorReferencia = async (req, res) => {
    const {idValorReferencia,
          sexo,
          edadMinima,
          edadMaxima,
          valorMinimo,
          valorMaximo,
          embarazo
          } = req.body;
    try {
        
        const newValorReferencia = await valor_referencia.create({
            idValorReferencia,
            sexo,
            edadMinima,
            edadMaxima,
            valorMinimo,
            valorMaximo,
            embarazo
        });
        console.log('Valor Referencia creada:', newValorReferencia);

        res.json(newValorReferencia);
    } catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateValorReferencia = async (req, res) => {
    const { idValorReferencia } = req.params.id;
    const { sexo,
          edadMinima,
          edadMaxima,
          valorMinimo,
          valorMaximo,
          embarazo
          } = req.body;
    try {
        const valorReferencia = await valor_referencia.findByPk(idValorReferencia);
        if(!valorReferencia) {
            return res.status(404).json({
                message: 'Valor Referencia no encontrado'
            });
        }
        valorReferencia.sexo = sexo;
        valorReferencia.edadMinima = edadMinima;
        valorReferencia.edadMaxima = edadMaxima;
        valorReferencia.valorMinimo = valorMinimo;
        valorReferencia.valorMaximo = valorMaximo;
        valorReferencia.embarazo = embarazo;
        await valorReferencia.save();
        res.json(valorReferencia);
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteValorReferencia = async (req, res) => {
    const { idValorReferencia } = req.params;
    try {
        const valorReferencia = await valor_referencia.findByPk(idValorReferencia);
        await valorReferencia.destroy();
        res.json({ message: 'Valor Referencia eliminada' });
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}