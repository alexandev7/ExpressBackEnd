const {response} = require('express');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId; 

const User = require('../models/User')
const {generateJWT}  = require('../helpers/jwt')

const createUser = async (req, res = response) => {

    try {
        const {username, password} = req.body;
        let user = await User.findOne({username});

        if (user){
            res.status(400).json({
                ok:false,
                msg: "Username is already registered"
            })
        }
        user = new User(req.body);
        
        let salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.username);

        return res.status(201).json({
            ok:true,
            uid: user.id,
            username,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Error al enviar datos"
        })
    }
}

const loginUser = async (req, res = response) => {
    
    const {username, password} = req.body;

    try {

        const user = await User.findOne({username});

        if (!user){
            res.status(400).json({
                ok:false,
                msg: "Username and password are incorrect."
            })
        }
        
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword){
            res.status(400).json({
                ok:false,
                msg: "Username and password are incorrect."
            })
        }

        const token = await generateJWT(user.id, user.username);

        res.json({
            ok:true,
            uid: user.id,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Error al enviar datos"
        })
    }
}

const revalidateToken = async (req, res=response) => {

    const {uid,username} = req;

    const token = await generateJWT(uid, username);

    res.json({
        ok:true,
        token
    })
}

const getImageURI = async (req, res = response) => {

    const _id = req.uid;
    
    try {
        const {profileImage} = await User.findOne({_id});

        res.json({
            ok:true,
            msg:_id,
            profileImage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'There was a problem trying to find the image URI'
        })
    }

    
}

module.exports = {createUser, loginUser, revalidateToken, getImageURI}