const captainModel = require("../model/captain.model");

const createCaptain = async (firstname, lastname, email, password, vehicle) => {
  if (!firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
    throw new Error('All fields are required');
  }
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password,
    vehicle
  });
  return captain;
};

module.exports = createCaptain;
