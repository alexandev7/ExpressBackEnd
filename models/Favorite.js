const {Schema, model} = require('mongoose');

const FavoriteSchema = Schema({

    imageId: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = model('Favorite', FavoriteSchema)