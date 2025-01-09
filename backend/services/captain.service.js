const captainModel = require("../model/captain.model")

const createCaptain = async(firstname , lastname , email , password , color ,plate , capacity, vehicleType) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        color,
        plate,
        capacity,
        vehicleType
    })
    return captain;

}
module.exports = createCaptain;