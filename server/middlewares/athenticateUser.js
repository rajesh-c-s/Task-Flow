import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';


const authenticateUser = async(req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await userModel.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export default authenticateUser;