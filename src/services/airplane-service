const {StatusCodes} =  require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error')

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error){
        if(error.name = 'SequelizeValidationError' || 'SequelizeUniqueConstraintError' ){
            let explanation = [];
            error.errors.forEach((err) =>{
                explanation.push(err.message);
                console.log(error);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
        const airplane = await airplaneRepository.getAll();
        return airplane;
    } catch(error){
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.StatusCodes);
        }
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present',error.StatusCodes);
        }
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function updateAirplane(data,id){
    try{
        
        const airplane = await airplaneRepository.update(data,id);
        return airplane;
    } catch(error){
        if(error.StatusCodes == StatusCodes.NOT_FOUND){
            throw new AppError("the airplane does not exists",error.StatusCodes);
        }
        if(error.name = 'SequelizeValidationError' ){
            let explanation = [];
            error.errors.forEach((err) =>{
                explanation.push(err.message);
                console.log(error);
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Not able to fectch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);

    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}