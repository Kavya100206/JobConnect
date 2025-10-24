import jwt from 'jsonwebtoken';

export const isAuth = (req,res,next) => {
    const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }
}