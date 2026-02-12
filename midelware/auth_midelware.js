
const jwt=require('jsonwebtoken');

const verificarLogeoToken=(req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        
            req.user=verified;
            next();

    }catch(error){
        res.status(400).json({ error: 'Token no es válido o está mal formado' });
    }

    

    

}

module.exports=verificarLogeoToken;