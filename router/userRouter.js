const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserModel=require('../model/user');
const verificarLogeoToken = require('../midelware/auth_midelware');


//logear con un usuario
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. ¿Existe el usuario? (Buscamos en Atlas)
        let user = await UserModel.findOne({ email });


        console.log(user);
        if (!user) {
            return res.status(400).json({ msg: 'El correo no está registrado' });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

       
        // 3. Si todo es OK, creamos el "paquete" (payload)
        const payload = {
            usuario: {
                id: user.id // Aquí es donde guardamos el ID para el middleware
            }
        };

        // 4. Firmar el Token
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Tu clave secreta del .env
            { expiresIn: '24h' },   // El token dura un día
            (err, token) => {
                if (err) throw err;
                
                // 5. Enviamos el token al Frontend
                res.json({ 
                    token,
                    usuario: { id: user.id, nombre: user.nombre, email: user.email }
                });
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});


//Registrar un Usuario por el metodo post
router.post("/loginRegister",async (req, res) => {
  const { email, password } = req.body;

        const user=await UserModel.findOne({email});
        console.log(user);

        if(user){
            return res.status(200).json({ msg: 'El usuario ya está registrado' });
        }
        else{
             
            const nuevoUsuario = await new UserModel({
            nombre:'alejandro',
            email,
            password
        });

        await nuevoUsuario.save();

            res.status(201).json({
            msg: 'Usuario creado con éxito',
            id: nuevoUsuario._id
        });
        }



    

   
});

//mostrar usuarios

router.get("/usuarios",verificarLogeoToken,async (req,res)=>{
    
    const usuarios=await  UserModel.find({ _id: { $ne: req.user.usuario.id } });
    res.status(200).json({usuarios});
    


});

module.exports=router;