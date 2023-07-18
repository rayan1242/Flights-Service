const {StatusCodes} =  require('http-status-codes');
const { AirportRepository } = require('../repositories');
const { CityModel } = require('../models')
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
      const airport = await airportRepository.create(data);
      return airport;
    } catch (error) {
      if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError" 
                 || error.name == "SequelizeDatabaseError"
      ) {
        let explanation = [];
        explanation.push(error.parent.sqlMessage);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Cannot create a new Airport object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  

async function getAirports(){
    try{
        const airport = await airportRepository.getAll();
        return airport;
    } catch(error){
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getAirport(id){
    try{
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.StatusCodes);
        }
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyAirport(id){
    try{
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not present',error.StatusCodes);
        }
        throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateAirport(data,id){
    try{
        
        const airport = await airportRepository.update(data,id);
        return airport;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("the airport does not exists",error.StatusCodes);
            } else if (
                error.name == "SequelizeValidationError" ||
                error.name == "SequelizeUniqueConstraintError"
            ) {
                let explanation = [];
                error.errors.forEach((err) => {
                explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            } else if (error.name == "SequelizeForeignKeyConstraintError" 
                        || error.name == "SequelizeDatabaseError" 

            ) {
                let explanation = [];
                explanation.push(error.parent.sqlMessage);
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            }
            throw new AppError(
                "Cannot create a new Airport object",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}