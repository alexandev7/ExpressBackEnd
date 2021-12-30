const jwt = require('jsonwebtoken');

const generateJWT = (uid, username) => {

    return new Promise( (resolve, reject) =>{

        const payload = {uid, username};

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err){
                console.log(err);
                reject('Token could not be generated')
            }

            resolve(token);

        })

    })
}

module.exports = {
    generateJWT
}