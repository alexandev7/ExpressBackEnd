const {response} = require('express');
const Favorite = require('../models/Favorite');
const ObjectId = require('mongoose').Types.ObjectId; 

const getFavorites = async (req, res = response) => {

    const userId = req.uid;
    
    try {
        const favorites = await Favorite.find({'user':new ObjectId(userId)});

        res.json({
            ok:true,
            msg:userId,
            favorites
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'There was a problem trying to find favorites'
        })
    }

    
}

const createFavorite = async (req, res = response) => {
    
    const favorite = new Favorite(req.body);

    try {
        favorite.user = req.uid;
        const savedFavorite = await favorite.save();

        res.json({
            ok:true,
            favorite: savedFavorite
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Unable to create favorite'
        })
    }
}

const deleteFavorites = async (req, res = response) => {
    
    const userId = req.uid;
    const imageId = req.params.id;

    try {
        
        //const favorite = await Favorite.findById(favoriteId);
        const favorite = await Favorite.findOne({
            imageId: imageId,
            'user':new ObjectId(userId)
        });
        
        if ( !favorite ) {
            return res.status(404).json({
                ok: false,
                msg: 'No match for imageId or userId'
            });
        }

        await Favorite.findByIdAndDelete(favorite._id);

        res.json({
            ok:true,
            msg: "Favorite was deleted",
            favorite:favorite
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Unable to delete favorite'
        })
    }
}

module.exports = {
    getFavorites,
    createFavorite,
    deleteFavorites
}