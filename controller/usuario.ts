import {Request, Response} from 'express';
import Usuario from '../models/usuario';

// es estricto indicar el tipo en los datos

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        msg: 'getUsuarios',
        usuarios
    })

}

export const getUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        // 404 no encontrado
        res.status(404).json({
            msg: `No existe el usuario con el id: ${id}`
        });
    }

    res.json({
        usuario,
        msg: 'getUsuario'
    })

}

export const postUsuario = async(req: Request, res: Response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Existe usuario con el email: ${body.email}`
            });
        }



        const usuario = Usuario.build(body);
        await usuario.save();
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado post'
        })        
    }
}

export const putUsuario = async(req: Request, res: Response) => {

    const {id} = req.params;
    const {body} = req;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No Existe usuario con el id: ${body.email}`
            });
        }

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Existe usuario con el email: ${body.email}`
            });
        }

        await usuario.update(body);
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado post'
        })
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `No Existe usuario con el id: ${id}`
            });
        }
        
        // eliminacion fisica
        // await usuario.destroy();

        // eliminacion logica
        await usuario.update({estado: false});
        
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado delete'
        })
    }

}